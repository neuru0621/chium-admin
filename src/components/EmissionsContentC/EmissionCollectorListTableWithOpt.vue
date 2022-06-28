<template>
  <v-simple-table
    fixed-header
    height="350"
  >
    <template #default>
      <thead>
        <tr v-if="getNowSelectedOpt === '회원사 거리'">
          <th
            v-for="th in memberTh"
            :key="th"
            class="text-left"
          >
            {{ th }}
          </th>
        </tr>
        <tr v-else-if="getNowSelectedOpt === '비회원사 거리'">
          <th
            v-for="th in notMemberTh"
            :key="th"
            class="text-left"
          >
            {{ th }}
          </th>
        </tr>
      </thead>
      <tbody v-if="getNowSelectedOpt === '회원사 거리'">
        <tr
          v-for="site,idx in getCollectorListWithin"
          :key="idx"
          style="cursor : pointer"

          @click="goToContent(site.ID)"
        >
          <td>{{ site.SITE_NAME }}</td>
          <td>{{ site.PHONE }}</td>
          <td>{{ changeToString(site.DIST) }}</td>
        </tr>
      </tbody>
      <tbody v-else-if="getNowSelectedOpt === '비회원사 거리'">
        <tr
          v-for="site,idx in getCollectorListWithin"
          :key="idx"
          style="cursor : pointer"
        >
          <td>{{ site.SITE_NAME }}</td>
          <td>{{ site.PHONE }}</td>
          <td>{{ changeToString(site.DIST) }}</td>
          <td>{{ changeToIsTransit(site.IS_TRANSIT) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return{
      memberTh : [
        '사업자명',
        '연락처',
        '거리',
      ],
      notMemberTh : [
        '사업자명',
        '연락처',
        '거리',
        '수집운반'
      ],
    }
  },
  computed : {
    ...mapGetters('emissions',['getCollectorListWithin','getNowSelectedOpt'])
  },
  methods : {
    changeToString(value){
      if(value){
        return String(value).slice(0,4) + 'KM'
      }
      return value
    },
    changeToIsTransit(value){
      if(value == 1){
        return '가능'
      }
      return '불가능'
    },
     goToContent(siteId){
       this.$router.push({ path: `/admin/main/emitter-collector/${siteId}`})
    },
  }
}
</script>
<style lang="">

</style>
