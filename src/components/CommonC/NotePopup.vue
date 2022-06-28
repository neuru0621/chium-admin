<template>
  <v-dialog
    :value="dialog"
    width="900"

    @click:outside="closeDialog"
  >
    <v-card>
      <v-card-title>
        노트 내용
      </v-card-title>
      <v-card-text>
        <p
          v-for="p, idx in content"
          :key="idx"
          style="margin-bottom : 0px"
        >
          {{ p }}
        </p>
      </v-card-text>
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
    content : {
      type : Array,
      default : ()=> []
    }
  },

  methods : {
    closeDialog(){
      this.$emit('closeDialog')
    },


  }
}
</script>
<style>
.gg {
  transform: rotate(90deg);
}
</style>
