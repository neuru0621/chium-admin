import myAxios from "@/api";

const method = "post";

export default {

  notMemberList({ state, rootState}) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_retrieve_prospective_site_lists";
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
  notMemberDetail({ rootState, siteId }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_retrieve_prospective_site_info";

    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          SITE_ID : siteId
        },
      ]),
    };
    return myAxios(url, method, data);
  },
};
