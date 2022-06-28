<template>
  <div>
    <TransactionDetail />
  </div>
</template>
<script>
import TransactionDetail from "@/components/TransactionContentC/TransactionDetail.vue"
import {mapActions} from "vuex"
export default {
  components : {
    TransactionDetail
  },
  created(){
    const transactionId = Number(this.$route.params.id)
    this.transactionDetail({transactionId})
  },
  methods : {
    ...mapActions('transaction',['transactionDetail'])
  },

}
</script>
<style lang="">

</style>
