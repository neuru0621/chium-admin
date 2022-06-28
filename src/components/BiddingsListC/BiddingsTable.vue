<template>
  <v-simple-table

    fixed-header
    height="700px"
  >
    <template #default>
      <thead>
        <tr>
          <th
            v-for="th,idx in thArray"
            :key="idx"
          >
            {{ th }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="bidding,idx in getBiddingsList"
          :key="idx"
          style="cursor : pointer"
          @click="goToContent(bidding.BIDDING_ID)"
        >
          <td>{{ bidding.BIDDING_ID }}</td>
          <td>{{ bidding.BIDDING_RANK }}</td>
          <td>{{ changeNumToRegNum(bidding.BID_AMOUNT) }}</td>
          <td>{{ bidding.ORDER_ID }}</td>
          <td>{{ bidding.COLLECTOR_NAME }}</td>
          <td> ({{ bidding.DISPOSER_TYPE }}) {{ bidding.DISPOSER_NAME }}</td>
          <td>{{ changeBoolToEmoji(bidding.ACTIVE) }}</td>
          <td>{{ changeBoolToEmoji(bidding.CHECK_STATE) }}</td>
          <td>{{ getTime(bidding.CREATED_AT) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return {
      thArray : [
        '등록 번호',
        '낙찰 순위',
        '입찰 총 금액',
        '오더 번호',
        '수거자 이름',
        '배출자 이름',
        '활성화',
        '확인상태',
        '등록일자',
        ]
    }
  },
  computed : {
    ...mapGetters('biddings',['getBiddingsList'])
  },
  methods : {
    getTime(time){
      return time.slice(0,19)
    },
    changeBoolToEmoji(bool){
      return bool ? '✅' : '❌'
    },
    changeNumToRegNum(num){
      if (num == null){
        return
      }
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'원'
    },
    goToContent(siteId){
       this.$router.push({ path: `./${siteId}`})
    },

  }



}
</script>
<style lang="">

</style>
