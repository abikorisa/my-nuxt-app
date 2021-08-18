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
      setLoginUser(state, user) {
        state.login_user = user
      },
      deleteLoginUser(state) {
        state.login_user = null
      },
      //取得した商品情報をローカルでも保持
      fetchItemList(state, { id, item }) {
        item.itemId = id
        //itemListを配列で管理していないので以下の処理が必要
        state.itemList.push(item)
      },
      //カート追加処理
      addItemToCart(state, { orderId, order }) {
        /* order.orderId = orderId */
        state.cartItems = order
        state.cartItems.orderId = orderId
        //下記はオブジェクトになっている
        console.log(state.cartItems.itemInfo)
      },
      addItemToOrderedItems(state, { orderId, order }) {
        order.orderId = orderId
        //ここにpushがあるからどんどんついかされてしまう
        //下記処理を入れると1つめを追加したのちに消されてしまう
        /* state.orderedItems = [] */
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
      addItemToCart({ state, getters, commit }, item) {
        //引数で受け取ったitem(obj)をitemInfoのなかにいれる
        let order = {
          userId: getters.uid,
          itemInfo: [item],
          status: 0,
        }
        console.log(order)
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
              //引数のidを20桁のものに、itemを一番簡易なオブジェクトに置き換えている
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
                  console.log(doc.id)
                  commit('addItemToCart', {
                    orderId: doc.id,
                    order: doc.data(),
                  })
                } else {
                  //status:0も1もあるときに下記処理を加えるとNG
                  //state.cartItems = null
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
      deleteItemFromCart({ commit }) {
        commit('deleteItemFromCart')
      },
    },
  })
}

export default createStore
