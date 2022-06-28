import myAxios from "@/api";
const method = "post";
export default {
  getSelectedUserInfo({ state, rootState, siteId }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/1_03_main/get_site_info";
    const data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          SITE_ID: Number(siteId),
          TYPE_INDEX: state.typeIndex,
          CIRCLE_RANGE: state.circleRange,
        },
      ]),
    };
    return myAxios(url, method, data);
  },

  uploadPermitImgToS3({ payload }) {
    const url = "api/admin/common/upload_img_to_s3";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return myAxios(url, method, payload, config);
  },

  uploadBizImgToS3({ payload }) {
    const url = "api/admin/common/upload_img_to_s3";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return myAxios(url, method, payload, config);
  },

  sendModifiedPermit({ state, rootState }) {
    const userId = rootState.auth.userId;
    const method = "post";
    const url = "api/admin/1_03_main/update_site_info";
    const data = {

      params: JSON.stringify([
        {
          ADMIN_ID: userId,
          SITE_ID: state.selectedUser.siteId,
          BIZ_REG_CODE: state.selectedUser.bizRegCode,
          BIZ_REG_IMG_PATH: state.selectedUser.bizRegImgPath,
          PERMIT_REG_CODE: state.selectedUser.permitRegCode,
          PERMIT_REG_IMG_PATH: state.selectedUser.permitRegImgPath,
          REP_NAME: state.selectedUser.repName,
          B_CODE: state.selectedUser.bCode,
          ADDR: state.selectedUser.addr,
          WSTE_LIST: state.selectedUser.wsteList,
          LAT: state.selectedUser.lat,
          LNG: state.selectedUser.lng,
          COMP_NAME: state.selectedUser.compName,
          SITE_NAME: state.selectedUser.siteName,
          CONFIRMED: state.selectedUser.confirmed,
          HEAD_OFFICE: state.selectedUser.headOffice,
          MANAGER_LIST: state.selectedUser.managerList,
          MANAGER_ID: 0,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  personEmitter({ rootState, memberId }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_get_personal_details";
    const data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          MEMBER_ID: memberId,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  sendModifiedPersonEmitter({ rootState, userData }){
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_update_personal_details";
    const data = {
      params: JSON.stringify([
        {
          ADMIN_ID: userId,
          USER_DETAILS: [userData],
        },
      ]),
    };
    return myAxios(url, method, data);
  }

};
