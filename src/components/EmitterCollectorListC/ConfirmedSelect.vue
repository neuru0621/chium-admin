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
    ...mapGetters('emitterCollector',['getConfirmedList','getConfirmedState','getSearch','getEmitColList','getEmitOrCol']),
    // 현재 vuex에 선택되어 있는 값을 적절한 keyword로 바꾸어
    // 기본값으로 설정
    nowValue(){
      if(this.getConfirmedState == null){
        return '모두'
      } else if (this.getConfirmedState == true){
        return '확인만'
      } else {
        return '미확인만'
      }

    }
  },
  // 확인, 미확인, 모두 3가지를 items에 넣어 표시 되도록 하였다.
  created(){
    this.items = this.getConfirmedList.map(c => {
      switch (c){
        case null:
          return '모두'
        case true:
          return '확인만'
        case false:
          return '미확인만'
      }
    })
  },
  methods : {
    ...mapMutations('emitterCollector',['setConfirmed']),
    // 변경하였을 때 한글을 적절한 값으로 바꾼 뒤
    changeValue(v){
      let confirmed
      if(v == '모두'){
        confirmed = null
      } else if (v == '확인만'){
        confirmed = true
      } else {
        confirmed = false
      }
      // 상태를 변경해주고,
      this.setConfirmed(confirmed)
      // vuex에 저장된 값들을 불러와서 같이 라우터 쿼리에 넣어 보내준다.
      this.$router.push({ path: 'emitter-collector', query: { page : 1, filter: confirmed, keyword : this.getSearch, eoc : this.getEmitOrCol }})
    }
  }
}
</script>
<style lang="">

</style>
