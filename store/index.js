import firebase from '~/plugins/firebase'
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state() {
      return {
        flag: true,
        loginError: false,
        login_user: null,
        cartItems: null,
        itemList: [],
        orderedItems: [],
        orderedLength0: false,
        cartLength: true,
      }
    },
    getters: {
      uid: (state) => (state.login_user ? state.login_user.uid : null),
      orderId: (state) => (state.cartItems ? state.cartItems.orderId : null),
    },
    mutations: {
      // -----認証処理------------------------------------------
      setLoginUser(state, user) {
        state.login_user = user
      },
      deleteLoginUser(state) {
        state.login_user = null
      },
      // -----商品取得処理------------------------------------
      fetchItemList(state, { id, item }) {
        item.itemId = id
        state.itemList.push(item)
      },
      // -----カート追加処理------------------------------------
      addItemToCart(state, { orderId, order }) {
        order.orderId = orderId
        state.cartItems = order
        state.cartLength0 = false
      },
      addItemToOrderedItems(state, { orderId, order }) {
        order.orderId = orderId
        state.orderedItems.push(order)
        state.orderedLength = true
      },
      updateItemList(state) {
        state.itemList = []
      },
      updateOrderList(state) {
        state.cartItems = null
      },
      updateOrderedList(state) {
        state.orderedItems = []
      },
      //カートの中から商品を削除する処理
      deleteCartItem(state, index) {
        let cartItems = state.cartItems
        cartItems.itemInfo.splice(index, 1)
        if (cartItems.itemInfo.length === 0) {
          state.cartLength = false
          console.log('cartLengthをfalseにしました')
        }
      },
      orderdLength(state) {
        state.orderedLength = true
      },
    },
    actions: {
      // -----認証処理------------------------------------------
      logout() {
        firebase.auth().signOut()
      },
      resisterUser({ state, commit }, { email, password }) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            let user = firebase.auth().currentUser
            commit('setLoginUser', user)
          })
          .catch(() => {
            state.loginError = true
          })
      },
      loginUser({ commit }, { email, password }) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            let user = firebase.auth().currentUser
            commit('setLoginUser', user)
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
      // -----カート追加処理------------------------------------------
      addItemToCart({ state, getters, commit }, item) {
        function getUniqueStr(myStrong) {
          let strong = 1000
          if (myStrong) strong = myStrong
          return (
            new Date().getTime().toString(16) +
            Math.floor(strong * Math.random()).toString(16)
          )
        }
        item.id = getUniqueStr()
        let order = {
          userId: getters.uid,
          itemInfo: [item],
          status: 0,
        }
        if (getters.uid) {
          if (getters.orderId) {
            let newCartItems = state.cartItems
            newCartItems.itemInfo.push(item)
            firebase
              .firestore()
              .collection(`users/${getters.uid}/orders`)
              .doc(getters.orderId)
              .update({ itemInfo: [...newCartItems.itemInfo] })
              .then(() => {
                console.log(getters.orderId)
                commit('addItemToCart', {
                  orderId: getters.orderId,
                  order: newCartItems,
                })
              })
            console.log('既にあるorderに追加しました')
          } else if (getters.orderId == null) {
            firebase
              .firestore()
              .collection(`users/${getters.uid}/orders`)
              .add(order)
              .then((doc) => {
                console.log(doc.id)
                commit('addItemToCart', { orderId: doc.id, order: order })
              })
            console.log('新しくorderを作成しました')
          }
        }
      },
      //カートから商品を削除する
      deleteItemFromCart({ state, getters, commit }, { id }) {
        console.log(`削除しようとしている商品id${id}`)
        if (getters.uid) {
          let cartItems = state.cartItems
          let a = JSON.stringify(cartItems.itemInfo)
          a = JSON.parse(a)
          const item = a.find((item) => item.id === id)
          const index = a.indexOf(item)
          a.splice(index, 1)
          firebase
            .firestore()
            .collection(`users/${getters.uid}/orders`)
            .doc(getters.orderId)
            .update({
              itemInfo: [...a],
            })
            .then(() => {
              commit('deleteCartItem', index)
            })
        } else {
          let cartItems = state.cartItems
          let a = JSON.stringify(cartItems.itemInfo)
          a = JSON.parse(a)
          const item = a.find((item) => item.id === id)
          const index = a.indexOf(item)
          commit('deleteCartItem', index)
          commit('updateOrderList')
        }
      },
      //注文処理、引数orderInfo(obj)で入力データを取得してます
      orderConfirm({ getters, commit }, { order }) {
        if (getters.uid) {
          firebase
            .firestore()
            .collection(`users/${getters.uid}/orders`)
            .doc(getters.orderId)
            .update(order)
            .then(() => {
              console.log(order)
              /* commit('addItemToOrderedItems', {
                orderId: getters.orderId,
                order: order,
              }) */
              commit('updateOrderList')
            })
        }
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
      async fetchItemList({ commit }) {
        await firebase
          .firestore()
          .collection(`admin/3y7ewoyuQyNLROHoc1TcOZK0IqM2/itemList`)
          .get()
          .then((snapShot) => {
            snapShot.forEach((doc) => {
              commit('fetchItemList', { id: doc.id, item: doc.data() })
            })
          })
      },
      //firestore内のカート情報を取得
      fetchCartList({ getters, commit }) {
        if (getters.uid) {
          firebase
            .firestore()
            .collection(`users/${getters.uid}/orders`)
            .get()
            .then((snapShot) => {
              snapShot.forEach((doc) => {
                if (doc.data().status === 0) {
                  commit('addItemToCart', {
                    orderId: doc.id,
                    order: doc.data(),
                  })
                }
              })
            })
        }
      },
      fetchOrderList({ getters, commit }) {
        if (getters.uid) {
          firebase
            .firestore()
            .collection(`users/${getters.uid}/orders`)
            .get()
            .then((snapShot) => {
              snapShot.forEach((doc) => {
                if (doc.data().status === 1) {
                  console.log('履歴を取得しました')
                  commit('addItemToOrderedItems', {
                    orderId: doc.id,
                    order: doc.data(),
                  })
                }
              })
            })
        }
      },
      updateItemList({ commit }) {
        commit('updateItemList')
      },
      updateOrderList({ commit }) {
        commit('updateOrderList')
      },
      updateOrderedList({ commit }) {
        commit('updateOrderedList')
      },
      clearItems({ commit }) {
        commit('updateItemList')
        commit('updateOrderList')
        commit('updateOrderedList')
      },
    },
  })
}

export default createStore
