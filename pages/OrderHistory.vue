<template>
  <v-app>
    <v-container>
      <h2>注文履歴</h2>
      <v-layout justify-center>
        <v-data-table
          hide-default-footer
          class="elevation-1"
          :headers="headers"
          :items="orderdItem"
        >
          <template v-slot:[`item.img1`]="{ item }">
            <img :src="item.img1" width="100px" />
          </template>
          <template v-slot:[`item.itemPrice`]="{ item }">
            <td>{{ item.itemPrice.toLocaleString('ja-JP') }}円</td>
          </template>
          <template v-slot:[`item.itemNum`]="{ item }">
            <td>{{ item.itemNum }}個</td>
          </template>
          <template v-slot:[`item.sum`]="{ item }">
            <td>
              {{ (item.itemPrice * item.itemNum).toLocaleString('ja-JP') }}円
            </td>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted() {
    this.fetchOrderList()
    let orderedItems = this.$store.state.orderedItems
    orderedItems.forEach((order) => {
      order.itemInfo.forEach((item) => {
        this.orderdItem.push(item)
      })
    })
  },
  data() {
    return {
      show: true,
      headers: [
        { text: '', value: 'img1' },
        { text: '商品名', value: 'itemName' },
        { text: '価格(税抜)', value: 'itemPrice' },
        { text: '数量', value: 'itemNum' },
        { text: '小計(税抜)', value: 'sum' },
      ],
      orderdItem: [],
      cancelFlg: true,
    }
  },
  methods: {
    ...mapActions(['updateOrderedList', 'fetchOrderList']),
    loginCheck() {
      if (this.$store.getters.uid) {
        this.show = !this.show
      } else {
        this.$router.push('/Login')
      }
    },
    deleteConfirm() {
      confirm('削除してもよろしいですか？')
    },
  },
  destroyed() {
    this.updateOrderedList()
  },
}
</script>
