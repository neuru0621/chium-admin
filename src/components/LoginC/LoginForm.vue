<template>
  <v-card style="overflow : hidden; display : flex">
    <div style="width : 50%; background-color : #01b286">
      <v-img
        height="100%"
        lazy-src="https://chium.s3.ap-northeast-2.amazonaws.com/temp/admin-1651803316.png"
        src="https://chium.s3.ap-northeast-2.amazonaws.com/temp/admin-1651803316.png"
      />
    </div>
    <div
      class="right-login-box"
    >
      <div>
        <v-row>
          <v-col
            class="input-label"
            cols="4"
          >
            <v-subheader style="font-size : 16px; font-weight : bold">
              아이디
            </v-subheader>
          </v-col>
          <v-col>
            <v-text-field v-model="adminId" />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="input-label"
            cols="4"
          >
            <v-subheader style="font-size : 16px; font-weight : bold">
              비밀번호
            </v-subheader>
          </v-col>
          <v-col>
            <v-text-field
              v-model="adminPw"
              type="password"
            />
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn @click="loginBtn">
              로그인
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-card>
</template>
<script>
import {mapActions} from "vuex"
export default {
  data(){
    return {
      adminId : '',
      adminPw : ''
    }
  },
  methods : {
    ...mapActions('auth', ['login']),
    loginBtn(){
      this.login({adminId : this.adminId, adminPw : this.adminPw})
    }
  }
}
</script>
<style lang="scss">
.right-login-box {
  width : 50%;
  padding : 20px;
  display : flex;
  justify-content: center;
  align-items: center;
  .input-label {
    padding-left : 0;
    padding-right : 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.cols-padding-x-zero {
      padding-left : 0;
    padding-right : 0;
}

</style>
