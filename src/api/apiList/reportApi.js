import myAxios from "@/api";

const method = "post";

export default {
  // 로그인 할 시 인풋으로 받는 아이디 비밀번호 값
  reportList({ state, rootState }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_get_new_reports";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          SEARCH: state.searchObj.search,
          OFFSET_SIZE: state.searchObj.pageOffset,
          PAGE_SIZE: state.searchObj.pageSize,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  reportDetail({ rootState, reportId }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_get_new_report_details";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          REPORT_ID : reportId
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  reportModify({ state, rootState }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_update_report_details";
    let data = {
      params: JSON.stringify([
        {
          ADMIN_ID : userId,
          REPORT_DETAILS  : [{
            ID : state.selectedReport.ID,
            CONFIRMED : state.selectedReport.CONFIRMED,
            PRICE : state.selectedReport.PRICE,
            QUANTITY : state.selectedReport.QUANTITY,
          }]
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  // 유저의 인덱스의 값

};
