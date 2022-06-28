import myAxios from "@/api";
import commonApi from "@/api/apiList/commonApi";

export default {
  namespaced: true,
  state: {
    // 로딩 상태
    loading: false,
    // 배출 폐기물 리스트 1
    wsteList1: [],
    // 배출 폐기물 리스트 2
    wsteList2: [],
    // 네비바 리스트
    navItems: [],

    noteDetailsIds : {
      MEMBER_ID : null,
      SITE_ID : null,
      ORDER_ID : null,
      BIDDING_ID : null,
      TRANSACTION_ID : null,
      REPORT_ID : null,
    },
    notes : []
  },
  mutations: {
    // 로딩값 true
    getLoading(state) {
      state.loading = true;
    },
    // 로딩값 false
    endLoading(state) {
      state.loading = false;
    },
    // 폐기물 리스트 설정
    setWsteLists(state, payload) {
      state.wsteList1 = payload.wste1;
      state.wsteList2 = payload.wste2;
    },
    // 네비바 설정
    setNavItems(state, isLogged) {
      // 로그인 되었다면 아래와 같이 설정
      if (isLogged) {
        state.navItems = [
          {
            title: "회원목록",
            icon: "mdi-clipboard-text-outline",
            subNavs : [
              {
                title: "[ 개인 ] 배출자",
                icon: "mdi-account",
                route: "/admin/main/person-emitter/list",
              },
              {
                title: "[ 사업자 ] 배출자 , 수거자 ",
                icon: "mdi-account",
                route: "/admin/main/emitter-collector",
              },
              {
                title: "[ 비회원 ] 배출자 , 수거자 ",
                icon: "mdi-account",
                route: "/admin/main/not-member/list",
              },
            ]
          },
          {
            title: "사용자 추가",
            icon: "mdi-account",
            route: "/admin/main/add-admin",
          },
          {
            title: "통계📊",
            icon: "mdi-chart-bar",
            route: "/admin/main/chart",
          },
          {
            title: "배출등록 현황",
            icon: "mdi-new-box",
            route: "/admin/main/emissions/list",
          },
          {
            title: "입찰정보",
            icon: "mdi-handshake-outline",
            route: "/admin/main/biddings/list",
          },
          { title: "트랜잭션",
            icon: "mdi-vector-combine",
            route: "/admin/main/transaction/list"
          },
          { title: "처리보고서",
            icon: "mdi-content-paste",
            route: "/admin/main/report/list"
          },
          {
            title: "로그 정보",
            icon: "mdi-math-log",
            route: "/admin/main/log/list"
          },
          { title: "로그아웃",
            icon: "mdi-account-cancel",
            route: "/logout"
          },

        ];
      // 아니라면 아래와 같이 설정
      } else {
        state.navItems = [
          { title: "로그인", icon: "mdi-account", route: "/login" },
        ];
      }
    },
    setNoteDetailIds(state, {
                        memberId,
                        siteId,
                        orderId,
                        biddingId,
                        transactionId,
                        reportId,
                        note
                      })
    {
      state.noteDetailsIds.MEMBER_ID = memberId
      state.noteDetailsIds.SITE_ID = siteId
      state.noteDetailsIds.ORDER_ID = orderId
      state.noteDetailsIds.BIDDING_ID = biddingId
      state.noteDetailsIds.TRANSACTION_ID = transactionId
      state.noteDetailsIds.REPORT_ID = reportId
      state.noteDetailsIds.NOTE = note
    },
    resetNoteDetailIds(state){
      state.noteDetailsIds.MEMBER_ID = null
      state.noteDetailsIds.SITE_ID = null
      state.noteDetailsIds.ORDER_ID = null
      state.noteDetailsIds.BIDDING_ID = null
      state.noteDetailsIds.TRANSACTION_ID = null
      state.noteDetailsIds.REPORT_ID = null
      state.noteDetailsIds.NOTE = null
    },
    setNotes(state,payload){
      state.notes = payload
    }

  },
  actions: {
    // 폐기물 리스트 받아오는 api
    async getWsteLists({ commit }) {
      const method = "post";
      const url = "api/admin/common/get_wste_lists";
      const url2 = "api/admin/common/get_wste_appearance";
      let wste1
      let wste2
      try {
        wste1 = await myAxios(url, method);
        wste2 = await myAxios(url2, method);
      } catch (e) {
        console.log(e)
      }
      commit("setWsteLists", {
        wste1: wste1.data.data,
        wste2: wste2.data.data,
      });
    },
    // 로그인 여부에 따라 네비게이션 목록 바꿔줌
    checkIsLogged({ commit, rootGetters }) {
      commit("setNavItems", rootGetters["auth/isLogged"]);
    },

    async insertNote({state, rootState,commit}){
      await commonApi.insertNote({rootState, noteDetails : state.noteDetailsIds})
      commit('resetNoteDetailIds')
      location.reload()
    }
  },
  getters: {
    // 현재 로딩 상태 나타냄
    getNowLoadingState(state) {
      return state.loading;
    },
    // 폐기물 리스트 나태냄
    showWsteLists(state) {
      return { wsteList1: state.wsteList1, wsteList2: state.wsteList2 };
    },
    // 네비게이션 리스트 나타냄
    getNavList(state) {
      return state.navItems;
    },
    // 노트 리스트를 가지고옴
    getNotes(state){
      return state.notes
    }
  },
};
