<template>
  <div style="margin-bottom : 15px">
    <v-row>
      <v-col cols="auto">
        <v-select
          id="opt-select"
          style="width : 180px"
          :items="getOptList"
          label="종류"
          :value="selectedOpt"
          hide-details=""
          solo
          @change="changeOpt"
        />
      </v-col>
      <v-col>
        <div
          id="search-input"
        >
          <v-text-field
            v-model="keyword"
            hide-details=""
            placeholder="검색어 🚀"
            solo
          />
        </div>
      </v-col>
      <v-col v-if="selectedOpt === '비회원사 거리'">
        <v-autocomplete
          dense
          rounded
          solo
          :items="isTransitOpt"
          hide-details=""
          :value="isTransitOpt[0]"
          @change="changeIsTransitOpt"
        />
      </v-col>
      <v-col v-if="selectedOpt === '비회원사 거리'">
        <v-autocomplete
          dense
          rounded
          solo
          :items="bCodeWithinOpt"
          hide-details=""
          :value="bCodeWithinOpt[0]"
          @change="changeBCodeWithinOpt"
        />
      </v-col>


      <v-col
        align-self="center"
        cols="auto"
      >
        <v-btn @click="searchBtn">
          검색하기
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations} from "vuex"
export default {
  data(){
    return {
      keyword : '',
      selectedOpt : '회원사 거리',
      selectedIsTransitOpt : null,
      selectedBCodeWithinOpt : null,
      isTransitOpt : ['모두','수집운반 가능'],
      bCodeWithinOpt : ['해당 시군구','전국'],
    }


  },
  computed : {
    ...mapGetters('emissions',['getOptList','getNowSelectedOpt'])
  },
  methods : {
    ...mapActions('emissions',['collectorListWithin','collectorListWithinNotMember']),
    ...mapMutations('emissions',['setCircleRange','setNowSelectedOpt','setNowSelectedIsTransitOpt','setNowSelectedBCodeWithinOpt']),
    changeOpt(v){
      this.selectedOpt = v
    },
    changeIsTransitOpt(v){
      console.log(v)
      this.setNowSelectedIsTransitOpt(v)
    },
    changeBCodeWithinOpt(v){
      this.setNowSelectedBCodeWithinOpt(v)
    },
    searchBtn(){

      if(this.selectedOpt == '회원사 거리'){
        this.setNowSelectedOpt(this.selectedOpt)
        if (this.keyword == ''){
          alert('거리를 입력해주세요. ex) 50km >>> 50 ')
        } else {
          this.setCircleRange(this.keyword)
          this.collectorListWithin()
        }
      } else if(this.selectedOpt == '비회원사 거리'){
        this.setNowSelectedOpt(this.selectedOpt)
        if (this.keyword == ''){
          alert('거리를 입력해주세요. ex) 50km >>> 50 ')
        } else {
          this.setCircleRange(this.keyword)
          this.collectorListWithinNotMember()
        }
      }

    }
  }
}
</script>
<style lang="">

</style>
