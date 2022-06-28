<template>
  <div>
    <ReportDetail />
  </div>
</template>
<script>
import ReportDetail from "@/components/ReportContentC/ReportDetail.vue"
import {mapActions} from "vuex"
export default {
  components : {
    ReportDetail
  },
  created(){
    const reportId = Number(this.$route.params.id)
    this.reportDetail({reportId})
  },
  methods : {
    ...mapActions('report',['reportDetail'])
  },

}
</script>
<style lang="">

</style>
