<template>
  <div>
    <v-expansion-panels
      multiple
      :value="[0,1]"
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          <v-card-title>
            개인 배출자 정보 변경
          </v-card-title>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- 수정하기 버튼 -->
          <v-row justify="end">
            <v-col

              cols="auto"
            >
              <v-btn @click="sendModifiedPersonEmitter">
                수정하기
              </v-btn>
            </v-col>
          </v-row>
          <!-- 수정하기 항목 -->
          <v-row>
            <v-col
              v-for="content, idx in headerArray"
              :key="idx"
              cols="12"
              lg="6"
              xl="6"
            >
              <v-row>
                <!-- 타이틀 -->
                <v-col>
                  <v-subheader>
                    {{ subHeaders[idx] }}
                  </v-subheader>
                </v-col>
                <!-- 항목 -->
                <v-col>
                  <!-- 체크박스 분기 -->
                  <div v-if="checkBoxType.indexOf(content) > -1">
                    <div>
                      <input
                        :id="content"

                        class="checked-box"
                        disabled
                        type="checkbox"
                        :checked="getSelectedPersonEmitter[content] ? true : false"
                      >
                      <v-icon
                        style="pointer:cursor"
                        @click="changeActive({key : content})"
                      >
                        mdi-pencil
                      </v-icon>
                    </div>
                  </div>
                  <!-- 사진 변경 분기 -->
                  <div v-else-if="content == 'AVATAR_PATH'">
                    <a
                      :href="getSelectedPersonEmitter[content]"
                      target="_blank"
                    >
                      {{ getSelectedPersonEmitter[content] }}
                    </a>
                    <v-icon
                      style="pointer:cursor"
                      @click="clickAvatarImg"
                    >
                      mdi-pencil
                    </v-icon>
                  </div>
                  <!-- 그 외 분기 -->
                  <div v-else>
                    <v-text-field

                      :id="content+idx"
                      dense
                      :value="getSelectedPersonEmitter[content]"
                      hide-details=""
                      solo
                      readonly
                      append-icon="mdi-pencil"
                      @click:append="changeContent(content+idx)"
                      @input="modifySelectedPersonEmitter({key : content, value : $event})"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-card style="margin-top : 50px;">
      <v-card-title>
        노트
      </v-card-title>
      <NoteInput
        :member-id="memberId"
      />
      <NoteList
        v-if="getNotes"
        :note-list="getNotes"
      />
    </v-card>
    <v-file-input
      id="avatar-img"
      accept="image/jpeg,image/jpg,image/png"
      style="display : none"
      @change="changeAvatar"
    />
  </div>
</template>
<script>
import NoteInput from "@/components/CommonC/NoteInput.vue"
import NoteList from "@/components/CommonC/NoteList.vue"
import {mapGetters,mapMutations,mapActions} from "vuex"

export default {
  components : {
    NoteInput,
    NoteList
  },
  data(){
    return{
      checkBoxType : ['ACTIVE', 'CONFIRMED','NOTICE_ENABLED','PUSH_ENABLED',],
      memberId : null,
      subHeaders : [
        '유저 아이디',
        '이름',
        '연락처',
        '담당 CS 매니저',
        '사진',
        '활성화',
        '확인 상태',
        'NOTICE_ENABLED',
        'PUSH_ENABLED',
      ],
       headerArray : [
        'USER_ID',
        'USER_NAME',
        'PHONE',
        'CS_MANAGER_ID',
        'AVATAR_PATH',
        'ACTIVE',
        'CONFIRMED',
        'NOTICE_ENABLED',
        'PUSH_ENABLED',
        ]
    }
  },
  computed : {
    ...mapGetters('selectedUser',['getSelectedPersonEmitter']),
    ...mapGetters('common',['getNotes'])
  },
  watch : {
    getSelectedPersonEmitter(to){
      this.memberId = to.ID
    }
  },
  methods : {
    ...mapMutations('selectedUser',['modifySelectedPersonEmitter']),
    ...mapActions('selectedUser',['uploadPersonEmitterAvatar','sendModifiedPersonEmitter']),
     changeContent(e){

      const el = document.getElementById(e)

      if (el.readOnly){
        el.readOnly = false
      } else {
        el.readOnly = true
      }
       el.focus()

    },
    changeActive({key}){
      let value
      const el = document.getElementById(key)
      if (el.checked){
        el.checked = false
        value = 0
      } else {
        el.checked = true
        value = 1

      }
      this.modifySelectedPersonEmitter({key,value})

    },
    changeAvatar(e){
      if (e == undefined){
        alert('파일을 제대로 입력해주세요')
        return
      }
      const formData = new FormData();
      formData.append('file', e)
      this.uploadPersonEmitterAvatar(formData)
    },
    clickAvatarImg(){
      document.getElementById('avatar-img').click()
    }
  },

}
</script>
<style lang="">

</style>
