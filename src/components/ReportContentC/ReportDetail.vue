<template>
  <div>
    <v-sheet>
      <v-card style="padding : 40px">
        <v-card-title>
          처리보고서 상세 내역
        </v-card-title>
        <v-row justify="end">
          <v-col
            cols="auto"
          >
            <v-btn @click="reportModify">
              수정하기
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="value, key in getReportDetail"
            :key="key"
            cols="12"
            md="6"
            lg="6"
          >
            <v-row>
              <v-col cols="auto">
                {{ englishToKorean(key) }} :
              </v-col>
              <v-col cols="auto">
                <div v-if="key === 'CONFIRMED'">
                  <span :id="key">
                    {{ changeValue(value,key) }}
                  </span>

                  <v-icon @click="changeState(key)">
                    mdi-pencil
                  </v-icon>
                </div>
                <div v-else-if="key === 'ORDER_ID'">
                  <a @click="goToSomeWhere(value,key)">{{ changeValue(value,key) }}</a>
                </div>
                <div v-else-if="key === 'WSTE_FCTL_INFO' && value !== null">
                  <span>
                    {{ value.CATEGORY_NAME }}
                  </span>
                  <ul>
                    <li
                      v-for="sub,idx in value.SUB_CATEGORY"
                      :key="sub+idx"
                    >
                      {{ sub.CATEGORY_NAME }} : {{ sub.VALUE_NAME }}
                    </li>
                  </ul>
                </div>
                <div v-else-if="key === 'TRANSACTION_ID' || key === 'DISPOSER_SITE_ID' || key === 'COLLECTOR_SITE_ID'">
                  <a @click="goToSomeWhere(value,key)">{{ changeValue(value,key) }}</a>
                </div>
                <div v-else-if="key === 'PRICE' || key === 'QUANTITY'">
                  <v-text-field
                    :id="key+value"
                    dense
                    :value="value"
                    hide-details=""
                    solo
                    readonly
                    append-icon="mdi-pencil"
                    @click:append="changeContent(key+value)"
                    @input="MyVmodel(key,$event)"
                  />
                </div>

                <div v-else>
                  {{ changeValue(value,key) }}
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-sheet>
    <v-card style="margin-top : 50px;">
      <v-card-title>
        노트
      </v-card-title>
      <NoteInput
        :report-id="reportId"
        :order-id="orderId"
      />
      <NoteList
        v-if="getNotes"
        :note-list="getNotes"
      />
    </v-card>
  </div>
</template>
<script>
import NoteInput from "@/components/CommonC/NoteInput.vue"
import NoteList from "@/components/CommonC/NoteList.vue"
import {mapGetters, mapMutations, mapActions} from "vuex"

export default {
  components : {
    NoteInput,
    NoteList
  },
  data(){
    return {
      englishToKoreanObj : {
        COLLECTOR_MANAGER_ID: '리포트 작성자 번호',
        COLLECTOR_SITE_ID: '수거자 사이트 번호',
        COLLECTOR_SITE_NAME: '수거자 사이트 이름',
        CONFIRMED: '배출자 확인 상태',
        ORDER_ID: '오더 번호',
        CONFIRMED_AT: '배출자 확인 시각',
        CREATED_AT: '생성 시각',
        DISPOSER_MANAGER_ID : '보고서 확인자 번호' ,
        DISPOSER_SITE_ID : '배출자 사이트 번호',
        DISPOSER_SITE_NAME : '배출자 사이트 이름',
        ID : '리포트 등록 번호',
        PRICE : '처리 가격',
        QUANTITY : '처리 수량',
        TRANSACTION_COMPLETED_AT : "트랜잭션 완료 날짜",
        TRANSACTION_ID : '트랜잭션 번호',
        TRMT_METHOD : "처리 코드",
        TRMT_METHOD_NAME : "처리 방법",
        UNIT : '처리 단위',
        UPDATED_AT : '최종 수정 일자',
        WSTE_APPEARANCE : '성상 코드',
        WSTE_APPEARANCE_NAME : '성상',
        WSTE_CODE : '폐기물 등록 코드',
        WSTE_FCTL_INFO : '폐기물 처리 상세정보',
        WSTE_NAME: '폐기물 이름',
      },
      orderId : null,
      reportId : null


    }
  },
  computed : {
    ...mapGetters('report',['getReportDetail']),
    ...mapGetters('common',['getNotes'])
  },
  watch : {
    getReportDetail(to){
      this.orderId = to.ORDER_ID
      this.reportId = to.ID
    }
  },
  methods : {
    ...mapMutations('report',['changeSelectedReport']),
    ...mapActions('report',['reportModify']),
    // 키를 적절한 한국어로 바꿔주는 역할
    englishToKorean(key){
      return this.englishToKoreanObj[key]
    },

    changeValue(value,key){
      const stateArray = [
        'CONFIRMED',
        'DISPOSER_SITE_ID'
      ]
      if (String(value)[4] === '-' && String(value)[7] === '-'){
        return this.getTime(value)
      }
      else if (stateArray.indexOf(key) > -1) {
        return this.switchValue({key,value})
      }
      else if (key === 'PRICE'){
        if (value){
          const price = value.toLocaleString('ko-KR')
          return price + '원'
        }
        return value
      }
      return value
    },
    getTime(time){
      return time.slice(0,19)
    },

    changeState(key){
      let value
      const el = document.getElementById(key)
      if (el.innerText === '확인'){
        el.innerText = '미확인'
        value = 0
      } else {
        el.innerText = '확인'
        value = 1

      }
      this.changeSelectedReport({key,value})

    },
    changeContent(e){
      const el = document.getElementById(e)
       if (el.readOnly){
        el.readOnly = false
      } else {
        el.readOnly = true
      }
       el.focus()
    },
    MyVmodel(key,value){
      value = Number(value)
      if (isNaN(value)){
        return
      }
      this.changeSelectedReport({key,value})
    },
    goToSomeWhere(value,key){
      if (key === 'COLLECTOR_SITE_ID') {
        this.$router.push(`/admin/main/emitter-collector/${value}`)
      }
      else if (key === 'DISPOSER_SITE_ID') {
        // 분기처리.
        const areYouPerson = this.getReportDetail.DISPOSER_SITE_ID === 0 ? true : false
        if (areYouPerson){
          this.$router.push(`/admin/main/person-emitter/${value}`)
        } else {
          this.$router.push(`/admin/main/emitter-collector/${value}`)
        }
      }
      else if (key === 'TRANSACTION_ID'){
        this.$router.push(`/admin/main/transaction/${value}`)
      }
      else if (key === 'ORDER_ID'){
        this.$router.push(`/admin/main/emissions/${value}`)
      }
    },

    switchValue({key,value}){

      if (key === 'CONFIRMED'){
        let changedValue
        switch (value) {
          case 0:
            changedValue = '미확인'
            break;
          case 1:
            changedValue = '확인'
        }
        return changedValue
      } else if (key === 'DISPOSER_SITE_ID') {
        let changedValue
        switch (value) {
          case 0:
            changedValue = ''
            break;
          default:
            changedValue = value
        }
        return changedValue
      }
    },

  }
}
</script>
<style lang="">

</style>
