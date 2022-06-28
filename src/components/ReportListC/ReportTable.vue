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
          v-for="report,idx in getReportList"
          :key="idx"
          style="cursor : pointer"
          @click="goToSomeWhere({key : 'ID', value : report.ID})"
        >
          <td>{{ report.ID }}</td>
          <td>{{ report.ORDER_CODE }}</td>
          <td>
            {{ report.COLLECTOR_SITE_ID }}
          </td>
          <td>{{ report.COLLECTOR_SITE_NAME }}</td>
          <td>{{ report.DISPOSER_ID }}</td>
          <td> ({{ report.DISPOSER_TYPE }}) {{ report.DISPOSER_NAME }}</td>
          <td>
            {{ report.DISPOSER_ORDER_ID }}
          </td>
          <td>{{ report.DISPOSER_SITE_ID }}</td>
          <td>{{ getTime(report.CREATED_AT) }}</td>
          <td>{{ changeBoolToEmoji(report.CONFIRMED) }}</td>
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
        'ID',
        '오더 코드',
        '수거자 사이트 번호',
        '수거자 이름',
        '배출자 번호',
        '배출자 이름',
        '배출자 오더 번호',
        '배출자 사이트 번호',
        '등록 시각',
        '확인상태'
        ]
    }
  },
  computed : {
    ...mapGetters('report',['getReportList'])
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


    goToSomeWhere({value,key}){

      if (key === 'ID'){
        this.$router.push(`./${value}`)
        return
      }
    },
  }



}
</script>
<style lang="">

</style>
