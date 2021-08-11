<template>
  <v-app>
    <v-container>
      <h2 v-if="show">ショッピングカート</h2>
      <h2 v-else>注文内容確認</h2>
      <v-layout justify-center>
        <v-data-table
          hide-default-footer
          class="elevation-1"
          :headers="headers"
          :items="cartItems"
        >
          <template v-slot:[`cartItems.img1`]="{ cartItems }">
            <img :src="cartItems.img1" width="100px" />
          </template>
          <template v-slot:[`cartItems.itemPrice`]="{ cartItems }">
            <td>{{ cartItems.itemPrice.toLocaleString('ja-JP') }}円</td>
          </template>
          <template v-slot:[`cartItems.delete`]="{ cartItems }">
            <v-btn
              v-if="show"
              @click="deleteConfirm(cartItems.id)"
              color="error"
              rounded
              ><strong>削除</strong></v-btn
            >
          </template>
        </v-data-table>
      </v-layout>
      <v-layout justify-center>
        <v-btn @click="CartItems()">動いてる？</v-btn>
        <v-btn @click="loginCheck()">注文にすすむ</v-btn>
      </v-layout>
      <v-layout justify-center>
        <OrderForm v-show="!show" />
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
import OrderForm from '@/components/molecules/OrderForm.vue'

export default {
  components: {
    Button,
    OrderForm,
  },
  created() {
    this.cartItems = this.$store.state.cartItems
  },
  data() {
    return {
      show: true,
      headers: [
        {
          text: '',
          value: 'img1',
        },
        {
          text: '商品名',
          value: 'itemName',
        },
        {
          text: '価格',
          value: 'itemPrice',
        },
        {
          text: '個数',
          value: 'num',
        },
        { value: 'delete', sortable: false },
      ],
      cartItems: [],
    }
  },
  methods: {
    CartItems() {
      console.log(this.cartItems)
    },
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
}
</script>
