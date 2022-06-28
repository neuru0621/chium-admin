<template>
  <v-row justify="center">
    <v-dialog
      :value="dialog"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          사업장 폐기물 선택해주세요
        </v-card-title>
        <v-text-field
          v-model="keyword"
          placeholder="사업장폐기물 검색🔍"
          @input="searchSomething"
        />
        <v-row>
          <v-col>
            <v-simple-table
              :height="300"
              fixed-header
              dense
            >
              <template #default>
                <thead>
                  <tr>
                    <th class="text-center">
                      사업장폐기물
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item,idx in cloneWsteList1"
                    :key="idx"
                    style="cursor : pointer"
                    @click="selectWsteList1(item,$event)"
                  >
                    <td>[{{ item.CODE }}] {{ item.NAME }} </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col>
            <v-simple-table
              :height="300"
              fixed-header
              dense
            >
              <template #default>
                <thead>
                  <tr>
                    <th class="text-center">
                      액상 고상
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item,idx in cloneWsteList2"
                    :key="idx"
                    style="cursor : pointer"
                    @click="selectWsteList2(item,$event)"
                  >
                    <td> {{ item.KOREAN }} </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="green darken-1"
            text
            @click="closeDialog"
          >
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>

import {mapGetters, mapMutations} from "vuex"
export default {
  props : {
    dialog : {
      type : Boolean,
      default : false
    }},
  data(){
    return {
      cloneWsteList1 : [],
      cloneWsteList2 : [],
      keyword : '',
      timer : '',
      wste1 : null,
      wste2 : null,
      nowTarget : '',
      nowTarget2 : ''
    }
  },
  computed: {
    ...mapGetters('selectedUser',['getSeletedUser']),
    ...mapGetters('common',['showWsteLists']),

    },
  created(){
    this.cloneWsteList1 = this.showWsteLists.wsteList1
    this.cloneWsteList2 = this.showWsteLists.wsteList2
  },

    methods: {
      ...mapMutations('selectedUser',['addWsteList']),
      setNull(){
        if (this.nowTarget) {

          this.nowTarget.classList.remove('active')
          this.nowTarget = null
        }
        if (this.nowTarget2) {

          this.nowTarget2.classList.remove('active')
          this.nowTarget2 = null
        }
        this.wste1 = null
        this.wste2 = null
      },
      closeDialog(){
        if (this.wste1 && this.wste2){
          console.log(this.getSeletedUser.wsteList.filter(v=>{console.log(v)}))
          console.log(this.wste1)
          console.log(this.wste2)
          const checkExist = this.getSeletedUser.wsteList.filter(v => {
            return  v.WSTE_NM == this.wste1.NAME &&
                    v.WSTE_CODE == this.wste1.CODE &&
                    v.APPR_NM == this.wste2.NAME &&
                    v.APPR_CODE == this.wste2.ID
               })

          if (checkExist.length > 0){
            this.setNull()
            alert('동일한 내역이 존재합니다')
            return
          }
          this.addWsteList({
            WSTE_NM : this.wste1.NAME,
            WSTE_CODE: this.wste1.CODE,
            APPR_NM: this.wste2.NAME,
            APPR_CODE :this.wste2.ID,
            })
          this.$emit('close-dialog')
        }else {
          this.$emit('close-dialog')
        }
        this.setNull()
      },
      selectWsteList1(v,event){
        if (this.wste1 == null)
        {
          event.target.classList.toggle('active')
          this.nowTarget = event.target
          this.wste1 = { NAME : v.NAME , CODE : v.CODE }
        }
        else if (v.CODE == this.wste1.CODE){
          event.target.classList.toggle('active')
          this.nowTarget = null
          this.wste1 = null
        }
        else {
          alert('하나만 선택해주세요')
        }
      },
    selectWsteList2(v,event){
        if (this.wste2 == null)
        {
          event.target.classList.toggle('active')
          this.nowTarget2 = event.target
          this.wste2 = {ID : v.ID, NAME : v.KOREAN }
        }
        else if (v.ID == this.wste2.ID){
          event.target.classList.toggle('active')
          this.nowTarget2 = null
          this.wste2 = null
        }
        else {
          alert('하나만 선택해주세요')
        }
      },
      searchSomething(v){
        // 1. 현재 선택된 것이 있으면 검색할 때 클래스 리스트 에서 active지우고
        // 2. wste1을 null로 만들어준다.
        // 1. 그 이유는 active를 지우지 않으면 선택하지 않은 부분에서도 백그라운드색이 변경되어있고
        // 2. wste1이 있기 때문에 다른 것을 선택할 수가 없다.( 폐유리 검색, 선택 하면 이 후에는 다른 것이 안 되는 현상)
        // 따라서 초기화 시켜준다.
        if(this.nowTarget){
          console.log('ee')
          this.nowTarget.classList.remove('active')
          this.wste1 =null
        }
        if(this.nowTarget2){
          this.nowTarget2.classList.add('active')
        }
        // 검색기능 정규식을 사용하여 포함되는 글자가 있는걸 다 보여줌
        const reg = new RegExp(`${v}`)
        if(v.length != 0){
          clearTimeout(this.timer)
          this.timer = setTimeout(()=>{
            this.cloneWsteList1 = this.showWsteLists.wsteList1.filter(v => reg.test(v.NAME) )
          },500)
        }else {
          clearTimeout(this.timer)
          this.cloneWsteList1 = this.showWsteLists.wsteList1
        }

      }
    },

}
</script>
<style >
.active {
  background-color: red;
  color: white;
}
tbody tr:nth-child(odd) {
   background-color: rgba(238, 239, 243, 0.5) !important;
}
</style>
