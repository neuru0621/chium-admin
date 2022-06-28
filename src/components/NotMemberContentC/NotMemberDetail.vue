<template>
  <div>
    <v-sheet>
      <v-card style="padding : 40px">
        <v-card-title>
          비회원사 상세 내역
        </v-card-title>

        <v-row>
          <v-col
            v-for="value, key in getNotMemberDetail"
            :key="key"
            cols="12"
            md="6"
            lg="6"
          >
            <v-row>
              <v-col cols="auto">
                {{ englishToKorean(key) }} :
              </v-col>
              <v-col cols="auto">
                {{ changeValue(value,key) }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-sheet>
    <!-- <v-card style="margin-top : 50px;">
      <v-card-title>
        노트
      </v-card-title>
      <NoteInput
        :order-id="orderId"
        :bidding-id="biddingId"
      />
      <NoteList
        v-if="getNotes"
        :note-list="getNotes"
      />
    </v-card> -->
  </div>
</template>
<script>
// import NoteInput from "@/components/CommonC/NoteInput.vue"
// import NoteList from "@/components/CommonC/NoteList.vue"
import {mapGetters, mapMutations, mapActions} from "vuex"
export default {
  //  components : {
  //   NoteInput,
  //   NoteList
  // },
  data(){
    return {
      englishToKoreanObj : {
        ADDR: '주소',
        BIZ_NAME: '업종',
        COMP_NAME: '컴퍼니 이름',
        CONTACT: '전화번호',
        EMAIL: '이메일',
        FAX: '팩스번호',
        ID: '아이디' ,
        IS_TRANSIT: '수집운반',
        REP_NAME: '대표자명',
        WEBSITE: '웹사이트',
      },
      canChangeArray : ['BIDDING_VISIBLE','ORDER_VISIBLE'],
      orderId : null,
      biddingId : null
    }
  },
  computed : {
    ...mapGetters('notMember',['getNotMemberDetail']),
    ...mapGetters('common',['getNotes']),
  },
  watch : {
    getBiddingDetails(to){
      this.orderId = to.ORDER_INFO[0].ID
      this.biddingId = to.BIDDING_ID
    }
  },
  methods : {
    ...mapMutations('biddings',['changeBiddingDetail']),
    ...mapActions('biddings',['modifyBiddingDetail']),
    englishToKorean(key){
      return this.englishToKoreanObj[key]
    },





    changeValue(value,key){
      if (key === 'IS_TRANSIT'){
        if(value === 1) {
          return '가능'
        }
        return '불가'
      }
      return value
    },

    getTime(time){
      return time.slice(0,19)
    },
    returnUrl(value,key){
      if (key === 'ORDER_INFO'){
        return `/admin/main/emissions/${value[0].ID}`
      } else if (key === 'COLLECTOR_ID') {
        return `/admin/main/emitter-collector/${value}`
      }
    },
    changeState(value,key){
      if (this.canChangeArray.indexOf(key) > -1){
        if (value === 0) value = 1
        else if (value ===1 ) value = 0
        this.changeBiddingDetail({value,key})
      }
    },
  }
}
</script>
<style lang="">

</style>
