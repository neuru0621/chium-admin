<template>
  <div
    class="container-box"
    fluid
  >
    <v-sheet style="width:50%">
      <LoginForm />
    </v-sheet>
  </div>
</template>
<script>
import LoginForm from "@/components/LoginC/LoginForm.vue"
export default {
  components : {
    LoginForm
  },
  mounted(){
    document.querySelector('.container-box').style.heigth = window.innerHeight / 2
  },
}
</script>
<style >
.container-box {
  height: 700px !important;
  justify-content: center;
  align-items: center;
  display: flex;

}
</style>
