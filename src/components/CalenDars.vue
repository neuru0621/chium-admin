
<template>
  <div>
    <v-date-picker
      v-model="calInfo.selectedDay"
      no-title
      :events="calInfo.notExistDays"
      :weekday-format="getDay"
      :month-format="getMonth"
      :header-date-format="getHeaderTitleMonth"
      class="custom-picker"
      color="#ff7451"
      event-color="#ff7451"
      @change="getSubTable($event)"
      @click:month="selectMonth"
    />
  </div>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
    data () {
      return {

      }
    },
    computed : {
      ...mapState('main',['calInfo'])
    },

    methods : {
      ...mapActions('main',['getSubTable','checkIfExistLicense']),
      ...mapMutations('main',['setClickedNum']),
      // al(e){
      //   const first = e[0].replaceAll('-','')
      //   const second = e[1].replaceAll('-','')
      //   if(first > second){
      //     alert('이 후의 날을 선택해주세요')
      //     this.picker = null
      //   }
      // },
      getDay(date) {
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        let i = new Date(date).getDay(date);
        return daysOfWeek[i];
      },
      getHeaderTitleMonth(date){
        const year = date.slice(0,4)
        const month = date.slice(6,8)
        if (month == ''){
          return `${year}년`
        }
        return `${year}년 ${month}월🚀`
      },
      getMonth(date) {
        const monthName = [
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '11월',
          '12월',
        ];

        let i = new Date(date).getMonth(date);
        return monthName[i];
      },
      selectMonth(e){
        this.setClickedNum(e+'-01')
        this.checkIfExistLicense()
      }
    },

}
</script>
<style lang="scss">

.custom-picker .v-date-picker-table thead tr th {
  color: #1c1c1c !important;
  font-weight: 400 !important;

  &:nth-child(1):not(.v-date-picker-table__current) {
    color: #ff7451 !important;
  }

  &:nth-child(7):not(.v-date-picker-table__current) {
    color: #ff7451 !important;
  }
}
.custom-picker .v-btn--active {
  color : #ff7451;

}
.custom-picker .v-date-picker-table__events div{
  margin: 0;
  padding: 0;
  width: 4px;
  height: 4px;
}
.custom-picker button[aria-label]{
  display: none;
}


</style>
