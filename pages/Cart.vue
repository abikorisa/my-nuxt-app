<template>
  <v-app>
    <v-container>
      <div v-if="showFlg">
        <h2 v-if="show">ショッピングカート</h2>
        <h2 v-else>注文内容確認</h2>
        <!--       <v-col class="d-flex" cols="1" sm="1">
        <v-select
          :items="itemNum"
          item-text="selectNum"
          dense
          outlined
        ></v-select>
      </v-col> -->
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
                @click="deleteConfirm(item.index)"
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
    //どこになんの処理を書くか処理の流れを追うのめちゃくちゃ大事
    if (this.$store.state.cartItems == null) {
      this.showFlg = false
    } else {
      let cartItemsList = this.$store.state.cartItems
      let cartItems = cartItemsList.itemInfo
      this.cartItems = cartItems
      console.log(this.cartItems.itemNum)
      this.showFlg = true
    }
  },
  data() {
    return {
      show: true,
      headers: [
        { text: '', value: 'img1' },
        { text: '商品名', value: 'itemName' },
        { text: '価格(税抜)', value: 'itemPrice' },
        { text: '数量', value: 'itemNum ' },
        { text: '小計', value: 'sum' },
        { value: 'delete', sortable: false },
      ],
      cartItems: [],
      tax: 0.1,
      showFlg: true,
    }
  },
  methods: {
    deleteConfirm() {
      confirm('削除してもよろしいですか？')
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
