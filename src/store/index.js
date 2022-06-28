import Vue from "vue";
import Vuex from "vuex";
import common from "./modules/common";
import emitterCollector from "./modules/emitterCollector";
import auth from "./modules/auth";
import chart from "./modules/chart";
import selectedUser from "./modules/selectedUser";
import emissions from "./modules/emissions";
import biddings from "./modules/biddings";
import transaction from "./modules/transaction";
import report from "./modules/report";
import log from "./modules/log";
import notMember from "./modules/notMember";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["auth", "selectedUser", "common"],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  modules: {
    chart,
    common,
    emitterCollector,
    selectedUser,
    auth,
    emissions,
    biddings,
    transaction,
    report,
    log,
    notMember
  },
});
