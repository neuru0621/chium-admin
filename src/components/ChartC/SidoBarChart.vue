<template>
  <div>
    <v-row
      justify="end"
      style="margin-bottom : 20px"
    >
      <v-col cols="auto">
        <v-autocomplete
          dense
          rounded
          solo
          :items="sidoList"
          hide-details=""
          :value="nowValue"
          style="width : 150px"
          @change="changeSido"
        />
      </v-col>
    </v-row>
    <h2 class="text-center mb-4">
      {{ title }}
    </h2>
    <Bar
      v-if="loaded"
      :chart-options="chartOptions"
      :chart-data="getSidoOrSigunguDataSet"
      :height="400"
    />
  </div>
</template>

<script>

import { Bar } from 'vue-chartjs/legacy'
import { mapGetters, mapActions, mapMutations} from "vuex"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {

  components: {
    Bar
  },
  props : {
    title : {
      type : String,
      default : ''
    }
  },
  data(){
    return{
      loaded: false,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              stepSize: 1,
              beginAtZero: true,
            },
          },
    },


      }
    }
  },


  computed : {
    ...mapGetters('chart',['getSidoOrSigunguDataSet','getSidoOrSigungu','getGeonKuk','getNowChecked']),
    sidoList(){
      let ret
      if (this.getGeonKuk != null){
        const raw = [...this.getGeonKuk]
        ret = raw.map(v=>{
          if (v==null) return '전국';
          else {
            return v.SI_DO
          }})

      }
      return ret
    },
    nowValue(){
      return this.getNowChecked
    }
  },
  created(){
    this.getCertenSidoOrSigungu()
    this.getSido()
    this.loaded = true
  },



  methods : {
    ...mapActions('chart',['getCertenSidoOrSigungu','getSido','getCertenSidoOrSigungu']),
    ...mapMutations('chart',['setNowChecked','setRegionCode']),
    changeSido(e){
      this.loaded = false
      this.setRegionCode(e)
      this.setNowChecked(e)
      this.getCertenSidoOrSigungu()
      this.loaded = true
    }

  },


}
</script>
