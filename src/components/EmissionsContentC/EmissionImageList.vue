<template>
  <div>
    <v-carousel>
      <v-carousel-item
        v-for="(img,i) in getOrderInfo.IMG_INFO"
        :key="i"
        :src="img.IMG_PATH"
        reverse-transition="fade-transition"
        transition="fade-transition"
        @click="openImg(img.IMG_PATH)"
      />
    </v-carousel>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
 export default {

    computed : {
      ...mapGetters('emissions',['getOrderInfo'])
    },
    methods : {
      openImg(url){
        window.open(url, '_blank');
      }
    }
  }
</script>
<style lang="">

</style>
