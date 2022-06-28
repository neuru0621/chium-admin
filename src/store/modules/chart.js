import chartApi from "@/api/apiList/chartApi";

// 시도 시군구 세팅하는 곳
const sidoSetFun = (stats, commit) => {
  let emptyEmiArr = [];
  let emptyColArr = [];
  let tempSet = new Set();
  for (const stat of stats) {
    tempSet.add(stat.REGION);
    emptyEmiArr.push(stat.EMI);
    emptyColArr.push(stat.COL);
  }
  commit("setSidoOrSigunguEmit", emptyEmiArr);
  commit("setSidoOrSigunguCol", emptyColArr);
  commit("setSidoOrSigungu", tempSet);
};

export default {
  namespaced: true,
  state: {
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ BarChart @@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    calendarBar: {
      // 현재 2022년이므로 일단 고정
      nowYear: new Date().getFullYear(),
      // 선택된 월
      nowMonth: null,
      // 자료가 있는 월만 표시
      barMonth: [],
      // 1월부터 12월까지 배출자를 표시하기 위한 세팅
      barEmitMonth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 1월부터 12월까지 수거자를 표시하기 위한 세팅
      barColMonth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 1일 부터 28 ~ 31일 까지 배출자를 보여주기 위한 라벨 세팅
      barEmitDay: [],
      // 1일 부터 28 ~ 31일 까지 수거자를 보여주기 위한 라벨 세팅
      barColDay: [],
      // 보통 mounted에 값을 설정하고 getter을 사용하면,
      // getter의 값은 undefined 라고 나오기 때문에, mounted에 사용하지 않고
      // getter을 바로 값에 대입하였음
      // 1일 부터 28 ~ 31일 까지 수거자를 보여주기 위한 데이터 세팅
      barTotalDay: [""],
      // 전체인지, 특정 월을 선택한 것인지, true면 전체, false면 특정 월
      isYearOrMonth: true,
    },
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ SidoBarChart@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    sidoBar: {
      // 지금 체크된 지역 (시도)
      nowChecked: null,
      // region code 받기 위해 초기값 설정
      geonkuk: null,
      // 배출자
      emitter: [],
      // 수거자
      collector: [],
      // 라벨에 붙일 시도 or 시군구
      sidoOrSigungu: [],
      // db에 요청 보낼 code
      regionCode: null,
    },
  },
  getters: {
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ BarChart @@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    // 타이틀 가져오기
    getTitle(state, getters) {
      if (getters.getNowMonth == ( null || '전체' )) {
        return `${getters.getNowYear}년 수거자 배출자 등록 현황`;
      }
      return `${getters.getNowYear}년 ${getters.getNowMonth}월 수거자 배출자 등록 현황`;
    },
    // 선택된 현재 년도 가져오기
    getNowYear(state) {
      return state.calendarBar.nowYear;
    },
    // 선택된 현재 월 가져오기
    getNowMonth(state) {
      if (state.calendarBar.nowMonth == null){
        return '전체'
      }
      return state.calendarBar.nowMonth;
    },
    // 선택된 현재 월(1일~31일)의 배출자, 수거자 수가 들어있는 obj 반환
    getEmitColDay(state) {
      return {
        emit: state.calendarBar.barEmitDay,
        col: state.calendarBar.barColDay,
      };
    },
    // 데이터가 있는 월 가져오기 null은 전체로 변환
    getBarMonth(state) {
      const monthArr = state.calendarBar.barMonth.map((v) => {
        if (v == null) return 0;
        else return v;
      });
      monthArr.sort()
      monthArr[0] = '전체'
      return monthArr
    },
    // 선택된 현재 년도(1월~12월)의 배출자, 수거자 수가 들어있는 obj 반환
    getEmitColMonth(state) {
      return {
        emit: state.calendarBar.barEmitMonth,
        col: state.calendarBar.barColMonth,
      };
    },
    // 차트 하단에 '1일' '2일'을 표시하기 위한 배열
    getBarTotalDay(state) {
      return state.calendarBar.barTotalDay;
    },
    // 차트 하단에 '1월' '2월'을 표시하기 위한 배열
    getBarTotalMonth() {
      return [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ];
    },
    // 데이터 가져오는 역할
    getDataSet(state, getters) {
      // '전체'를 클릭한 경우에 isYearOrMonth는 true
      if (state.calendarBar.isYearOrMonth) {
        return {
          labels: getters.getBarTotalMonth,
          datasets: [
            {
              label: "배출자",
              backgroundColor: "#1868c1",
              data: getters.getEmitColMonth.emit,
            },
            {
              label: "수거자",
              backgroundColor: "#01b286",
              data: getters.getEmitColMonth.col,
            },
          ],
        };
      }
      // 특정 '월'을 클릭한 경우에 isYearOrMonth는 false
      return {
        labels: getters.getBarTotalDay,
        datasets: [
          {
            label: "배출자",
            backgroundColor: "#1868c1",
            data: getters.getEmitColDay.emit,
          },
          {
            label: "수거자",
            backgroundColor: "#01b286",
            data: getters.getEmitColDay.col,
          },
        ],
      };
    },

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ SidoBarChart@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    // 시도 or 시군구 라벨 getter
    getSidoOrSigungu(state) {
      return state.sidoBar.sidoOrSigungu;
    },
    // 시도 or 시군구 배출자 getter
    getSidoOrSigunguEmit(state) {
      return state.sidoBar.emitter;
    },
    // 시도 or 시군구 수거자 getter
    getSidoOrSigunguCol(state) {
      return state.sidoBar.collector;
    },
    // 배출자, 수거자 데이터 getter
    getSidoOrSigunguDataSet(state, getters) {
      return {
        labels: getters.getSidoOrSigungu,
        datasets: [
          {
            label: "배출자",
            backgroundColor: "#1868c1",
            data: getters.getSidoOrSigunguEmit,
          },
          {
            label: "수거자",
            backgroundColor: "#01b286",
            data: getters.getSidoOrSigunguCol,
          },
        ],
      };
    },
    // 전국 데이터 ( B_CODE, SI_DO 정보)
    getGeonKuk(state) {
      return state.sidoBar.geonkuk;
    },
    // Sido chart title getter
    getSidoTitle(state) {
      if (state.sidoBar.nowChecked == null) {
        return "전국 수거자 배출자 등록현황";
      } else {
        return `${state.sidoBar.nowChecked} 수거자 배출자 등록현황`;
      }
    },
    // 시도 어떤 것이 체크 되어 있는지
    getNowChecked(state) {
      if (state.sidoBar.nowChecked == null) {
        return "전국";
      }
      return state.sidoBar.nowChecked;
    },
  },
  mutations: {
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ BarChart @@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    setNowYear(state, payload) {
      state.calendarBar.nowYear = payload;
    },
    setNowMonth(state, payload) {
      state.calendarBar.nowMonth = payload;
    },
    setBarEmitMonth(state, payload) {
      state.calendarBar.barEmitMonth = payload;
    },
    setBarColMonth(state, payload) {
      state.calendarBar.barColMonth = payload;
    },
    setBarEmitDay(state, payload) {
      state.calendarBar.barEmitDay = payload;
    },
    setBarColDay(state, payload) {
      state.calendarBar.barColDay = payload;
    },
    setMonth(state, payload) {
      state.calendarBar.barMonth = [...payload];
      // '전체'를 표시하기 위한 위한 null값
      state.calendarBar.barMonth.unshift(null);
    },
    setBarTotalDay(state, payload) {
      state.calendarBar.barTotalDay = payload;
    },
    setIsYearOrMonth(state, payload) {
      state.calendarBar.isYearOrMonth = payload;
    },

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ SidoBarChart@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


    setSidoOrSigunguEmit(state, payload) {
      state.sidoBar.emitter = [...payload];
    },
    setSidoOrSigunguCol(state, payload) {
      state.sidoBar.collector = [...payload];
    },
    setSidoOrSigungu(state, payload) {
      state.sidoBar.sidoOrSigungu = [...payload];
    },
    setGeonKuk(state, payload) {
      state.sidoBar.geonkuk = [...payload];
      state.sidoBar.geonkuk.unshift(null);
    },
    setNowChecked(state, payload) {
      state.sidoBar.nowChecked = payload;
    },
    // b_code 를 골라내기 위함
    setRegionCode(state, payload) {
      const gk = [...state.sidoBar.geonkuk];
      let rc;
      gk.map((v) => {
        if (v != null && v.SI_DO == payload) {
          rc = v.B_CODE;
        }
      });
      if (rc == undefined) {
        state.sidoBar.regionCode = null;
        return;
      }
      state.sidoBar.regionCode = String(rc);
    },
  },
  actions: {


    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ BarChart @@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


    async getBarChartInfo({ rootState, commit, state }) {
      try {
        // 1월 ~ 12월까지의 마지막 날, 인덱싱을 위해 첫 월은 0으로 지정
        const lastDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const res = await chartApi.getBarChartInfo({state, rootState});
        const inputMonth = res.data.data[0].INPUT_PARAM[0].PARAM_MONTH;
        const stats = res.data.data[0].STAT;


        // 년 단위 (전체 클릭 한 경우)
        if (inputMonth == null) {
          // ex) 2022년 전체를 클릭하면 전체의 값이 null이기 때문에
          // 1 ~ 12월의 데이터가 들어온다.
          // 아래는 배출자 수거자의 값이 들어오고,
          let yearEmi = [];
          let yearCol = [];
          // setMonth에는 값이 들어있는 월만 중복되지 않도록 들어온다.
          // ex ) 3 3 4 5 라면 3,4,5월만 들어있음
          let setMonth = new Set();
          // 인덱싱을 위해서 0을 넣어둠
          for (let i = 0; i < 12; i++) {
            yearEmi.push(0);
            yearCol.push(0);
          }
          // 반복문을 돌려가면서 배출자인지 수거자인지 판별하여 값을 입력
          for (const stat of stats) {
            const month = stat.PARAM_MONTH - 1;
            const num = stat.QTY;
            if (stat.USER_TYPE == 2) {
              yearEmi[month] = num;
            } else {
              yearCol[month] = num;
            }
            setMonth.add(stat.PARAM_MONTH);
          }
          // 세팅
          commit("setMonth", setMonth);
          commit("setBarEmitMonth", yearEmi);
          commit("setBarColMonth", yearCol);
          commit("setIsYearOrMonth", true);


          // 월 단위 (월 클릭한 경우)
        } else {
          // 위와 마찬가지
          let monthEmi = [];
          let monthCol = [];
          let setBarTotalDay = [];
          // 마지막 날이 월마다 다르기 때문에 일정하지 않음
          for (let i = 0; i < lastDay[inputMonth]; i++) {
            // 1을 더해주는 이유는 1일부터 시작하기 때문
            setBarTotalDay.push(i + 1);
            monthEmi.push(0);
            monthCol.push(0);
          }
          setBarTotalDay = setBarTotalDay.map((v) => {
            return String(v) + "일";
          });
          commit("setBarTotalDay", setBarTotalDay);
          // 반복문을 돌려 수거자 배출자인지에 따라서 분리하여 입력
          for (const stat of stats) {
            const day = stat.PARAM_DAY - 1;
            const num = stat.QTY;
            if (stat.USER_TYPE == 2) {
              monthEmi[day] = num;
            } else {
              monthCol[day] = num;
            }
          }
          // 세팅
          commit("setBarEmitDay", monthEmi);
          commit("setBarColDay", monthCol);
          commit("setIsYearOrMonth", false);
        }
      } catch (e) {
        console.log(e);
      }
    },


    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@ SidoBarChart@@@@@@@@@@@@@@@@@@@@@@@
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    // 시도 정보 가져옴
    async getSido({ rootState, commit }) {
      try{
        const res = await chartApi.getSido({rootState})
        commit("setGeonKuk", res.data.data);
      } catch (e){
        console.log(e)
      }
    },
    // 시군구 정보를 가져옴
    async getCertenSidoOrSigungu({ rootState, state, commit }) {
      let res
      try{
        res = await chartApi.getCertenSidoOrSigungu({rootState, state});
      }
      catch (e) {
        console.log(e)
      }
      const stats = res.data.data[0].STAT;
      // 전국 시/도 기준
      if (state.sidoBar.regionCode == null) {
        sidoSetFun(stats, commit);
        // 시군구 시군
      } else {
        //세종일 때 널들어옴
        if (stats != null) {
          sidoSetFun(stats, commit);
        }
      }
    },
  },
};
