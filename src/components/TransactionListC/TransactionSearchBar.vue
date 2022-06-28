<template>
  <v-text-field
    solo
    rounded
    hide-details=""
    label="검색어를 입력해주세요."
    prepend-inner-icon="mdi-map-marker"
    :value="getSearch"
    @keyup.enter="search"
    @keyup="keyUpEvent"
  />
</template>
<script>
import {mapMutations,mapGetters} from "vuex"
export default {
  data(){
    return{
      preKeyword : ''
    }
  },
  computed : {
    ...mapGetters('transaction',['getSearch'])
  },
  methods : {
    ...mapMutations('transaction',['setSearch']),
    // 엔터를 눌렀을 때 발생
    search(event){
      const content = event.target.value
      // 이전과 동일한 키워드를 작성하면 return
      if (this.preKeyword == content){
        alert('동일한 키워드를 입력하셨습니다. 다시 입력해주세요')
        return
      }
      // vuex에 저장된 값들을 불러와서 같이 라우터 쿼리에 넣어 보내준다.
      this.$router.push({ path: 'list', query: { page: 1 , keyword : this.getSearch }})
      this.preKeyword = content
    },
    // 검색어를 입력할 때 마다 발생, 빈 값이면 null로 만들어 준다.
    keyUpEvent(event){
      let content = event.target.value
      if (content == ""){
        content = null
      }
      this.setSearch(content)
    }
  }
}
</script>
<style lang="">

</style>
