<template>
  <v-autocomplete
    dense
    rounded
    solo
    :items="items"
    hide-details=""
    :value="nowValue"
    @change="changeValue"
  />
</template>
<script>
import {mapGetters,mapMutations} from "vuex"
export default {
  data(){
    return{
      items : [],

    }
  },

  computed : {
    ...mapGetters('emitterCollector',[
      'getPersonEmitterActiveList',
      'getPersonEmitterActive',
      'getPersonEmitterSearch',
      'getPersonEmitterConfirmed',
      'getPersonEmitterSiteId'
      ]
    ),
    // 현재 vuex에 선택되어 있는 값을 적절한 keyword로 바꾸어
    // 기본값으로 설정
    nowValue(){
      if(this.getPersonEmitterActive == null){
        return '모두'
      } else if (this.getPersonEmitterActive == true){
        return '활성화'
      } else {
        return '비활성화'
      }

    }
  },
  // 확인, 미확인, 모두 3가지를 items에 넣어 표시 되도록 하였다.
  created(){
    this.items = this.getPersonEmitterActiveList.map(c => {
      switch (c){
        case null:
          return '모두'
        case true:
          return '활성화'
        case false:
          return '비활성화'
      }
    })
  },
  methods : {
    ...mapMutations('emitterCollector',['setPersonEmitterActive']),
    // 변경하였을 때 한글을 적절한 값으로 바꾼 뒤
    changeValue(v){
      let active
      if(v == '모두'){
        active = null
      } else if (v == '활성화'){
        active = true
      } else {
        active = false
      }
      // 상태를 변경해주고,
      this.setPersonEmitterActive(active)
      console.log(this.getPersonEmitterActive,'액티브요')
      // vuex에 저장된 값들을 불러와서 같이 라우터 쿼리에 넣어 보내준다.
      this.$router.push({ path: 'list', query: {
            page : 1,
            confirmed: this.getPersonEmitterConfirmed,
            keyword : this.getPersonEmitterSearch,
            active : this.getPersonEmitterActive,
            siteId : this.getPersonEmitterSiteId,
          }
        }
      )
    }
  }
}
</script>
<style lang="">

</style>
