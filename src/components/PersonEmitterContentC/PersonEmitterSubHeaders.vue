<template>
  <div>
    <v-row>
      <v-col>
        <v-subheader
          v-for="header, idx in subHeader"
          :key="header+idx"
        >
          {{ subHeaders[header] }}
        </v-subheader>
      </v-col>
      <v-col />
    </v-row>
  </div>
</template>
<script>
export default {
  props : ['subHeader'],
  data(){
    return {
      subHeaders : {
        ACTIVE: '활성화',
        AVATAR_PATH: '사진',
        CONFIRMED: '확인 상태',
        CS_MANAGER_ID: '담당 CS 매니저',
        NOTICE_ENABLED: 'NOTICE_ENABLED',
        PHONE: '연락처',
        PUSH_ENABLED: 'PUSH_ENABLED',
        USER_ID: '아이디',
        USER_NAME: '이름'
      }
    }
  }
}
</script>
<style lang="">

</style>
