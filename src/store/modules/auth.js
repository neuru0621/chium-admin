import VueCookies from "vue-cookies";
import router from "@/router";
import cloneDeep from "lodash/cloneDeep";
import authApi from "@/api/apiList/authApi"

// 기본 어드민 유저의 정보
const INITIAL_STATE = {
  // 인덱스 아이디값
  userId: null,
  // 권한 클래스 값
  class: null,
};

export default {
  namespaced: true,
  state: cloneDeep(INITIAL_STATE),
  mutations: {
    // 로그인 한 어드민 유저 설정
    setUser(state, { userId, classNum }) {
      state.userId = userId;
      state.class = classNum;
    },
    // 로그아웃
    logout(state) {
      // 쿠키에서 토큰제거 후 vuex의 userId, class 초기화
      VueCookies.remove("token");
      location.reload()
      Object.assign(state, cloneDeep(INITIAL_STATE));
    },

  },
  actions: {
    // 로그인
    async login({ commit }, { adminId, adminPw }) {
      let res
      try{
        res = await authApi.login({adminId,adminPw});
      }catch(e){
        console.log(e)
      }
      const state = res.data.state;
      if (state == 100001) {
        alert("아이디가 존재하지 않습니다.");
        return;
      }
      if (res.data.data == null) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      const getData = JSON.parse(res.data.data);
      const userId = getData.ID;
      const classNum = getData.CLASS;
      // 로그인 성공시 받아온 토큰 값을 쿠키에 저장
      const token = res.data.token.token;
      VueCookies.set("token", token, "6h");
      // 아이디 값과 권한 클래스값 저장
      commit("setUser", { userId, classNum });
      // 화면 이동
      router.push({ path: "/admin/main/emitter-collector" });
    },
  },
  getters: {
    getUserClass(state) {
      // 현재의 유저 클래스에 따라 관리자의 이름이 다르게 보이도록 설정
      if (state.class == null) {
        return "로그인을 해주세요.";
      } else if (state.class == 101) {
        return "총괄 관리자";
      }
      return "일반 관리자";
    },
    // 로그인 했는지 여부를 userId값으로 판단
    isLogged(state) {
      if (state.userId) {
        return true;
      }
      return false;
    },
    // 클래스 권한 값을 통하여 권한 판단
    canYouComeHere1(state) {
      if (state.class == 101) {
        return true;
      }
      return false;
    },
    getUserId(state){
      return state.userId
    }
  },
};

