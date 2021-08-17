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
          <template v-slot:[`item.img1`]="{ item }">
            <img :src="item.img1" width="100px" />
          </template>
          <!-- <template v-slot:[`item.itemPrice`]="{ item }">
            <td>{{ item.itemPrice.toLocaleString('ja-JP') }}円</td>
          </template> -->
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
import { mapActions } from 'vuex'

export default {
  components: {
    Button,
    OrderForm,
  },
  created() {
    //これだとリロードするとエラーになってしまう・・・
    this.cartItems = this.$store.state.cartItems.itemInfo
  },
  data() {
    return {
      show: true,
      headers: [
        {
          text: '',
          value: 'img1',
          sortable: false,
        },
        {
          text: '商品名',
          value: 'itemName',
        },
        {
          text: '価格',
          value: 'itemPrice',
        },
        { value: 'delete', sortable: false },
      ],
      cartItems: [],
    }
  },
  computed: {
    cartLength() {
      if (this.$store.state.cartItems) {
        this.cartItems = this.$store.state.cartItems
        if (cartItems.itemInfo.length === 0) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    },
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
