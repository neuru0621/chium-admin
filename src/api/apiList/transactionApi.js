import myAxios from "@/api";

const method = "post";

export default {
  // 로그인 할 시 인풋으로 받는 아이디 비밀번호 값
  transactionList({ state, rootState }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_get_new_transactions";
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
  transactionDetail({ rootState, transactionId }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_get_new_transaction_details";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          TRANSACTION_ID : transactionId
        },
      ]),
    };
    return myAxios(url, method, data);
  },


};
