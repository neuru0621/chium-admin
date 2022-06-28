<template>
  <div>
    <v-card-title>
      개인 배출자 👷‍♂️
    </v-card-title>
    <v-simple-table
      fixed-header
    >
      <template #default>
        <thead>
          <tr>
            <th
              v-for="th,idx in personEmitterTh"
              :key="th+idx"
              class="text-left"
            >
              {{ th }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="person,idx in getPersonEmitterList"
            :key="idx"
            style="cursor : pointer"
            @click="goToContent(person.ID)"
          >
            <td>{{ person.ID }}</td>
            <td>{{ person.USER_ID }}</td>
            <td>{{ person.USER_NAME }}</td>
            <td>{{ person.PHONE }}</td>
            <td>{{ changeStateToEmoji(person.ACTIVE) }}</td>
            <td>{{ changeStateToEmoji(person.CONFIRMED) }}</td>
            <td>{{ person.CLASS }}</td>
            <td>{{ person.CS_MANAGER_NAME }}</td>
            <td>{{ getTime(person.CREATED_AT) }}</td>
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
      personEmitterTh : [
        'ID',
        '계정 아이디',
        '이름',
        '핸드폰',
        '활성화',
        '확인 상태',
        '권한',
        '담당 CS 매니저',
        '등록 일자'
      ]
    }
  },
  computed : {
    ...mapGetters('emitterCollector',['getPersonEmitterList']),

  },
  methods : {
    getTime(time){
      if (time){
        return time.slice(0,19)
      }
      return time
    },
    goToContent(personEmitterId){
       this.$router.push({ path: `./${personEmitterId}`})
    },
    changeStateToEmoji(state){
      return  state ? '✅' : '❌'
    }
  }
}
</script>
<style lang="">

</style>
