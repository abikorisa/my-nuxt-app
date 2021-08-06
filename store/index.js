import firebase from '~/plugins/firebase'
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state() {
      return {
        flag: true,
        login_user: null,
        cartItems: [],
      }
    },
    getters: {
      uid: (state) => (state.login_user ? state.login_user.uid : null),
    },
    mutations: {
      setLoginUser(state, user) {
        state.login_user = user
      },
      deleteLoginUser(state) {
        state.login_user = null
      },
      addItemToCart(state, item) {
        state.cartItems.push(item)
      },
    },
    actions: {
      logout() {
        firebase.auth().signOut()
      },
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
      loginUser({ commit }, { email, password }) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            let user = firebase.auth().currentUser
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
      addItemToCart({ commit }, item) {
        commit('addItemToCart', item)
      },
    },
  })
}

export default createStore
