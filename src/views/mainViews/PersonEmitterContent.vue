<template>
  <div>
    <v-card>
      <PersonEmitterInfo />
    </v-card>
  </div>
</template>
<script>
import PersonEmitterInfo from "@/components/PersonEmitterContentC/PersonEmitterInfo.vue"
import {mapActions} from "vuex"
export default {
  components : {
    PersonEmitterInfo
  },
  created(){
    const personEmitterId = this.$route.params.id

    this.personEmitter(personEmitterId)
  },
  methods : {
    ...mapActions('selectedUser',['personEmitter'])
  },

}
</script>
<style lang="">

</style>
