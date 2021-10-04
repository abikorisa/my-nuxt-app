//firestoreから商品を取得する
import firebase from '~/plugins/firebase'

export const state = () => ({
  itemList: [],
})

export const mutations = {
  fetchItemList(state, { id, item }) {
    item.itemId = id
    state.itemList.push(item)
  },
}

export const actions = {
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
}
