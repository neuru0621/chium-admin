<template>
  <div>
    <v-sheet>
      <v-card style="padding : 40px">
        <v-card-title>
          트랜잭션 상세 내역
        </v-card-title>
        <v-row>
          <v-col
            v-for="value, key in getTransactionDetail"
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
                <div v-if="key === 'ORDER_INFO' || key === 'COLLECTOR_ID' || key === 'COLLECTOR_BIDDING_ID'">
                  <a @click="goToSomeWhere(value,key)">{{ changeValue(value,key) }}</a>
                </div>
                <div v-else-if="key === 'QCC_IMG_PATH'">
                  <a
                    :href="value"
                    target="_blank"
                  >{{ changeValue(value,key) }}</a>
                </div>
                <div v-else-if="key === 'COLLECTOR_SITE_ID'">
                  <span>
                    {{ value === null ? '입찰거래' : '기존거래' }}
                  </span>
                  <a
                    v-if="value !== null"
                    @click="goToSomeWhere(value,key)"
                  >( 수거자 사이트 아이디 : {{ changeValue(value,key) }} )</a>
                </div>
                <ul v-else-if="key === 'WSTE_INFO'">
                  <li
                    v-for="wste, idx in value"
                    :key="idx"
                  >
                    {{ changeValue(value, key) }}
                  </li>
                </ul>
                <div v-else>
                  {{ changeValue(value,key) }}
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
        :transaction-id="transactionId"
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
import {mapGetters, mapMutations} from "vuex"
export default {
  components : {
    NoteInput,NoteList
  },
  data(){
    return {
      englishToKoreanObj : {
        ACCEPT_ASK_END: '수거 요청 수락 여부',
        ACCEPT_ASK_END_AT: '수거 요청 수락 / 거절 시각',
        ASKER_ID: '배출자 등록번호',
        CHECK_STATE: '확인 여부',
        COLLECTOR_BIDDING_ID: '비딩 아이디',
        COLLECTOR_ID: '수거업체 등록번호',
        COLLECTOR_REPORTED: '보고서 작성 여부' ,
        COLLECTOR_REPORTED_AT: '보고서 작성 시각',
        COLLECTOR_SITE_ID: '거래 유형',
        COLLECT_ASK_END_AT: '수거 요청일',
        COLLECT_END_AT: '수거 완료일',
        CREATED_AT: '트랜잭션 생성일',
        DATE_OF_VISIT: "수거자 방문일",
        DISPOSAL_ORDER_ID: '폐기물 등록번호',
        ID: "트랜잭션 등록번호",
        IN_PROGRESS: '트랜잭션 진행상태',
        MAX_DECISION_AT: '수거자 응답 기한',
        ORDER_INFO: '오더 정보',
        PRICE_UNIT: '단가',
        QCC_IMG_PATH: '계근 증명서 이미지',
        REJECT_REASON: '거절 사유',
        UPDATED_AT: '최종 수정일',
        VISIT_END_AT: '방문 마감일',
        VISIT_START_AT: '방문 시작일',
        WSTE_APPEARANCE: '폐기물 성상',
        WSTE_CODE: '폐기물 코드',
        WSTE_INFO: '폐기물 정보',
        WSTE_QUANTITY: '폐기물 수량',
        WSTE_UNIT: "폐기물 단위",
      },
      orderId : null,
      biddingId : null,
      transactionId : null

    }
  },
  computed : {
    ...mapGetters('transaction',['getTransactionDetail']),
    ...mapGetters('common',['getNotes']),

  },
  watch : {
    getTransactionDetail(to){
      this.orderId = to.ORDER_INFO[0].ID
      this.biddingId = to.COLLECTOR_BIDDING_ID
      this.transactionId = to.ID
    }
  },
  methods : {
    ...mapMutations('transaction',['changeBiddingDetail']),
    // ...mapActions('transaction',['modifyTransactionDetail']),
    // 키를 적절한 한국어로 바꿔주는 역할
    englishToKorean(key){
      return this.englishToKoreanObj[key]
    },

    changeValue(value,key){
      const stateArray = [
        'ACCEPT_ASK_END',
        'CHECK_STATE',
        'COLLECTOR_REPORTED',
        'IN_PROGRESS',
      ]

      if (String(value)[4] === '-' && String(value)[7] === '-'){
        return this.getTime(value)
      }
      else if (stateArray.indexOf(key) > -1) {
        return this.switchValue({key,value})
      }
      else if (key === 'ORDER_INFO'){
        const orderInfo = value[0]
        return orderInfo.ORDER_CODE
      }
      else if (key === 'WSTE_INFO'){
        const wsteInfo = value[0]
        const price = wsteInfo.UNIT_PRICE.toLocaleString('ko-KR')
        return `${wsteInfo.WSTE_NM}(${wsteInfo.TRMT_METHOD_NM}) ${wsteInfo.VOLUME}${wsteInfo.UNIT}당 ${price}원`
      }
      else if (key === 'PRICE_UNIT'){
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
    goToSomeWhere(value,key){
      if (key === 'ORDER_INFO'){
        this.$router.push(`/admin/main/emissions/${value[0].ID}`)
      } else if (key === 'COLLECTOR_ID') {
        this.$router.push(`/admin/main/emitter-collector/${value}`)
      } else if (key === 'COLLECTOR_BIDDING_ID') {
        this.$router.push(`/admin/main/biddings/${value}`)
      } else if (key === 'COLLECTOR_SITE_ID'){
        this.$router.push(`/admin/main/emitter-collector/${value}`)
      }
    },

    switchValue({key,value}){

      if (key === 'ACCEPT_ASK_END'){
        let changedValue
        switch (value) {
          case null:
            changedValue = ''
            break;
          case 0:
            changedValue = '거절'
            break;
          case 1:
            changedValue = '수락'
        }
        return changedValue
      }
      else if (key === 'CHECK_STATE'){
        let changedValue
        switch (value) {
          case 0:
            changedValue = '미확인'
            break;
          case 1:
            changedValue = '확인'
        }
        return changedValue
      }
      else if (key === 'COLLECTOR_REPORTED'){
        let changedValue
        switch (value) {
          case 1:
            changedValue = '작성'
            break;
          default:
            changedValue = '미작성'
        }
        return changedValue
      }
      else if (key === 'IN_PROGRESS'){
        let changedValue
        switch (value) {
           case 0:
            changedValue = '진행 완료'
            break;
          case 1:
            changedValue = '진행중'
        }
        return changedValue
      }
    }
  }
}
</script>
<style lang="">

</style>
