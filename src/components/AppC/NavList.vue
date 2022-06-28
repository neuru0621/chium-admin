<template>
  <div>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://chium.s3.ap-northeast-2.amazonaws.com/temp/admin-1651803316.png" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ getUserClass }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list dense>
      <v-list-item
        v-for="item in getNavList"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content
          v-if="item.title === '회원목록' "
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item
            v-for="eachNav in item.subNavs"
            :key="eachNav.title"
            link
          >
            <v-list-item-content @click="goToRoute(eachNav.route)">
              <v-list-item-title>{{ eachNav.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-content>
        <v-list-item-content
          v-else
          @click="goToRoute(item.route)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return {
      items : [{ title: '로그인', icon: 'mdi-account', route : '/login' }]
    }
  },

   computed : {
    ...mapGetters('auth',['getUserClass','isLogged']),
    ...mapGetters('common',['getNavList']),
  },
  methods : {
    goToRoute(route){
      this.$router.push({path : route})
    }
  }
}
</script>
<style lang="">

</style>
