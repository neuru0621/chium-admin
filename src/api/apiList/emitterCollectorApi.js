import myAxios from "@/api";

export default {
  EmitterCollectorList({ state, rootState }) {
    const userId = rootState.auth.userId;
    const method = "post";
    const url = "api/admin/1_03_main/get_permits";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          SEARCH: state.emitterCollectorObj.EmitAndColSearch,
          OFFSET_SIZE: state.emitterCollectorObj.pageOffset,
          PAGE_SIZE: state.emitterCollectorObj.pageSize,
          CONFIRMED: state.emitterCollectorObj.confirmed,
          EMIT_OR_COL: state.emitterCollectorObj.emitOrCol,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  PersonEmitterList({ state, rootState }) {
    const userId = rootState.auth.userId;
    const method = "post";
    const url = "api/admin/1_03_main/sp_admin_retrieve_users";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          SEARCH: state.personEmitterObj.personEmitterSearch,
          OFFSET_SIZE: state.personEmitterObj.pageOffset,
          PAGE_SIZE: state.personEmitterObj.pageSize,
          CONFIRMED: state.personEmitterObj.confirmed,
          ACTIVE: state.personEmitterObj.active,
          SITE_ID : state.personEmitterObj.siteId,
        },
      ]),
    };
    console.log(data)
    return myAxios(url, method, data);
  },
};
