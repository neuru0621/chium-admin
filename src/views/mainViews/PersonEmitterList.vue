<template lang="">
  <div>
    <v-row style="margin-top : 10px">
      <v-col

        :md="6"
        cols="12"
        style="margin-bottom : 10px;"
      >
        <PersonEmitterSearchBar />
      </v-col>
    </v-row>
    <v-row style="margin-bottom : 10px">
      <v-col
        cols="6"
        :md="3"
      >
        <PersonEmitterConfirmedSelect />
      </v-col>
      <v-col
        cols="6"
        :md="3"
      >
        <PersonEmitterActiveSelect />
      </v-col>
    </v-row>
    <PersonEmitterTable />
    <PersonEmitterNav />
  </div>
</template>
<script>
import PersonEmitterNav from "@/components/PersonEmitterListC/PersonEmitterNav.vue"
import PersonEmitterConfirmedSelect from "@/components/PersonEmitterListC/PersonEmitterConfirmedSelect.vue"
import PersonEmitterActiveSelect from "@/components/PersonEmitterListC/PersonEmitterActiveSelect.vue"
import PersonEmitterSearchBar from "@/components/PersonEmitterListC/PersonEmitterSearchBar.vue"
import PersonEmitterTable from "@/components/PersonEmitterListC/PersonEmitterTable.vue"
import {mapActions,mapMutations} from "vuex"
export default {
  components : {
    PersonEmitterNav,
    PersonEmitterSearchBar,
    PersonEmitterTable,
    PersonEmitterConfirmedSelect,
    PersonEmitterActiveSelect
  },
  watch: {
    $route(to) {
      // 네비게이션에서 버튼을 눌렀을 경우에 그 파라미터 값을 받아와서
      // 페이지번호 를 받아온 값으로 바꾸고 데이터들을 불러옴
      // 페이지 번호를 Number로 바꿔준다. 만약 아무 값이 없다면 NaN이 나오니까 아래에서 1로 바꿔주는 작업을 진행
      this.controlQuerySetAndGetList(to)
    }
  },
  created(){
    //created와 watch가 동시에 실행될 일은 없다.✅
    // 처음에 permit2로 들어오게되면 실행이 된다.
    // 처음엔 query params가 없기에 1로 지정해주는 작업을 하고,
    // 임의로 query params를 넣은 경우에 그 번호를 현재번호로 바꿔준 뒤에
    // 데이터를 불러온다.
    this.controlQuerySetAndGetList(this.$route)

  },

   methods : {
    ...mapMutations('emitterCollector',['setPersonEmitterConfirmed','setPersonEmitterActive','setPersonEmitterSearch','setPersonEmitterSiteId','setPersonEmitterPageNum']),
    ...mapActions('emitterCollector',['PersonEmitterList']),

    controlQuerySetAndGetList(querySet){
      let pageToGo = Number(querySet.query.page)
      let confirmed = querySet.query.confirmed
      let searchKeyword = querySet.query.keyword
      let active = querySet.query.active
      let siteId = Number(querySet.query.siteId)

      if (querySet.query.siteId == undefined){
        siteId = 0
      }

      if (querySet.query.page == undefined){
        pageToGo = 1
      }
      // keyword가 없다면 null로 바꿔줌
      if (searchKeyword == undefined){
        searchKeyword = null
      }
      // filter의 값에 따라서 다른 값으로 치환
      if (active == undefined){
        active = null
      } else if (active == 'true'){
        active = true
      } else if (active == 'false'){
        active = false
      }
      if (confirmed == undefined){
        confirmed = null
      } else if (confirmed == 'true'){
        confirmed = true
      } else if (confirmed == 'false'){
        confirmed = false
      }

      this.setPersonEmitterConfirmed(confirmed)
      this.setPersonEmitterActive(active)
      this.setPersonEmitterSearch(searchKeyword)
      this.setPersonEmitterSiteId(siteId)
      this.setPersonEmitterPageNum(pageToGo)
      this.PersonEmitterList()
    }
  },
}
</script>
<style lang="">

</style>

