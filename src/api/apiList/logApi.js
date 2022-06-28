import myAxios from "@/api";

const method = "post";

export default {

  logList({ state, rootState , orderId}) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_get_new_logs";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          ORDER_ID : orderId,
          SEARCH: state.searchObj.search,
          OFFSET_SIZE: state.searchObj.pageOffset,
          PAGE_SIZE: state.searchObj.pageSize,
        },
      ]),
    };
    return myAxios(url, method, data);
  },

  logList2({ rootState , orderId}) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_get_new_logs";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          ORDER_ID : orderId,
          SEARCH: null,
          OFFSET_SIZE: 0,
          PAGE_SIZE: 1000,
        },
      ]),
    };
    return myAxios(url, method, data);
  },

  // 유저의 인덱스의 값

};
