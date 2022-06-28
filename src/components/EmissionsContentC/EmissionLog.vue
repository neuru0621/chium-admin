<template>
  <div>
    <v-card-title>
      로그 정보
    </v-card-title>

    <v-simple-table

      fixed-header
      height="300px"
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
            v-for="log,idx in getLogList"
            :key="idx"
            style="cursor : pointer"
            @click="showMeLog(idx)"
          >
            <td> {{ log.ID }} </td>
            <td> {{ log.USER_ID }} </td>
            <td> {{ log.USER_NAME }} </td>
            <td> {{ log.BIDDING_ID }} </td>
            <td> {{ log.ORDER_CODE }} </td>
            <td> {{ log.ORDER_ID }} </td>
            <td> {{ shortenContent(log.JOB_NAME) }} </td>
            <td> {{ log.REPORT_ID }} </td>
            <td> {{ log.SITE_ID }} </td>
            <td> {{ log.SITE_NAME }} </td>
            <td> {{ log.TRANSACTION_ID }} </td>
            <td> {{ getTime(log.CREATED_AT) }} </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <LogPopup
      :dialog="dialog"
      :content="content"
      @closeDialog="closeDialog"
    />
  </div>
</template>
<script>
import LogPopup from "./EmissionLogPopup.vue"
import {mapGetters} from "vuex"
export default {
  components : {
    LogPopup
  },
  data(){
    return {
      thArray : [
        'ID',
        '사용자 등록 번호',
        '사용자 이름',
        '투찰 번호',
        '오더 코드',
        '오더 아이디',
        '내용',
        '리포트 아이디',
        '사이트 아이디',
        '사이트 이름',
        '트랜잭션 아이디',
        '생성 일자'
        ],
      dialog : false,
      content : null,
    }
  },
  computed : {
    ...mapGetters('emissions',['getLogList'])
  },
  methods : {
    getTime(time){
      if (time){
        return time.slice(0,19)
      }
      return time
    },
    shortenContent(content){
      if (content==null ||content==undefined){
        return
      }
      if (content.length > 35){
         return content.slice(0,35) + '...'
      }
      return content

    },
    showMeLog(logIdx){
      const newArr = this.getLogList[logIdx].JOB_NAME.split('/n')
      this.content = newArr
      this.dialog = true
    },
    closeDialog(){
      this.dialog = false
    },

  }



}
</script>
<style lang="">

</style>
