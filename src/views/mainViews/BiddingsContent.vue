<template>
  <div>
    <BiddingDetail />
  </div>
</template>
<script>
import BiddingDetail from "@/components/BiddingContentC/BiddingDetail.vue"
import {mapActions} from "vuex"
export default {
  components : {
    BiddingDetail
  },
  created(){
    const biddingId = this.$route.params.id
    this.biddingDetail({biddingId})
  },
  methods : {
    ...mapActions('biddings',['biddingDetail'])
  },

}
</script>
<style lang="">

</style>
