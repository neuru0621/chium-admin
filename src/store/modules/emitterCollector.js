// import myAxios from "@/api";
// 게시판
import emitterCollectorApi from '@/api/apiList/emitterCollectorApi'


export default {
  namespaced: true,
  state: {
    // [ 사업자 ] 수거자 배출자 Obj
    emitterCollectorObj: {
      // [ 사업자 ] 수거자 배출자 리스트
      emitterCollectorList: [],
      // 확인 되었는지,
      confirmed: null,
      // 수거자인지 배출자인지,
      emitOrCol: null,
      // 현재 페이지 번호
      pageNum: 1,
      // 마지막 페이지 번호
      lastPageNum: 10,
      pageOffset: 0,
      pageSize: 15,
      // 검색어
      EmitAndColSearch: null,
    },
    // 검색 옵션
    confirmedList: [null, true, false],
    emitOrColList: [null, true, false],

    // [ 개인 ] 배출자 Obj
    personEmitterObj: {

      personEmitterList: [],
      // 아래는 검색 옵션
      confirmedList: [null, true, false],
      activeList: [null, true, false],
      pageNum: 1,
      confirmed: null,
      active: null,
      personEmitterSearch : null,
      lastPageNum: 10,
      siteId : 0,
      pageOffset: 0,
      pageSize: 15,
    },
  },
  mutations: {

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%사업자 수거자 배출자%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // db에서 받아온 리스트 들을 vuex에 저장해준다.
    setEmitterCollectorList(state, payload) {
      if (payload) {
        state.emitterCollectorObj.emitterCollectorList = payload;
        state.emitterCollectorObj.lastPageNum = Number(payload[0].LAST_PAGE);
      } else {
        // 비어있다면 초기화 시켜준다.
        state.emitterCollectorObj.emitterCollectorList = [];
        state.emitterCollectorObj.lastPageNum = 0;
      }
    },
    // query로 1을 받아오면 0으로 설정,
    // 그 외의 숫자는 적절히 offet을 설정
    setPageNum(state, payload) {
      state.emitterCollectorObj.pageNum = payload;
      if (state.emitterCollectorObj.pageNum == 1) {
        state.emitterCollectorObj.pageOffset = 0;
      } else {
        state.emitterCollectorObj.pageOffset =
          (state.emitterCollectorObj.pageNum - 1) * state.emitterCollectorObj.pageSize;
      }
    },
    // filter 조건을 vuex에 저장 (확인,미확인, 모두)
    setConfirmed(state, payload) {
      state.emitterCollectorObj.confirmed = payload;
    },
    // search bar에 적은 keyword를 vuex에 저장
    setSearch(state, payload) {
      state.emitterCollectorObj.EmitAndColSearch = payload;
    },
    // filter조건을 vuex에 저장 (배출자 인지 수거자인지 모두 인지)
    setEmitOrCol(state, payload) {
      state.emitterCollectorObj.emitOrCol = payload;
    },

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%개인 수거자 배출자%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // 개인 배출자 리스트 설정
    setPersonEmitterList(state, payload) {
      if (payload) {
        state.personEmitterObj.personEmitterList = payload.USERS;
        state.personEmitterObj.lastPageNum = Number(payload.LAST_PAGE);
      } else {
        // 비어있다면 초기화 시켜준다.
        state.personEmitterObj.personEmitterList = [];
        state.personEmitterObj.lastPageNum = 0;
      }
    },
    // 개인 배출자 filter 설정 (확인,미확인,모두)
    setPersonEmitterConfirmed(state,payload){
      state.personEmitterObj.confirmed = payload
    },
    // 개인 배출자 filter 설정 (활성화,비활성화,모두)
    setPersonEmitterActive(state,payload){
      state.personEmitterObj.active = payload
    },
    // 개인 배출자 검색어 설정
    setPersonEmitterSearch(state,payload){
      state.personEmitterObj.personEmitterSearch = payload
    },
    // 개인 배출자 검색 ID 설정 ( 0일 경우 모든 개인 배출자 )
    setPersonEmitterSiteId(state,payload){
      state.personEmitterObj.siteId = payload
    },
    // PAGE NUM으로 PAGE OFFSET 설정
    setPersonEmitterPageNum(state,payload){
      state.personEmitterObj.pageNum = payload
      if (state.personEmitterObj.pageNum == 1) {
        state.personEmitterObj.pageOffset = 0;
      } else {
        state.personEmitterObj.pageOffset = (state.personEmitterObj.pageNum - 1) * state.personEmitterObj.pageSize;
      }
    },
  },
  actions: {
    // [ 사업자 ] 수거자, 배출자 리스트 받아오기
    async EmitterCollectorList({ state, commit, rootState }) {
      try {
        const res = await emitterCollectorApi.EmitterCollectorList({state, rootState})
        commit("setEmitterCollectorList", res.data.data[0].SITE_LISTS);
      } catch (e) {
        console.log(e);
      }
    },
    // [ 개인 ] 배출자 리스트 받아오기
    async PersonEmitterList({ state, commit, rootState }) {
      try {
        const res = await emitterCollectorApi.PersonEmitterList({state, rootState})
        commit("setPersonEmitterList", res.data.data[0]);
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%사업자 수거자 배출자%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // [ 사업자 ] 수거자 배출자 리스트들
    getEmitterCollectorList(state) {
      return state.emitterCollectorObj.emitterCollectorList;
    },
    // [ 사업자 ] 수거자 배출자화면의 현재 페이지 번호
    getPageNum(state) {
      return state.emitterCollectorObj.pageNum;
    },
    // [ 사업자 ] 수거자 배출자화면의 마지막 페이지 번호
    getLastPageNum(state) {
      return state.emitterCollectorObj.lastPageNum;
    },
    // [ 사업자 ] 수거자 배출자화면의 필터값 설정 (확인 true, 미확인 false, 모두 null)
    getConfirmedState(state) {
      return state.emitterCollectorObj.confirmed;
    },
    // [ 사업자 ] 수거자 배출자화면의 필터 (확인, 미확인, 모두)
    getConfirmedList(state) {
      return state.confirmedList;
    },
    // [ 사업자 ] 수거자 배출자화면의 검색어
    getSearch(state) {
      return state.emitterCollectorObj.EmitAndColSearch;
    },
    // [ 사업자 ] 수거자 배출자화면의 필터 (배출자 false, 수거자 true, 모두 null)
    getEmitColList(state) {
      return state.emitOrColList;
    },
    // [ 사업자 ] 수거자 배출자화면의 필터 (배출자, 수거자, 모두)
    getEmitOrCol(state) {
      return state.emitterCollectorObj.emitOrCol;
    },

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%개인 수거자 배출자%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // [ 개인 ] 배출자 리스트
    getPersonEmitterList(state) {
      return state.personEmitterObj.personEmitterList;
    },
    // [ 개인 ] 배출자 현재 페이지 번호
    getPersonEmitterPageNum(state) {
      return state.personEmitterObj.pageNum;
    },
    // [ 개인 ] 배출자 마지막 페이지 번호
    getPersonEmitterLastPageNum(state) {
      return state.personEmitterObj.lastPageNum;
    },
    // [ 개인 ] 배출자 확인 상태
    getPersonEmitterConfirmed(state) {
      return state.personEmitterObj.confirmed;
    },
    // [ 개인 ] 배출자 확인 상태 리스트 ( 확인 미확인 모두)
    getPersonEmitterConfirmedList(state) {
      return state.personEmitterObj.confirmedList;
    },
    // [ 개인 ] 배출자 활성화 상태 리스트 ( 활성화 비활성화 모두)
    getPersonEmitterActiveList(state) {
      return state.personEmitterObj.activeList;
    },
    // [ 개인 ] 배출자 검색어
    getPersonEmitterSearch(state) {
      return state.personEmitterObj.personEmitterSearch;
    },
    // [ 개인 ] 배출자 확성화 상태
    getPersonEmitterActive(state) {
      return state.personEmitterObj.active;
    },
    // [ 개인 ] 배출자 검색할 id
    getPersonEmitterSiteId(state) {
      return state.personEmitterObj.siteId;
    },
  },
};
