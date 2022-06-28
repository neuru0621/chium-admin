<template>
  <div>
    <v-row>
      <v-col
        v-for="info,idx in infos"
        :key="idx"
      >
        <v-row>
          <v-col cols="auto">
            <v-subheader>
              {{ info.header }}
            </v-subheader>
          </v-col>
          <v-col
            cols="auto"
          >
            <div v-if="info.key == 'SELECTED'">
              <!-- 낙찰자가 default 값이 0이라서 0일때는 아무 것도 보여주지 않음-->
              <a
                @click="goToSelectedCollector(info.text)"
              >

                {{ info.text === 0 ? '' : info.text }}
              </a>
            </div>



            <!-- 삭제 여부만 수정이 가능하기에-->
            <div v-else-if="info.key == 'IS_DELETED' || info.key == 'CS_CONFIRMED'">
              <input
                :id="info.header"
                :checked="info.text ? true : false"
                disabled
                type="checkbox"
              >
              <v-icon
                @click="checkBoxModifyInOrderPlace(info)"
              >
                mdi-pencil
              </v-icon>
            </div>

            <input
              v-else-if="info.checkType == true"
              disabled
              type="checkbox"
              :checked="info.text ? true : false"
            >



            <span v-else-if="info.isTime == true ">
              {{ getTime(info.text) }}
            </span>



            <span v-else>
              {{ info.text }}
            </span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {mapMutations} from "vuex"
export default {
  props : ['infos'],
  methods : {
    ...mapMutations('emissions',['changeOrderInfo']),
    getTime(time){
      if (time != null) {
        return time.slice(0,19)
      }
    },
    checkBoxModifyInOrderPlace(info){
      let value
      const el = document.getElementById(info.header)
      if (el.checked){
        el.checked = false
        value = 0
      } else {
        el.checked = true
        value = 1
      }

      const modifyDataObj = {
        key : info.key,
        value : value
      }

      this.changeOrderInfo(modifyDataObj)
    },

     goToSelectedCollector(biddingId){
      this.$router.push(`/admin/main/biddings/${biddingId}`)
    },
    // goToPersonOrNot(siteid){
    //   if (siteid === 'person'){
    //     this.$router.push(`/admin/main/biddings/${siteid}`)
    //     return
    //   }
    //   this.$router.push(`/admin/main/biddings/${siteid}`)
    // }
  }
}
</script>
<style scoped>
* {

  align-items: center;
}
.row {
  padding-top : 0px;

}
.col {
  padding-top : 0px;
}
.v-input {
  margin-top : 0px;
}
</style>
