<template>
  <div>
    성공적으로 로그아웃 되셨습니다.
  </div>
</template>
<script>
import {mapMutations} from "vuex"
export default {
  created(){
    this.logout()
  },
  methods : {
    ...mapMutations('auth',['logout']),
  },

}
</script>
<style lang="">

</style>
