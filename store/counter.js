export default counter = {
  namespaced: true, // 追加
  state: {
    count: 2,
  },
  getters: {
    count: (state) => state.count,
  },
  actions: {
    increment(state) {
      state.count++
    },
  },
  mutations: {
    increment({ commit }) {
      commit('increment')
    },
  },
}
