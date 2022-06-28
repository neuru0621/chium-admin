<template lang="">
  <v-subheader v-if="title == 'addr'">
    주소(사무소)
  </v-subheader>
  <v-subheader v-else-if="title == 'siteName'">
    사이트 이름
  </v-subheader>
  <v-subheader v-else-if="title == 'permitRegImgPath'">
    허가증 사진
  </v-subheader>
  <v-subheader v-else-if="title == 'bizRegImgPath'">
    사업자 등록증 사진
  </v-subheader>
  <v-subheader v-else-if="title == 'permitRegCode'">
    허가증 번호
  </v-subheader>
  <v-subheader v-else-if="title == 'bizRegCode'">
    사업자 등록번호
  </v-subheader>
  <v-subheader v-else-if="title == 'repName'">
    성명(대표자)
  </v-subheader>
  <v-subheader v-else-if="title == 'compName'">
    컴퍼니 이름
  </v-subheader>
  <v-subheader v-else-if="title == 'active'">
    활성화
  </v-subheader>
  <v-subheader v-else-if="title == 'phone'">
    핸드폰 번호
  </v-subheader>
  <v-subheader v-else-if="title == 'trmtBizNm'">
    업체 종류
  </v-subheader>
  <v-subheader v-else-if="title == 'headOffice'">
    헤드 오피스
  </v-subheader>
  <v-subheader v-else-if="title == 'confirmedAt'">
    확인 날짜
  </v-subheader>
  <v-subheader v-else-if="title == 'confirmed'">
    확인 상태
  </v-subheader>
  <v-subheader v-else-if="title == 'managerList'">
    담당자
  </v-subheader>
</template>
<script>
export default {
  props : {
    title : {
      type : String,
      default : ''
    }
  }
}
</script>
<style >
.v-subheader.theme--light {
  padding : 0 !important;
}
</style>
