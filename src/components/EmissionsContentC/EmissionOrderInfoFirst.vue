<template>
  <v-card>
    <v-card-title>배출 오더 정보</v-card-title>
    <v-row>
      <v-col cols="auto">
        <v-card-subtitle> {{ getOrderInfo.COLLECTOR_ID === null ? '입찰 거래' : '기존거래' }}</v-card-subtitle>
      </v-col>
      <v-col cols="auto">
        <v-card-subtitle> 최종 수정 시각 ⏲ {{ getTime(getOrderInfo.UPDATED_AT) }}</v-card-subtitle>
      </v-col>
      <v-col
        cols="auto"
        align-self="center"
      >
        <v-btn @click="modify">
          수정하기
        </v-btn>
      </v-col>
    </v-row>
    <HeaderAndText :infos="[{header : 'ORDER ID', text : getOrderInfo.ORDER_ID},{header : 'ORDER CODE', text : getOrderInfo.ORDER_CODE},{header : 'ORDER 삭제 여부', text : getOrderInfo.IS_DELETED, checkType : true, key:'IS_DELETED'},{header : 'ORDER 삭제 시각', text : getOrderInfo.DELETED_AT, isTime : true}]" />
    <HeaderAndText :infos="[{header : '개인 / 사업자', text : getOrderInfo.DISPOSER_TYPE},{header : '업체명', text : getOrderInfo.DISPOSER_NAME, ruPersonOrNot : getOrderInfo.DISPOSER_TYPE, key : 'DISPOSER_NAME' }]" />
    <HeaderAndText :infos="[{header : '배출지', text : getOrderInfo.ADDR},{header : '배출 등록 시각', text : getOrderInfo.CREATED_AT, isTime : true}]" />
    <HeaderAndText :infos="[{header : '요청사항', text : getOrderInfo.NOTE},{header : '상태 체크 유무', text : getOrderInfo.CHECK_STATE, checkType : true},{header : 'CS 확인여부', text : getOrderInfo.CS_CONFIRMED, checkType : true, key : 'CS_CONFIRMED'}]" />
    <HeaderAndText :infos="[{header : '방문 시작 시각', text : getOrderInfo.VISIT_START_AT, isTime : true},{header : '방문 조기마감 여부', text : getOrderInfo.VISIT_EARLY_CLOSEING, checkType : true},{header : '방문 조기마감 요청 시각', text : getOrderInfo.VISIT_EARLY_CLOSED_AT, isTime : true}]" />
    <HeaderAndText :infos="[{header : '입찰 마감 시각', text : getOrderInfo.BIDDING_END_AT, isTime : true},{header : '배출 시작 시각', text : getOrderInfo.OPEN_AT, isTime : true},{header : '배출 종료 시각', text : getOrderInfo.CLOSE_AT, isTime : true}]" />
    <HeaderAndText :infos="[{header : '방문 예정자 수', text : getOrderInfo.PROSPECTIVE_VISITORS},{header : '입찰자 수', text : getOrderInfo.BIDDERS },{header : '잠재 입찰자 수', text : getOrderInfo.PROSPECTIVE_BIDDERS }]" />
    <HeaderAndText :infos="[{header : '낙찰자 입찰 정보', text : getOrderInfo.SELECTED, key : 'SELECTED'},{header : '낙찰자 선정 시각', text : getOrderInfo.SELECTED_AT, isTime : true },{header : '낙찰자 선정 기한', text : getOrderInfo.MAX_SELECT_AT , isTime : true}]" />
    <HeaderAndText :infos="[{header : '1순위 수거자 선택 여부', text : getOrderInfo.COLLECTOR_SELECTION_CONFIRMED, checkType : true},{header : '1순위 수거자 선택 시각', text : getOrderInfo.COLLECTOR_SELECTION_CONFIRMED_AT, isTime : true },{header : '1순위 수거자 응답 기한', text : getOrderInfo.COLLECTOR_MAX_DECISION_AT , isTime : true}]" />
    <HeaderAndText :infos="[{header : '2순위 수거자 선택 여부', text : getOrderInfo.COLLECTOR_SELECTION_CONFIRMED2, checkType : true},{header : '2순위 수거자 선택 시각', text : getOrderInfo.COLLECTOR_SELECTION_CONFIRMED2_AT, isTime : true },{header : '2순위 수거자 응답 기한', text : getOrderInfo.COLLECTOR_MAX_DECISION2_AT , isTime : true}]" />
    <EmissionMap style="margin-top : 15px; margin-bottom : 15px" />
    <EmissionImageList style="margin-top : 15px; margin-bottom : 15px" />
  </v-card>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import HeaderAndText from "./EmissionHeaderAndText.vue"
import EmissionMap from "./EmissionMap.vue"
import EmissionImageList from "./EmissionImageList.vue"
export default {
  components : {
    HeaderAndText,EmissionMap,EmissionImageList
  },
  computed : {
    ...mapGetters('emissions',['getOrderInfo']),

  },

  methods : {
    ...mapActions('emissions',['emissionModify']),
    getTime(time){
      if (time != null) {
      return time.slice(0,19)}

    },
    modify(){
      this.emissionModify();

    }
  }
}
</script>
<style lang="">

</style>
