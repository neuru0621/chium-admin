/* eslint-disable vuetify/grid-unknown-attributes */
<template>
  <div>
    <v-row style="margin-top : 10px">
      <v-col

        :md="4"
        cols="12"
      >
        <SearchBar />
      </v-col>
    </v-row>
    <v-row style="margin-bottom : 10px">
      <v-col
        cols="6"
        :md="2"
      >
        <ConfirmedSelect />
      </v-col>
      <v-col
        cols="6"
        :md="2"
      >
        <EmitOrColSelect />
      </v-col>
    </v-row>
    <EmitterCollectorTable />
    <EmitterCollectorNav />
  </div>
</template>
<script>
import EmitterCollectorNav from "@/components/EmitterCollectorListC/EmitterCollectorNav.vue"
import EmitterCollectorTable from "@/components/EmitterCollectorListC/EmitterCollectorTable.vue"
import ConfirmedSelect from "@/components/EmitterCollectorListC/ConfirmedSelect.vue"
import SearchBar from "@/components/EmitterCollectorListC/SearchBar.vue"
import EmitOrColSelect from "@/components/EmitterCollectorListC/EmitOrColSelect.vue"
import {mapActions,mapMutations} from "vuex"
export default {
  components : {
    EmitterCollectorNav,EmitterCollectorTable,ConfirmedSelect,SearchBar,EmitOrColSelect
  },
  watch: {
    $route(to) {
      // 네비게이션에서 버튼을 눌렀을 경우에 그 파라미터 값을 받아와서
      // 페이지번호 를 받아온 값으로 바꾸고 데이터들을 불러옴
      // 페이지 번호를 Number로 바꿔준다. 만약 아무 값이 없다면 NaN이 나오니까 아래에서 1로 바꿔주는 작업을 진행
      this.controlQuerySetAndGetPermitList(to)
    }
  },
  created(){
    //created와 watch가 동시에 실행될 일은 없다.✅
    // 처음에 permit2로 들어오게되면 실행이 된다.
    // 처음엔 query params가 없기에 1로 지정해주는 작업을 하고,
    // 임의로 query params를 넣은 경우에 그 번호를 현재번호로 바꿔준 뒤에
    // 데이터를 불러온다.
    this.controlQuerySetAndGetPermitList(this.$route)

  },
  methods : {
    ...mapMutations('emitterCollector',['setPageNum','setSearch','setConfirmed','setEmitOrCol']),
    ...mapActions('emitterCollector',['EmitterCollectorList']),

    controlQuerySetAndGetPermitList(querySet){
      let pageToGo = Number(querySet.query.page)
      let emitOrCol = querySet.query.eoc
      let searchKeyword = querySet.query.keyword
      let filter = querySet.query.filter
      if (querySet.query.page == undefined){
        pageToGo = 1
      }
      // keyword가 없다면 null로 바꿔줌
      if (searchKeyword == undefined){
        searchKeyword = null
      }
      // filter의 값에 따라서 다른 값으로 치환
      if (filter == undefined){
        filter = null
      } else if (filter == 'true'){
        filter = true
      } else if (filter == 'false'){
        filter = false
      }
      if (emitOrCol == undefined){
        emitOrCol = null
      } else if (emitOrCol == 'true'){
        emitOrCol = true
      } else if (emitOrCol == 'false'){
        emitOrCol = false
      }
      // 라우터 쿼리에 담긴 값으로 검색 시작
      this.setConfirmed(filter)
      this.setSearch(searchKeyword)
      this.setPageNum(pageToGo)
      this.setEmitOrCol(emitOrCol)
      this.EmitterCollectorList()
    }
  },


}
</script>
<style lang="">

</style>
