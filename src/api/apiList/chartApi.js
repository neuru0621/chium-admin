import myAxios from "@/api";

const method = "post";

export default {
  getBarChartInfo({ state, rootState }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/get_stats";
    const data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          PARAM_YEAR: state.calendarBar.nowYear,
          PARAM_MONTH: state.calendarBar.nowMonth,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  getSido({ rootState }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/get_sido";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          REGION_CODE: null,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  getCertenSidoOrSigungu({ rootState, state }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/get_region_stats";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          REGION_CODE: state.sidoBar.regionCode,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
};
