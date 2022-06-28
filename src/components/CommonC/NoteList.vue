<template>
  <div>
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
            v-for="note,idx in noteList"
            :key="idx"
            style="cursor : pointer"
            @click="showMeNote(idx)"
          >
            <td>{{ note.ID }}</td>
            <td>{{ note.ADMIN_ID }} {{ note.ADMIN_NAME }}</td>
            <td>{{ note.BIDDING_ID }}</td>

            <td>{{ note.MEMBER_NAME }}</td>
            <td>{{ shortenContent(note.NOTE) }}</td>
            <td>{{ note.ORDER_CODE }}</td>
            <td>{{ note.ORDER_ID }}</td>
            <td>{{ note.REPORT_ID }}</td>

            <td>{{ note.SITE_NAME }}</td>
            <td>{{ note.TRANSACTION_ID }}</td>
            <td>{{ getTime(note.CREATED_AT) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <NotePopup
      :dialog="dialog"
      :content="content"
      @closeDialog="closeDialog"
    />
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import NotePopup from "@/components/CommonC/NotePopup.vue"
export default {
  components : {
    NotePopup
  },
  props : {
    noteList : {
      type :  Array,
      default : ()=> [],
    },
  },
  data(){
    return {
      dialog : false,
      content : [],
      thArray : [
        '노트 번호',
        '관리자',
        '입찰 번호',

        '유저 이름',
        '내용',
        '오더 코드',
        '오더 번호',
        '처리보고서 번호',

        '사이트 이름',
        '트랜잭션 번호',
        '등록 시각'
      ]
    }
  },

  computed : {
    ...mapGetters('common',['getNotes'])
  },
  methods : {
    getTime(time){
      if (time){
        return time.slice(0,19)
      }
      return time
    },
    closeDialog(){
      this.dialog = false
    },
    showMeNote(noteIdx){
      const newArr = this.getNotes[noteIdx].NOTE.split('\n')
      this.content = newArr
      this.dialog = true
    },
    shortenContent(content){
      if (content !== null && content.length > 35){
         return content.slice(0,35) + '...'
      }
      return content
    },
  }
}
</script>
<style lang="">

</style>
