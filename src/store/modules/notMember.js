import notMemberApi from "@/api/apiList/notMemberApi";

export default {
  namespaced: true,
  state: {
    searchObj : {
      pageOffset: 0,
      pageSize: 15,
      pageNum: 1,
      lastPageNum: 10,
      search: null,
    },
    // 선택된 비회원 정보
    selectedNotMember : {},
    // 비회원 리스트
    notMemberList: [],
  },
  mutations: {
 // 비회원사 리스트 설정
 setNotMemberList(state,payload){
  if (payload) {
    state.notMemberList = payload.SITE_LISTS;
    state.searchObj.lastPageNum = Number(payload.LAST_PAGE);
  } else {
    // 비어있다면 초기화 시켜준다.
    state.notMemberList = [];
    state.searchObj.lastPageNum = 0;
  }
},
// 현재 페이지 번호
setPageNum(state, payload) {
  state.searchObj.pageNum = payload;
  if (state.searchObj.pageNum == 1) {
    state.searchObj.pageOffset = 0;
  } else {
    state.searchObj.pageOffset =
      (state.searchObj.pageNum - 1) * state.searchObj.pageSize;
  }
},
// 검색어 저장
setSearch(state, payload) {
  state.searchObj.search = payload;
},
// 비회원사 디테일 저장
setNotMemberDetail(state,payload){
  // 보여주지 않을 키워드
  const uselessKeys = [
    'BCODE',
    'BIZ_CODE',
    'LAT',
    'LNG',
  ]
  // 삭제하고
  uselessKeys.forEach( (v) => {
    delete payload[v]
  })
  // 저장
  state.selectedNotMember = payload
},
// 비회원사 수정사항
changeSelectedNotMember(state,{key,value}){
  state.selectedNotMember[key] = value
}

  },
  actions: {
    // 비회원사 리스트
    async notMemberList({state,rootState,commit}){
      try {
        const res = await notMemberApi.notMemberList({state, rootState})
        console.log(res,'레스레스')

        commit("setNotMemberList", res.data.data[0]);
      } catch (e) {
        console.log(e)
      }
    },
    // 비회원사 디테일
    async notMemberDetail({rootState,commit},{siteId}){
      try {
        const res = await notMemberApi.notMemberDetail({rootState,siteId})
        console.log(res.data.data[0].SITE_INFO[0],'레스레스')
        commit("setNotMemberDetail", res.data.data[0].SITE_INFO[0]);
        // commit("common/setNotes", res.data.data[0].NOTES.NOTES, { root : true });
      } catch (e) {
        console.log(e)
      }
    },
  },
  getters: {
     // 비회원사 리스트
     getNotMemberList(state){
      return state.notMemberList;
    },
    // 비회원사 디테일
    getNotMemberDetail(state){
      return state.selectedNotMember
    },
    // 현재 페이지 번호
    getPageNum(state){
      return state.searchObj.pageNum
    },
    // 마지막 페이지 번호
    getLastPageNum(state){
      return state.searchObj.lastPageNum
    },
    // 현재 검색어
    getSearch(state){
      return state.searchObj.search
    },
  },
};

