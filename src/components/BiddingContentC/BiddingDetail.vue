<template>
  <div>
    <v-sheet>
      <v-card style="padding : 40px">
        <v-card-title>
          BIDDING 상세 내역
        </v-card-title>
        <v-row justify="end">
          <v-col
            cols="auto"
          >
            <v-btn @click="modifyBiddingDetail">
              수정하기
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="value, key in getBiddingDetails"
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
                <a
                  v-if="key === 'ORDER_INFO'"
                  :href="returnUrl(value,key)"
                >
                  {{ value[0].ORDER_CODE }}
                </a>
                <a
                  v-else-if="key === 'COLLECTOR_ID'"
                  :href="returnUrl(value,key)"
                >
                  {{ value }}
                </a>
                <ul v-else-if="key === 'WSTE_INFO'">
                  <li
                    v-for="wste, idx in value"
                    :key="idx"
                  >
                    {{ changeValue(value, key) }}
                  </li>
                </ul>
                <div v-else>
                  <span v-if="canChangeArray.indexOf(key) > -1">
                    {{ changeValue(value,key) }}
                    <v-icon
                      style="cursor : pointer"
                      @click="changeState(value,key)"
                    >
                      mdi-pencil
                    </v-icon>
                  </span>
                  <span v-else>
                    {{ changeValue(value,key) }}

                  </span>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-sheet>
    <v-card style="margin-top : 50px;">
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
    </v-card>
  </div>
</template>
<script>
import NoteInput from "@/components/CommonC/NoteInput.vue"
import NoteList from "@/components/CommonC/NoteList.vue"
import {mapGetters, mapMutations, mapActions} from "vuex"
export default {
   components : {
    NoteInput,
    NoteList
  },
  data(){
    return {
      englishToKoreanObj : {
        ACTIVE: '활성화',
        BIDDING_ID: '투찰 등록 번호',
        BIDDING_RANK: '낙찰 순위',
        BIDDING_VISIBLE: 'BIDDING_VISIBLE',
        BIDDING_VISIBLE_CHANGED_AT: 'BIDDING_VISIBLE_CHANDGED_AT',
        BID_AMOUNT: '입찰 총 금액',
        CANCEL_BIDDING: '입찰 포기' ,
        CANCEL_BIDDING_AT: '입찰 포기 시각',
        CANCEL_VISIT: '방문 취소',
        CANCEL_VISIT_AT: '방문 취소 시각',
        CHECK_STATE: '확인 상태',
        COLLECTOR_ID: '수거자 번호',
        CREATED_AT: "레코드 생성 시각",
        DATE_OF_BIDDING: '투찰 시각',
        DATE_OF_VISIT: "방문 시각",
        DELETED: '삭제 상태',
        DELETED_AT: '삭제 시각',
        GIVEUP_BIDDING: '투찰 포기',
        GIVEUP_BIDDING_AT: '투찰 포기 시각',
        MAKE_DECISION: '최종 수락 상태',
        MAKE_DECISION_AT: '최종 수락 시각',
        MAX_DECISION_AT: '최종 수락 기한',
        SITE_NAME: '배출자 이름',
        ORDER_CODE: '오더 코드',
        ORDER_INFO: '오더 정보',
        ORDER_VISIBLE: 'ORDER_VISIBLE',
        ORDER_VISIBLE_CHANGED_AT: 'ORDER_VISIBLE_CHANGED_AT',
        RESPONSE_VISIT: '방문 수락 상태',
        RESPONSE_VISIT_AT: "방문 수락 / 거절 시각",
        SELECTED: '선정 상태',
        SELECTED_AT: '선정 시각',
        TRANSACTION_ID: '처리 등록 번호',
        TRANSACTION_INFO: '처리 상태',
        TRMT_METHOD: '폐기물 처리 방법',
        UPDATED_AT: "최종 수정 시각",
        WSTE_INFO: '등록 폐기물 리스트'
      },
      canChangeArray : ['BIDDING_VISIBLE','ORDER_VISIBLE'],
      orderId : null,
      biddingId : null
    }
  },
  computed : {
    ...mapGetters('biddings',['getBiddingDetails']),
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
    boolToState(value){
      return value >= 1 ? '✅' : ''
    },
    changeValue(value,key){
      const stateArray = [
        'ACTIVE',
        'BIDDING_VISIBLE',
        'CANCEL_BIDDING',
        'CANCEL_VISIT',
        'CHECK_STATE',
        'DELETED',
        'GIVEUP_BIDDING',
        'MAKE_DECISION',
        'ORDER_VISIBLE',
        'RESPONSE_VISIT',
        'SELECTED'
      ]
      if (String(value)[4] === '-' && String(value)[7] === '-'){
        return this.getTime(value)
      }
      else if (stateArray.indexOf(key) > -1) {
        return this.boolToState(value)
      }
      else if (key === 'WSTE_INFO'){
        const wsteInfo = value[0]
        const price = wsteInfo.UNIT_PRICE.toLocaleString('ko-KR')
        return `${wsteInfo.WSTE_NM}(${wsteInfo.TRMT_METHOD_NM}) ${wsteInfo.VOLUME}${wsteInfo.UNIT}당 ${price}원`
      }
      else if (key === 'BID_AMOUNT'){
        if (value){
          const price = value.toLocaleString('ko-KR')
          return price + '원'
        }
        return value
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
