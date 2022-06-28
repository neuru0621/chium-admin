import biddingsApi from '@/api/apiList/biddingsApi'

export default {
  namespaced: true,
  state: {
    // 검색 옵션
    searchObj : {
      pageOffset: 0,
      pageSize: 15,
      // 현재 페이지 번호
      pageNum: 1,
      // 마지막 페이지 번호
      lastPageNum: 10,
      // 검색어
      search: null,
    },
    // 선택된 비딩
    selectedBidding : {},
    // 받아온 전체 비딩리스트
    biddingList: [],
  },
  mutations: {
    // 비딩 리스트를 저장
    setBiddingList(state,payload){
      if (payload) {
        state.biddingList = payload.BIDDING_LIST;
        state.searchObj.lastPageNum = Number(payload.LAST_PAGE);
      } else {
        // 비어있다면 초기화 시켜준다.
        state.biddingList = [];
        state.searchObj.lastPageNum = 0;
      }
    },

    // query로 1을 받아오면 0으로 설정,
    // 그 외의 숫자는 적절히 offet을 설정
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
    // 선택된 비딩을 vuex에 저장
    setSelectedBidding(state,payload) {
      // 받아오지만 사용하지 않는 값들을 제외해줌,
      const uselessKeys = ['REJECT_BIDDING','REJECT_BIDDING_AT','ORDER_ID']
      uselessKeys.forEach( (v) => {
        delete payload[v]
      })
      // key값을 오름차순으로 정렬
      state.selectedBidding = Object.keys(payload).sort().reduce(
                                (newObj,key) => {
                                  newObj[key] = payload[key];
                                  return newObj;
                                },{}
                              );
      // ORDER_ID라는 것을 받아오지만 그걸 보여주지 말라고 하셨고
      // 그 자리에 배출자 이름을 나타내라고 하셔서 하나 추가 하였음
      state.selectedBidding['SITE_NAME'] = state.selectedBidding.ORDER_INFO[0]['SITE_NAME']
    },
    changeBiddingDetail(state,{key,value}){
      // 키, 값을 받아와 비딩 값 변경
      state.selectedBidding[key] = value
    }
  },
  actions: {
    // 비딩리스트를 서버에 요청
    async newComingBiddings({state, rootState, commit}){
      try {
        const res = await biddingsApi.newComingBiddings({state, rootState})
        commit("setBiddingList", res.data.data[0]);
      } catch (e) {
        console.log(e)
      }

    },
    // 비딩디테일을 서버에 요청
    async biddingDetail({rootState,commit}, {biddingId}){
      try {
        const res = await biddingsApi.biddingDetail({rootState,biddingId})
        commit("setSelectedBidding", res.data.data[0].BIDDING_INFO);
        commit("common/setNotes", res.data.data[0].NOTES.NOTES, {root : true});
      } catch (e) {
        console.log(e)
      }
    },
    // 변경된 비딩디테일을 서버에 수정요청
    async modifyBiddingDetail({state, rootState}){
      try {
        await biddingsApi.modifyBiddingDetail({state, rootState})
        location.reload()
      } catch (e) {
        console.log(e)
      }
    },
  },
  getters: {
    // 비딩 리스트 받아오기
    getBiddingsList(state){
      return state.biddingList;
    },
    // 비딩 디테일 받아오기
    getBiddingDetails(state){
      return state.selectedBidding
    },
    // 현재 페이지번호 받아오기
    getPageNum(state){
      return state.searchObj.pageNum
    },
    // 마지막 페이지번호 받아오기
    getLastPageNum(state){
      return state.searchObj.lastPageNum
    },
    // 검색어 받아오기
    getSearch(state){
      return state.searchObj.search
    },
  },
};
