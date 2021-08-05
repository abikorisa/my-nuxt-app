import Vuex from 'vuex'
import firebase from '~/plugins/firebase'

export const createStore = () => {
  return new Vuex.Store({
    state: {
      flag: true,
      login_user: null,
    },
    mutations: {
      setLoginUser(state, user) {
        state.login_user = user
      },
      deleteLoginUser(state) {
        state.login_user = null
      },
    },
    actions: {
      logout() {
        firebase.auth().signOut()
      },
      /* 新規ユーザ登録 */
      resisterUser({ commit }, { email, password }) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            let user = firebase.auth().currentUser
            commit('setLoginUser', user)
            console.log('新規会員登録ができました！')
          })
          .catch((error) => {
            let errorMessage = error.message
          })
      },
      loginUser({ state, commit }, { email, password }) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            commit('setLoginUser', user)
            console.log('ログインに成功しました！')
          })
          .catch((error) => {
            let errorMessage = error.message
          })
      },
      setLoginUser({ commit }, user) {
        commit('setLoginUser', user)
      },
      deleteLoginUser({ commit }) {
        commit('deleteLoginUser')
      },
    },
    getters: {
      uid: (state) => (state.login_user ? state.login_user.uid : null),
    },
  })
}
export default createStore
