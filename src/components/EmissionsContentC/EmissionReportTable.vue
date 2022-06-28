<template>
  <div>
    <v-card-title>
      처리보고서 정보
    </v-card-title>

    <v-simple-table
      fixed-header
    >
      <template #default>
        <thead>
          <tr>
            <th
              v-for="th,idx in reportTh"
              :key="th+idx"
              class="text-left"
            >
              {{ th }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="report,idx in getReportInfo"
            :key="idx"
            style="cursor : pointer"
            @click="goToContent(report.ID)"
          >
            <td>{{ report.ID }}</td>
            <td>{{ report.SITE_NAME }}</td>
            <td>{{ report.PRICE }}</td>
            <td>{{ report.QUANTITY }}</td>
            <td>{{ report.UNIT }}</td>
            <td>{{ report.TRMT_METHOD }}</td>
            <td>{{ report.WSTE_APPEARANCE }}</td>
            <td>{{ report.WSTE_CODE }}</td>
            <td>{{ report.WSTE_NM }}</td>
            <td>{{ getTime(report.COMPLETED_AT) }}</td>
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
      reportTh : [
        '리포트 번호',
        '사이트 이름',
        '가격',
        '수량',
        '단위',
        '처리 방법',
        '성상',
        '폐기물 코드',
        '폐기물 명',
        '생성 시각'
      ]
    }
  },
  computed : {
    ...mapGetters('emissions',['getReportInfo'])
  },
  methods : {
    getTime(time){
      if (time){
        return time.slice(0,19)
      }
      return time
    },
    goToContent(reportId){
       this.$router.push({ path: `/admin/main/report/${reportId}`})
    },
  }
}
</script>
<style lang="">

</style>
