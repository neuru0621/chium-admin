<template>
  <div>
    <v-card-title>
      트랜잭션 정보
    </v-card-title>
    <v-simple-table

      fixed-header
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
            v-for="transaction,idx in getTransactionList"
            :key="idx"
            style="cursor : pointer"
            @click="goToContent(transaction.ID)"
          >
            <td>{{ transaction.ID }}</td>
            <td>{{ transaction.ORDER_CODE }}</td>
            <td>{{ transaction.TRANSACTION_TYPE }}</td>

            <td>{{ transaction.COLLECTOR_NAME }}</td>
            <td>{{ transaction.COLLECTOR_SITE_ID }}</td>
            <td>{{ getTime(transaction.COLLECT_ASK_END_AT) }}</td>

            <td> ({{ transaction.DISPOSER_TYPE }}) {{ transaction.DISPOSER_NAME }}</td>
            <td> {{ changeBoolToEmoji(transaction.CHECK_STATE) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return {
      thArray : [
        '번호',
        '오더 코드',
        '거래 유형',

        '수거자 이름',
        '수거자 번호',
        '수거자 요청 기한',

        '배출자 이름',
        '확인상태'
        ]
    }
  },
  computed : {
    ...mapGetters('emissions',['getTransactionList'])
  },
  methods : {
    getTime(time){
      if (time){
        return time.slice(0,19)
      }
      return time
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
       this.$router.push({ path: `/admin/main/transaction/${siteId}`})
    },

  }



}
</script>
<style lang="">

</style>
