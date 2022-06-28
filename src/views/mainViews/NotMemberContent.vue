<template>
  <div>
    <v-card>
      <NotMemberDetail />
    </v-card>
  </div>
</template>
<script>
import NotMemberDetail from "@/components/NotMemberContentC/NotMemberDetail.vue"
import {mapActions} from "vuex"
export default {
  components : {
    NotMemberDetail
  },
  created(){
    const notMemberId = this.$route.params.id
    this.notMemberDetail({siteId : notMemberId})
  },
  methods : {
    ...mapActions('notMember',['notMemberDetail'])
  },

}
</script>
<style lang="">

</style>
