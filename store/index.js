import firebase from '~/plugins/firebase'
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state() {
      return {
        flag: true,
        login_user: null,
        cartItems: null,
        itemList: [],
        orderedItems: [],
      }
    },
    getters: {
      uid: (state) => (state.login_user ? state.login_user.uid : null),
      orderId: (state) => (state.cartItems ? state.cartItems.orderId : null),
    },
    mutations: {
      //ログイン関連処理
      setLoginUser(state, user) {
        state.login_user = user
      },
      deleteLoginUser(state) {
        state.login_user = null
      },
      //取得した商品情報をローカルでも保持
      fetchItemList(state, { id, item }) {
        item.itemId = id
        state.itemList.push(item)
      },
      //カート追加処理
      addItemToCart(state, { orderId, order }) {
        state.cartItems = order
        state.cartItems.orderId = orderId
        console.log(state.cartItems.itemInfo)
      },
      addItemToCartForNoUser(state, itemInfo) {
        let cartItems = state.cartItems
        cartItems.itemInfo.push(itemInfo)
      },
      addItemToOrderedItems(state, { orderId, order }) {
        order.orderId = orderId
        state.orderedItems.push(order)
      },
      fetchOrderList(state, { id, order }) {
        order.orderId = id //20桁のid
        state.cartItems = order.itemInfo
      },
      updateItemList(state) {
        state.itemList = []
      },
      updateOrderList(state) {
        state.cartItems = []
      },
      updateOrderedList(state) {
        state.orderedItems = []
      },
      //カートの中から商品を削除する処理
      deleteCartItem(state, index) {
        let cartItems = state.cartItems
        cartItems.itemInfo.splice(index, 1)
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
      addItemToCart({ state, getters, commit }, item) {
        function getUniqueStr(myStrong) {
          var strong = 1000
          if (myStrong) strong = myStrong
          return (
            new Date().getTime().toString(16) +
            Math.floor(strong * Math.random()).toString(16)
          )
        }
        let itemInfo = item
        ;(itemInfo.id = getUniqueStr()), (itemInfo.itemId = item.itemId)
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
                commit('addItemToCart', {
                  orderId: getters.orderId,
                  order: newCartItems,
                })
                console.log('既存のordersに追加しました')
              })
          } else if (getters.orderId === null) {
            firebase
              .firestore()
              .collection(`users/${getters.uid}/orders`)
              .add(order)
              .then((doc) => {
                commit('addItemToCart', { orderId: doc.id, order: order })
                console.log('あたらしくordersを作成しました')
              })
          }
          //ログアウトの処理分岐
        } else {
          if (state.cartItems) {
            console.log(state.cartItems)
            commit('addItemToCartForNoUser', itemInfo)
          } else {
            commit('addItemToCart', { order: order })
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
          console.log(a)
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
      orderConfirm({ state, getters, commit }, { order }) {
        if (getters.uid) {
          firebase
            .firestore()
            .collection(`users/${getters.uid}/orders`)
            .doc(getters.orderId)
            .update(order)
            .then(() => {
              state.cartItems = null
              commit('addItemToOrderedItems', {
                orderId: order.orderId,
                order: order,
              })
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
      //firestore内のカート情報を取得
      fetchOrderList({ state, getters, commit }) {
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
                } else {
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
    },
  })
}

export default createStore
