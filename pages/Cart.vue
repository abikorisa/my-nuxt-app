<template>
  <v-app>
    <v-container>
      <div v-if="showFlg">
        <h2 v-if="show">ショッピングカート</h2>
        <h2 v-else>注文内容確認</h2>
        <v-layout justify-center>
          <v-data-table
            hide-default-footer
            class="elevation-1"
            :headers="headers"
            :items="cartItems"
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
            <template v-slot:[`item.delete`]="{ item }">
              <v-btn
                v-if="show"
                @click="deleteConfirm(item.id)"
                color="error"
                rounded
                ><strong>削除</strong></v-btn
              >
            </template>
          </v-data-table>
        </v-layout>
        <v-layout justify-center>
          <v-btn to="/">お買い物を続ける</v-btn>
          <v-btn @click="loginCheck()">注文にすすむ</v-btn>
        </v-layout>
        <v-layout justify-center>
          <OrderForm v-show="!show" />
        </v-layout>
      </div>
      <div v-else>
        <h3>商品はありません</h3>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
import OrderForm from '@/components/molecules/OrderForm.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    Button,
    OrderForm,
  },
  created() {
    if (this.$store.state.cartItems == null) {
      this.showFlg = false
    } else {
      let cartItemsList = this.$store.state.cartItems
      this.cartItems = cartItemsList.itemInfo
      this.showFlg = true
    }
  },
  data() {
    return {
      headers: [
        { text: '', value: 'img1' },
        { text: '商品名', value: 'itemName' },
        { text: '価格(税抜)', value: 'itemPrice' },
        { text: '数量', value: 'itemNum' },
        { text: '小計(税抜)', value: 'sum' },
        { value: 'delete', sortable: false },
      ],
      cartItems: [],
      tax: 0.1,
      show: true,
      showFlg: true,
    }
  },
  methods: {
    ...mapActions(['deleteItemFromCart']),
    deleteConfirm(id) {
      confirm('削除してもよろしいですか？')
      this.deleteItemFromCart({ id: id })
    },
    loginCheck() {
      if (this.$store.getters.uid) {
        this.show = !this.show
      } else {
        this.$router.push('/Login')
      }
    },
  },
  /* destroyed() {
    this.updateOrderList()
  } */
}
</script>
