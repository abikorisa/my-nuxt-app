import firebase from '~/plugins/firebase'
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state() {
      return {
        flag: true,
        login_user: null,
        cartItems: [],
        itemList: [],
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
      //カート追加処理
      addItemToCart(state, item) {
        state.cartItems.push(item)
      },
      //取得した商品情報をローカルでも保持
      fetchItemList(state, { id, item }) {
        item.itemId = id
        state.itemList.push(item)
      },
      updateItemList(state) {
        state.itemList = []
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
      //カート追加処理
      addItemToCart({ commit }, item) {
        commit('addItemToCart', item)
      },
      //管理者画面・商品追加処理
      doAddItem({ commit }, item) {
        let storageRef = firebase
          .storage()
          .ref()
          .child(`images/${item.img1.name}`)
        storageRef.put(item.img1).then(() => {
          storageRef.getDownloadURL().then((url) => {
            item.img1 = url
            firebase
              .firestore()
              .collection(`admin/3y7ewoyuQyNLROHoc1TcOZK0IqM2/itemList`)
              .add(item)
              .then(() => {
                console.log('画像1登録完了')
              })
          })
        })
      },
      //firestore内の商品情報を取得
      fetchItemList({ commit }) {
        firebase
          .firestore()
          .collection(`admin/3y7ewoyuQyNLROHoc1TcOZK0IqM2/itemList`)
          .get()
          .then((snapShot) => {
            snapShot.forEach((doc) => {
              commit('fetchItemList', { id: doc.id, item: doc.data() })
            })
          })
      },
      updateItemList({ commit }) {
        commit('updateItemList')
      },
    },
  })
}

export default createStore
