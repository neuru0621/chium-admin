<template>
  <v-dialog
    :value="dialog"
    width="900"

    @click:outside="closeImgDialog"
  >
    <v-card>
      <v-img
        :src="imgUrl"
        :style="`transform: rotate(${rotation}deg);`"
        @click="rotateRight"
      />
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props : {
    dialog : {
      type : Boolean,
      default : false
    },
    imgUrl : {
      type : String,
      default : ''
    }
  },
  data(){
    return {
      rotation : 0
    }
  },
  methods : {
    closeImgDialog(){
      this.$emit('close')
    },
    rotateRight(){
     this.rotation -= 90
    }
  }
}
</script>
<style>
.gg {
  transform: rotate(90deg);
}
</style>
