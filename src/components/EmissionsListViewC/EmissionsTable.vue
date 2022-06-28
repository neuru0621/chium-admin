<template>
  <v-simple-table

    fixed-header
    height="700px"
  >
    <template #default>
      <thead>
        <tr>
          <th class="text-left">
            ORDER ID
          </th>
          <th class="text-left">
            ORDER CODE
          </th>
          <th class="text-left">
            구분
          </th>
          <th class="text-left">
            배출자 이름
          </th>
          <th class="text-left">
            주소
          </th>
          <th class="text-left">
            등록일자
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item,idx in getEmissionsList"
          :key="idx"
          style="cursor : pointer"
          @click="goToContent(item.ORDER_ID)"
        >
          <td>{{ item.ORDER_ID }}</td>
          <td>{{ item.ORDER_CODE }}</td>
          <td>{{ item.DISPOSER_TYPE }}</td>
          <td>{{ item.DISPOSER_NAME }}</td>
          <td>{{ item.ADDR }}</td>
          <td>{{ getTime(item.CREATED_AT) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  computed : {
    ...mapGetters('emissions',['getEmissionsList'])
  },
  methods : {
    getTime(time){
      return time.slice(0,19)
    },
    goToContent(siteId){
       this.$router.push({ path: `./${siteId}`})
    },

  }



}
</script>
<style lang="">

</style>
