<template>
  <v-app>
    <v-container>
      <h2>注文履歴</h2>
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
        </v-data-table>
      </v-layout>
      <v-layout justify-center>
        <v-btn @click="CartItems()">動いてる？</v-btn>
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
      cartItems: [
        {
          id: 1,
          itemName: 'オーバオールワンピース',
          itemPrice: 4300,
          img1: require('../../ec-img/9/25.jpeg'),
          itemText:
            'シンプルでコーディネイトしやすいロングワンピースを紹介します！ シンプルなデザインにさらっとした素材感がポイントのワンピースです。すっきりAラインのマキシ丈で、自然に体型カバーもしてくれます。普段使いしやすいデザインとカラーで、デイリーに楽しむことのできるおすすめのワンピースです！',
        },
      ],
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
