<template>
  <v-simple-table
    v-if="getSeletedUser.userType === 2"
    fixed-header
    height="300"
  >
    <template #default>
      <thead>
        <tr>
          <th
            v-for="th,idx in emitterTh"
            :key="th+idx"
            class="text-left"
          >
            {{ th }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item,idx in getShowListIfIEmitter"
          :key="idx"
          style="cursor : pointer"
          @click="goToOrder(item.orderId)"
        >
          <td>{{ item.orderCode }}</td>
          <td>{{ item.siteName }}</td>
          <td>{{ checkPerOrCol(item.siteId) }}</td>
          <td>{{ checkReadOrNot(item.checkState) }}</td>
          <td>{{ item.addr }}</td>
          <td>{{ getTime(item.visitEndAt) }}</td>
          <td>{{ getTime(item.biddingEndAt) }}</td>
          <td>{{ getTime(item.createdAt) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <v-simple-table
    v-else-if="getSeletedUser.userType === 3"
    fixed-header
    height="300"
  >
    <template #default>
      <thead>
        <tr>
          <th
            v-for="th,idx in collectorTh"
            :key="idx+th"
            class="text-left"
          >
            {{ th }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item,idx in getShowListIfIEmitter"
          :key="idx"
        >
          <td>{{ item.orderCode }}</td>
          <td @click="goToOrder(item.orderId)">
            <a> {{ item.orderId }}</a>
          </td>
          <td @click="goToBidding(item.biddingId)">
            <a> {{ item.biddingId }}</a>
          </td>
          <td>{{ getTime(item.createdAt) }}</td>
          <td>{{ getTime(item.dateOfBidding) }}</td>
          <td>{{ getTime(item.dateOfVisit) }}</td>
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
      emitterTh : [
        '오더 코드',
        '사이트 이름',
        '개인 / 사업자',
        '확인 유무',
        '주소',
        '방문 마감일',
        '입찰 마감일',
        '생성 일자'
      ],
      collectorTh : [
        '오더 코드',
        '오더 번호',
        '입찰 번호',
        'CREATED_AT',
        'DATE_OF_BIDDING',
        'DATE_OF_VISIT',
      ],
    }
  },
  computed : {
    ...mapGetters('selectedUser',['getShowListIfIEmitter','getSeletedUser'])
  },
  methods : {
    getTime(time){
      if (time != null) {
          return time.slice(0,19)
      }

    },
    goToOrder(orderId){
      this.$router.push(`/admin/main/emissions/${orderId}`)
    },
    goToBidding(biddingId){
      this.$router.push(`/admin/main/biddings/${biddingId}`)
    },
    checkReadOrNot(state){
      if ( state == 0){
        return '확인'
      }
      return '미확인'
    },
    checkPerOrCol(code){
      if (Number(code) == 0){
        return '개인 배출자'
      }
      return '사업자 배출자'
    },

  }



}
</script>
<style lang="">

</style>
