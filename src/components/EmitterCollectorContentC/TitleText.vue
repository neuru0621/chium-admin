<template>
  <div class="title-site-name">
    <span
      class="text-h5"
    >{{ getSeletedUser.siteName }} {{ getSeletedUser.userType == 3 ? '( 수거자 )' : '( 배출자 )' }}</span>

    <span style="font-size : 10px; text-align : center;"> 수정 시각 : {{ getSeletedUser.updatedAt }} 🕐</span>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  computed : {
    ...mapGetters('selectedUser',['getSeletedUser'])
  },
}
</script>
<style  >
.title-site-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom : 15px;
}
</style>
