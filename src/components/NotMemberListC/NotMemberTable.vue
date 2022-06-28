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
          v-for="notMember,idx in getNotMemberList"
          :key="idx"
          style="cursor : pointer"
          @click="goToSomeWhere({key : 'ID', value : notMember.ID})"
        >
          <td>{{ notMember.ID }}</td>
          <td>{{ notMember.COMP_NAME }}</td>
          <td>{{ notMember.BIZ_NAME }}</td>
          <td>{{ notMember.CONTACT }} </td>
          <td>{{ notMember.FAX }}</td>
          <td>{{ notMember.EMAIL }}</td>
          <td> {{ changeToIsTransit(notMember.IS_TRANSIT) }}</td>
          <td> {{ notMember.REP_NAME }}</td>
          <td>{{ notMember.WEBSITE }}</td>
          <td>{{ notMember.ADDR }}</td>
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
        '컴퍼니 이름',
        '업종',
        '전화번호',
        '팩스번호',
        '이메일',
        '수집운반',
        '대표자 성명',
        '웹사이트',
        '주소',
        ]
    }


  },
  computed : {
    ...mapGetters('notMember',['getNotMemberList'])
  },
  methods : {
    changeToIsTransit(num){
      if (num == 1){
        return '가능'
      }
      return '불가'
    }
  ,

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
