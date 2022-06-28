import selectedUserApi from "@/api/apiList/selectedUserApi";

export default {
  namespaced: true,

  state: {
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%사업자 수거자 배출자%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // 게시판에서 선택된 곳의 정보를 입력하는 곳
    // 사업자 배출자, 사업자 수거자의 정보가 여기에 담긴다.
    selectedUser: {
      siteName: null,
      headOffice: null,
      permitRegCode: null,
      permitRegImgPath: null,
      trmtBizCode: null,
      addr: null,
      siteId: null,
      confirmed: null,
      confirmedAt: null,
      manager: null,
      managerList: [],
      active: null,
      phone: null,
      bCode: null,
      wsteList: [],
      siteList: [],
      lat: null,
      lng: null,
      updatedAt: null,
      userType : null,
      bizRegCode: null,
      bizRegImgPath: null,
      compName: null,
      repName: null,
    },
    // 배출자 밑에 보여지는 리스트들 ( 입찰 한 사람들 ?)
    showListIfIEmitter : {
      orderCode : null,
      orderId : null,
      createdAt : null,
      visitEndAt : null,
      biddingEndAt : null,
      addr : null,
      siteName : null,
      // 0이면 개인 0이 아니면 사업자
      siteId : null,
      // 0이 확인 한거, 0이 아니면 미확인
      checkState : null,
    },
    showListIfIEmitterArray : [],
    typeIndex: 0,
    circleRange: 50,
    optSelect: ["거리"],

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%개인 수거자 배출자%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // 개인 배출자의 정보가 여기에 담긴다.
    selectedPersonEmitter : {
    }
  },
  mutations: {
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%사업자 수거자 배출자%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // 배출자라면 자신이 등록한 신규 배출 내용이 보이도록
    setShowListIfIEmitter(state,payload){
      if (payload == null){
        state.showListIfIEmitterArray = []
        return
      }
      // 초기화 시켜줌
      state.showListIfIEmitterArray = []
      // 필요한 내용만을 파싱하여 넣어준다.
      if (state.selectedUser.userType === 3){
        payload.forEach(i=>{
          let emptyObj = {};
          emptyObj.orderCode = i.ORDER_CODE
          emptyObj.orderId = i.ORDER_ID
          emptyObj.biddingId = i.BIDDING_ID
          emptyObj.createdAt = i.CREATED_AT
          emptyObj.dateOfVisit = i.DATE_OF_VISIT
          emptyObj.dateOfBidding = i.DATE_OF_BIDDING
          state.showListIfIEmitterArray.push(emptyObj)
        })
      } else if (state.selectedUser.userType === 2) {
        payload.forEach(i=>{
          let emptyObj = {};
          emptyObj.orderCode = i.ORDER_CODE
          emptyObj.orderId = i.ORDER_ID
          emptyObj.createdAt = i.CREATED_AT
          emptyObj.visitEndAt = i.VISIT_END_AT
          emptyObj.biddingEndAt = i.BIDDING_END_AT
          emptyObj.addr = i.ADDR
          emptyObj.siteName = i.SITE_NAME
          emptyObj.siteId = i.SITE_ID
          emptyObj.checkState = i.CHECK_STATE
          state.showListIfIEmitterArray.push(emptyObj)

        })
      }



    },
    setSelectedUser(state, payload) {
      // 헤드오피스 인지 아닌지,
      state.selectedUser.headOffice = payload.SITE_INFO[0].HEAD_OFFICE;
      // 확정날짜
      state.selectedUser.confirmedAt = payload.SITE_INFO[0].CONFIRMED_AT.slice(
        0,
        19
      );
      // 확정 되지 않았다면 시간 대신 아래의 메시지를 담는다.
      if (payload.SITE_INFO[0].CONFIRMED != 1) {
        state.selectedUser.confirmedAt = "확인되지 않았습니다.";
      }
      // 확정 유무
      state.selectedUser.confirmed = payload.SITE_INFO[0].CONFIRMED;
      state.selectedUser.trmtBizCode = payload.SITE_INFO[0].TRMT_BIZ_CODE;
      // 활성화 유무
      state.selectedUser.active = payload.SITE_INFO[0].ACTIVE;
      // 허가증 이미지 경로
      state.selectedUser.permitRegImgPath = payload.PERMIT_REG_IMG_PATH;
      // 사이트 아이디
      state.selectedUser.siteId = payload.SITE_ID;
      // 허가증 등록번호
      state.selectedUser.permitRegCode = payload.PERMIT_REG_CODE;
      // 주소
      state.selectedUser.addr = payload.ADDR;
      // 사이트 이름
      state.selectedUser.siteName = payload.SITE_NAME;
      // 컴퍼니 이름
      state.selectedUser.compName = payload.COMPANY_INFO[0].COMP_NAME;
      // 대표자 이름
      state.selectedUser.repName = payload.COMPANY_INFO[0].REP_NAME;
      // 사업자 등록증 번호
      state.selectedUser.bizRegCode = payload.COMPANY_INFO[0].BIZ_REG_CODE;
      // 사업자 등록증 이미지 경로
      state.selectedUser.bizRegImgPath = payload.COMPANY_INFO[0].BIZ_REG_IMG_PATH;
      // B_CODE
      state.selectedUser.bCode = payload.B_CODE,
      // 최종 수정 날짜
      state.selectedUser.updatedAt = payload.UPDATED_AT.slice(0, 19);
      // 배출 리스트
      state.selectedUser.wsteList = payload.WSTE_INFO;
      // 위도 경도
      state.selectedUser.lat = payload.SITE_INFO[0].LAT;
      state.selectedUser.lng = payload.SITE_INFO[0].LNG;
      // 근처 사이트
      state.selectedUser.siteList = payload.SITE_LIST;
      // 수거자인지 배출자인지 구분 수거자라면 3 배출자라면 2
      state.selectedUser.userType = payload.USER_TYPE;
      // 값이 null 일때에도 배열상태를 유지하기 위해
      state.selectedUser.managerList = payload.MANAGER_LIST

      if (payload.MANAGER_LIST == null) {
        state.selectedUser.managerList = [];
      }

      // 이 문장을 if문 위에다 두면 null일 경우에 map함수를 돌리려고 할 것이고, 이로인해 오류가 발생할 것 같으므로 아래에다 두었다.
      state.selectedUser.managerList = state.selectedUser.managerList.map((item) => {
        return { PHONE: item.PHONE, USER_NAME: item.USER_NAME, ID: item.ID, USER_ID : item.USER_ID};
      });

      if (payload.WSTE_INFO == null) {
        state.selectedUser.wsteList = [];
      }
      if (payload.SITE_LIST == null) {
        state.selectedUser.siteList = [];
      }
    },
    // 정보 변경
    changeSelectedUserInfo(state, { key, value }) {
      // 매니저 리스트의 정보를 변경 담당자명, 핸드폰, 아이디 수정할 경우 if문을 탄다.
      if (key.slice(0, 2) == "ph") {
        // 2자리 숫자 까지 읽어옴
        const idx = Number(key.slice(2, 4));
        state.selectedUser.managerList[idx].PHONE = value;
        return;
      } else if (key.slice(0, 2) == "ma") {
        // 2자리 숫자 까지 읽어옴
        const idx = Number(key.slice(2, 4));
        state.selectedUser.managerList[idx].USER_NAME = value;
        return;
      } else if (key.slice(0, 2) == "id") {
        // 2자리 숫자 까지 읽어옴
        const idx = Number(key.slice(2, 4));
        state.selectedUser.managerList[idx].USER_ID = value;
        return;
      }
      state.selectedUser[key] = value;
    },
    // 허가증 이미지 변경
    setPermitImg(state, payload) {
      state.selectedUser.permitRegImgPath = payload;
    },
    // 사업자 등록증 이미지 변경
    setBizImg(state, payload) {
      state.selectedUser.bizRegImgPath = payload;
    },
    // 주소 변경
    setAddr(state, payload) {
      state.selectedUser.addr = payload.addr;
      state.selectedUser.bCode = payload.bCode;
      state.selectedUser.lat = payload.lat;
      state.selectedUser.lng = payload.lng;
    },
    addWsteList(state, payload) {
      state.selectedUser.wsteList.push(payload);
    },
    removeWsteList(state, payload) {
      state.selectedUser.wsteList = state.selectedUser.wsteList.filter(
        (v) => v != payload
      );
    },
    // 반경 N KM N설정
    setCircleRange(state, payload) {
      state.circleRange = Number(payload);
    },
    setTypeIndex(state, payload) {
      state.typeIndex = Number(payload);
    },

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%개인 수거자 배출자%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // 개인배출자 정보 설정
    setSelectedPersonEmitter(state,payload) {
      state.selectedPersonEmitter = payload
    },
    // 개인배출자 수정사항 설정
    modifySelectedPersonEmitter(state,{key,value}){
      state.selectedPersonEmitter[key] = value
    }
  },
  actions: {
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%사업자 수거자 배출자%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // [ 사업자 ]  배출자 수거자 정보 조회
    async getSelectedUserInfo({ state, commit, rootState }, { siteId }) {
      try {
        const res = await selectedUserApi.getSelectedUserInfo({state,rootState,siteId})
        const siteInfo = res.data.data[0].SITE_INFO[0];
        commit("setSelectedUser", siteInfo);
        if (state.selectedUser.userType === 3){
          commit('setShowListIfIEmitter', siteInfo.COLLECTOR_BIDDING_LIST.BIDDINGS)
        } else if (state.selectedUser.userType === 2){
          commit('setShowListIfIEmitter', siteInfo.DISPOSER_ORDER_LIST)
        }
        commit('common/setNotes',res.data.data[0].NOTES.NOTES,{root : true})
      } catch (e) {
        console.log(e);
      }
    },
    // 허가증 사진 업로드
    async uploadPermitImgToS3({ commit }, payload) {
      try {
        const res = await selectedUserApi.uploadPermitImgToS3({payload});
        commit("setPermitImg", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    // 사업자 등록증 업로드
    async uploadBizImgToS3({ commit }, payload) {
      try {
        const res = await selectedUserApi.uploadBizImgToS3({payload});
        commit("setBizImg", res.data);
      } catch (e) {
        console.log(e);
      }
    },

    //  [ 사업자 ] 수거자 배출자 정보 변경
    async sendModifiedPermit({ state, rootState }) {
      try {
        await selectedUserApi.sendModifiedPermit({state,rootState});
        window.location.reload();
      } catch (e) {
        console.log(e);
      }

    },

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%개인 수거자 배출자%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // [ 개인 ] 배출자 정보 조회
    async personEmitter({ rootState, commit }, payload) {
      try {
        const memberId = payload
        const res = await selectedUserApi.personEmitter({rootState, memberId});
        commit('setSelectedPersonEmitter',res.data.data)
        commit('common/setNotes',res.data.data.NOTES.NOTES, {root : true})
      } catch (e) {
        console.log(e);
      }

    },
    // 개인 배출자 사진 변경
    async uploadPersonEmitterAvatar({ commit }, payload) {
      try {
        const res = await selectedUserApi.uploadPermitImgToS3({payload});
        commit("modifySelectedPersonEmitter", {key : 'AVATAR_PATH', value : res.data });
      } catch (e) {
        console.log(e);
      }
    },
    // [ 개인 ] 배출자 정보 변경
    async sendModifiedPersonEmitter({state, rootState }) {
      try {
        await selectedUserApi.sendModifiedPersonEmitter({rootState, userData: state.selectedPersonEmitter});
        window.location.reload();
      } catch (e) {
        console.log(e);
      }

    },
  },
  getters: {
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%사업자 수거자 배출자%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // 현재 선택된 [ 사업자 ] 배출자, 수거자의 정보
    getSeletedUser(state) {
      return state.selectedUser;
    },
    // 맨 위에 나타낼 정보
    getLine1(state) {
      return {
        compName: state.selectedUser.compName,
        siteName: state.selectedUser.siteName,
        repName: state.selectedUser.repName,
        addr: state.selectedUser.addr,
        headOffice: state.selectedUser.headOffice,
        active: state.selectedUser.active,
        managerList: state.selectedUser.managerList,
        // readonly
        confirmedAt: state.selectedUser.confirmedAt,
        confirmed: state.selectedUser.confirmed,
      };
    },
    // 두 번째 나타낼 정보
    getLine2(state) {
      return {
        bizRegCode: state.selectedUser.bizRegCode,
        permitRegCode: state.selectedUser.permitRegCode,
        bizRegImgPath: state.selectedUser.bizRegImgPath,
        permitRegImgPath: state.selectedUser.permitRegImgPath,
      };
    },
    // 지도상에서 나타내고 싶은 수거자 or 배출자의 옵션 설정
    getOptList(state) {
      return {
        typeIndex: state.typeIndex,
        circleRange: state.circleRange,
        optSelect: state.optSelect,
      };
    },
    // 수거자인지 배출자인지에 따라서 밑에 정보가 다르게 보임
    getShowListIfIEmitter(state){
      return state.showListIfIEmitterArray
    },

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%개인 수거자 배출자%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // [ 개인 ]  배출자의 정보
    getSelectedPersonEmitter(state){
      return state.selectedPersonEmitter
    }
  },
};
