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
          :items="items"
        >
          <template v-slot:[`item.img`]="{ item }">
            <img :src="item.img" width="100px" />
          </template>
          <template v-slot:[`item.price`]="{ item }">
            <td>{{ item.price.toLocaleString('ja-JP') }}円</td>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-btn
              v-if="show"
              @click="deleteConfirm(item.cartId)"
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
  data() {
    return {
      show: true,
      headers: [
        {
          text: '',
          img: 'img',
          value: 'img',
        },
        {
          name: '商品名',
          text: '商品名',
          value: 'name',
        },
        {
          price: '価格',
          text: '価格',
          value: 'price',
        },
        {
          num: '個数',
          text: '個数',
          value: 'num',
        },
        { value: 'delete', sortable: false },
      ],
      items: [
        /*         {
          id: 1,
          name: 'オーバオールワンピース',
          price: 4300,
          img: require('../../ec-img/1/01.jpeg'),
          num: 1,
        },
        {
          id: 2,
          name: 'オーバオールワンピース',
          price: 4300,
          img: require('../../ec-img/1/01.jpeg'),
          num: 1,
        }, */
      ],
    }
  },
  methods: {
    CartItems() {
      if (this.$store.state.cartItems) {
        let cartItems = this.$store.state.cartItems
        console.log(cartItems.doc)
      }
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
