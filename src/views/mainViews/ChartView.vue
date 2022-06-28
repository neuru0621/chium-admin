<template>
  <v-container>
    <v-card style="padding : 40px ; margin-bottom : 50px">
      <BarChart :title="getTitle" />
    </v-card>
    <v-card style="padding : 40px ; margin-bottom : 50px">
      <SidoBarChart :title="getSidoTitle" />
    </v-card>
  </v-container>
</template>
<script>
import BarChart from "@/components/ChartC/BarChart.vue"
import SidoBarChart from "@/components/ChartC/SidoBarChart.vue"
import {mapActions,mapGetters} from "vuex"
export default {
  components : {
    BarChart,SidoBarChart
  },

  computed : {
    ...mapGetters('chart',['getTitle','getSidoTitle'])
  },
  created(){
    this.getBarChartInfo()

  },
  methods : {
    ...mapActions('chart',['getBarChartInfo'])
  }

}
</script>
<style lang="">

</style>
