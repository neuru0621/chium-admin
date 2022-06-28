<template>
  <div class="text-center">
    <v-pagination
      :value="getPageNum"
      :length="getLastPageNum"
      :total-visible="7"
      @input="changePage"
    />
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  computed : {
    // 게터로 현재 페이지 번호를 가져와서 v-pagination에 넣어줌
    ...mapGetters('biddings',['getPageNum','getLastPageNum','getSearch'])
  },
  methods : {
    //  네비게이션 버튼을 눌렀을 경우
    changePage(pageToGo){
      // vuex에 저장된 값들을 불러와서 같이 라우터 쿼리에 넣어 보내준다.
      this.$router.push({ path: 'list', query: { page: pageToGo, keyword : this.getSearch}})
    }
  }

}
</script>
<style >
.leftVisibleNone button.v-pagination__navigation[aria-label="Previous page"] {
  display: none;
}
</style>
