<template>
  <div style="padding : 30px">
    <v-row>
      <v-col>
        <v-textarea
          id="noteInput"
          v-model="note"
          outlined
          label="노트"
        />
      </v-col>
      <v-col
        cols="auto"
      >
        <v-btn @click="beforInsertNote">
          입력하기
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {mapActions, mapMutations} from "vuex"
export default {
  props : ['memberId','siteId','orderId','biddingId','transactionId','reportId'],
  data(){
    return {
      note : null,
      propsList : ['memberId','siteId','orderId','biddingId','transactionId','reportId'],
    }
  },
  methods : {
    ...mapActions('common',['insertNote']),
    ...mapMutations('common',['setNoteDetailIds']),
    beforInsertNote(){
      const emptyObj = {}
      this.propsList.forEach( v => {
        if (this[v] !== undefined){
          emptyObj[v] = this[v]
        } else {
          emptyObj[v] = null
        }
      });
      emptyObj.note = this.note
      console.log(emptyObj,'ddd')
      this.setNoteDetailIds(emptyObj)
      this.insertNote()
    }
  },


}
</script>
<style lang="">

</style>
