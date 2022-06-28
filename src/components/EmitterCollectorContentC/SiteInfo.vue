<template>
  <div>
    <v-row
      justify="end"
      style="margin-bottom : 30px"
    >
      <v-col
        cols="auto"
      >
        <v-btn @click="modifyBtn">
          수정하기
        </v-btn>
      </v-col>
    </v-row>

    <v-expansion-panels
      multiple
      :value="[0,1]"
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          <v-card-title>
            사이트 정보 변경
          </v-card-title>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row dense>
            <v-col
              v-for="value, key in getLine1"
              :key="key"
              cols="12"
              lg="6"
              xl="6"
            >
              <v-row
                dense
              >
                <v-col
                  cols="3"
                >
                  <SubHeader :title="key" />
                </v-col>
                <v-col
                  cols="9"
                >
                  <div
                    v-if="key in {'active':'','headOffice':'', 'confirmed':''}"
                    style="height : 100%; display: flex; align-items: center;"
                  >
                    <input
                      :id="key"
                      class="checked-box"
                      disabled
                      type="checkbox"
                      :checked="value ? true : false"
                    >

                    <v-icon
                      v-if="!(key in {'active':'', 'headOffice':''})"
                      @click="changeActive(key,value)"
                    >
                      mdi-pencil
                    </v-icon>
                  </div>

                  <!-- ######################### 담당자 ####################### -->
                  <div v-else-if="key in {'managerList': ''}">
                    <!-- value에는 배열이 담긴다. manager에는 오브젝트가 담긴다. PHONE, USER_NAME -->
                    <div
                      v-for="manager, idx in value"
                      :key="idx"
                    >
                      <v-row>
                        <!-- 3가지 필드를 적용한다. 아이디를 다르게 하기위함 input에는 보통 key를 넣었지만 여기에는 idx를 넣어 판별-->
                        <v-col
                          cols="12"
                          :sm="4"
                          style="padding-bottom : 0px;"
                        >
                          <v-text-field
                            :id="manager.USER_ID"
                            dense
                            :value="manager.USER_ID"
                            hide-details=""
                            solo
                            readonly
                            append-icon="mdi-pencil"
                            @click:append="changeContent(manager.USER_ID)"
                            @input="MyVmodel('id'+idx,$event)"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          :sm="4"
                          style="padding-bottom : 0px;"
                        >
                          <v-text-field
                            :id="manager.USER_NAME"
                            dense
                            :value="manager.USER_NAME"
                            hide-details=""
                            solo
                            readonly
                            append-icon="mdi-pencil"
                            @click:append="changeContent(manager.USER_NAME)"
                            @input="MyVmodel('ma'+idx,$event)"
                          />
                        </v-col>

                        <v-col
                          cols="12"
                          :sm="4"
                        >
                          <v-text-field
                            :id="manager.PHONE"
                            dense
                            :value="manager.PHONE"
                            hide-details=""
                            solo
                            readonly
                            append-icon="mdi-pencil"
                            @click:append="changeContent(manager.PHONE)"
                            @input="MyVmodel('ph'+idx,$event)"
                          />
                        </v-col>
                      </v-row>
                      <v-divider style="margin-top : 10px" />
                    </div>
                  </div>
                  <v-text-field
                    v-else-if="key == 'confirmedAt'"
                    :id="key"
                    placeholder="확인 되지 않았습니다."
                    dense
                    readonly
                    :value="value"
                    hide-details=""
                    solo
                  />
                  <v-text-field
                    v-else
                    :id="key"
                    append-icon="mdi-pencil"
                    dense
                    readonly
                    :value="value"
                    hide-details=""
                    solo

                    @click:append="changeContent(key)"
                    @input="MyVmodel(key,$event)"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-divider style="margin-top : 20px; margin-bottom : 20px" />
          <v-row v-if="checkEmiOrCol(getSeletedUser.trmtBizCode)">
            <v-col>
              <v-card-title style="display : inline">
                사업장 폐기물 종류
              </v-card-title>
              <span
                style="font-size: 12px; cursor : pointer; "
                @click="dialog=true"
              >
                종류 추가하기
                <v-icon style="font-size: 13px">
                  mdi-plus
                </v-icon>
              </span>
            </v-col>
          </v-row>
          <v-row
            v-for="wste,idx in getSeletedUser['wsteList']"
            :key="idx"
          >
            <v-col>
              <v-subheader>
                사업자 폐기물 종류
              </v-subheader>
            </v-col>
            <v-col>
              <v-card>
                <v-card-text
                  hide-details=""
                  readonly
                >
                  {{ wste.WSTE_NM }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card>
                <v-card-text
                  hide-details=""
                  readonly
                >
                  {{ wste.APPR_NM }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="auto"
              style="cursor : pointer"
              @click="removeWste(wste)"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <v-card-title>
            허가증 정보 변경
          </v-card-title>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row dense>
            <v-col
              v-for="value, key in getLine2"
              :key="key"
              cols="12"
              lg="6"
              xl="6"
            >
              <v-row
                dense
              >
                <v-col
                  cols="3"
                >
                  <SubHeader :title="key" />
                </v-col>
                <v-col
                  cols="9"
                >
                  <div v-if="key in {'bizRegImgPath':'','permitRegImgPath':'' } ">
                    <span
                      v-if="key in {'bizRegImgPath':''}"
                      class="span-class"
                      @click="imgDialog1 = true"
                    >{{ value }}

                    </span>
                    <span
                      v-else
                      class="span-class"
                      @click="imgDialog2 = true"
                    >{{ value }}

                    </span>

                    <v-icon @click="changeImgae(key)">
                      mdi-pencil
                    </v-icon>
                    <ImagePopup
                      v-if="key in {'bizRegImgPath':''}"

                      :dialog="imgDialog1"
                      :img-url="value"
                      @close="close"
                    />
                    <ImagePopup
                      v-else

                      :dialog="imgDialog2"
                      :img-url="value"
                      @close="close"
                    />
                  </div>

                  <v-text-field
                    v-else
                    :id="key"
                    append-icon="mdi-pencil"
                    dense
                    readonly
                    solo
                    :value="value"
                    hide-details=""
                    @click:append="changeContent(key)"
                    @input="MyVmodel(key,$event)"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <WsteKind
      :dialog="dialog"
      @close-dialog="closeDialog"
    />

    <v-file-input
      id="permit-img"
      accept="image/jpeg,image/jpg,image/png"
      style="display : none"
      @change="uploadPermitImg"
    />
    <v-file-input
      id="biz-img"
      accept="image/jpeg,image/jpg,image/png"
      style="display : none"
      @change="uploadBizImg"
    />
  </div>
</template>
<script>
import {mapGetters,mapMutations,mapActions} from "vuex"
import SubHeader from "@/components/EmitterCollectorContentC/SubHeader.vue"

import ImagePopup from "@/components/EmitterCollectorContentC/ImagePopup.vue"
import WsteKind from "@/components/EmitterCollectorContentC/WsteKind"


export default {
  components : {
    SubHeader,WsteKind,ImagePopup
  },
  data(){
    return  {
      dialog : false,
      imgDialog1 : false,
      imgDialog2 : false,
    }
  },
  computed : {
    ...mapGetters('selectedUser',['getLine1','getLine2','getSeletedUser','getShowIf'])
  },
  methods : {
    ...mapMutations('selectedUser',['changeSelectedUserInfo','setAddr','removeWsteList']),
    ...mapActions('selectedUser',['uploadPermitImgToS3','uploadBizImgToS3','sendModifiedPermit']),
    removeWste(value){
      this.removeWsteList(value)
    },
    closeDialog(){
      this.dialog = false
    },
    changeContent(e){
      if (e == 'addr'){
        this.addrChange()
      }
      const el = document.getElementById(e)
      if (el.readOnly){
        el.readOnly = false
      } else {
        el.readOnly = true
      }
       el.focus()

    },
    changeActive(key){
      let value
      const el = document.getElementById(key)
      if (el.checked){
        el.checked = false
        value = 0
      } else {
        el.checked = true
        value = 1

      }
      this.changeSelectedUserInfo({key,value})

    },

    MyVmodel(key,value){
      this.changeSelectedUserInfo({key,value})
    },
    changeImgae(key){
      if (key == 'bizRegImgPath') {
        document.getElementById('biz-img').click()
      } else if (key == 'permitRegImgPath') {
        document.getElementById('permit-img').click()
      }
    },
    uploadPermitImg(e){
      if (e == undefined){
        alert('파일을 제대로 입력해주세요')
        return
      }
      const formData = new FormData();
      formData.append('file', e)
      this.uploadPermitImgToS3(formData)
    },
    uploadBizImg(e){
      console.log(e,'bizimg 1')
      if (e == undefined){
        alert('파일을 제대로 입력해주세요')
        return
      }
      const formData = new FormData();
      formData.append('file', e)
      this.uploadBizImgToS3(formData)

    },
    modifyBtn(){
      this.sendModifiedPermit()
    },
    addrChange(){
      // eslint-disable-next-line no-undef
        new daum.Postcode({
            oncomplete: (data) => {
                let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
                let extraRoadAddr = ''; // 도로명 조합형 주소 변수
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                } // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                } // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                } // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
                if(fullRoadAddr !== ''){ fullRoadAddr += extraRoadAddr;
                } // 우편번호와 주소 정보를 해당 필드에 넣는다.



                Promise.resolve(data).then(()=>{
                  return new Promise((resolve,reject)=>{
                    const geocoder = new window.kakao.maps.services.Geocoder();
                    geocoder.addressSearch(fullRoadAddr,(result,status)=>{
                      if(status === window.kakao.maps.services.Status.OK){
                          const { x, y } = result[0];
                          resolve({ lat: y, log: x })
                      }else{
                          reject();
                      }
                    })
                  })
                }).then(result => {
                  let lat = parseFloat(result.lat)
                  let lng = parseFloat(result.log)
                  this.setAddr({ addr : data.address+', ', bCode : data.bcode, lat, lng } )
                })

            },
            animation : true,
            onclose: (state) => {
                if(state === 'COMPLETE_CLOSE') alert('상세 주소를 뒤에 이어서 적어주세요!')
                const el = document.getElementById('addr')
                el.readOnly = false
                el.focus()
            },

        }).open();
    },
    close(){
      this.imgDialog1 = false
      this.imgDialog2 = false
    },
    checkEmiOrCol(code){
      if (Number(code) == 9){
        return false
      }
      return true
    }
  }


}
</script>
<style lang="scss" >

.checked-box {
  width : 20px;
  height : 20px;
  line-height : 100%;
  margin-right:10px;

}
.span-class {
  font-size : 11px; margin-right : 10px;text-decoration : underline; cursor : pointer; color : #0c0a30
}
#addr {

    margin-right : 5px;

}
@media (max-width: 600px) {
  .v-expansion-panel-content__wrap {
      padding-left : 5px !important;
      padding-right : 5px !important;

  }
}

</style>
