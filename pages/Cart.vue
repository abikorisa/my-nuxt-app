<template>
  <div class="wrapper">
    <div class="list-element">
      <div class="title__tag" v-if="changeFlg"><h3>カート</h3></div>
      <div class="title__tag" v-else><h3>注文フォーム</h3></div>
      <div class="head">
        <p class="head__label--img">商品</p>
        <p class="head__label">価格(税抜)</p>
        <p class="head__label">数量</p>
        <p class="head__label">小計</p>
        <p v-if="deleteFlg" class="head__label">-</p>
      </div>
      <ul class="cart-list" v-for="item in cartItems" :key="item.index">
        <li>
          <div class="items">
            <div class="items__label--img">
              <img :src="item.img1" width="100px" />
              <p class="items__itemName">{{ item.itemName }}</p>
            </div>
            <div class="items__label">
              <p class="items__num">
                {{ item.itemPrice.toLocaleString('ja-JP') }}円
              </p>
            </div>
            <div class="items__label">
              <p class="items__num">{{ item.itemNum }}個</p>
            </div>
            <div class="items__label bold-font">
              <p class="items__num">
                {{ (item.itemPrice * item.itemNum).toLocaleString('ja-JP') }}円
              </p>
            </div>
            <div v-if="deleteFlg" class="items__label">
              <button @click="deleteConfirm(item.id)">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div class="total-price">
        <div class="total-price__left">
          <p>小計(税抜)</p>
          <p>消費税(10%対象)</p>
          <p class="font-bold">合計金額</p>
        </div>
        <div class="total-price__right">
          <p>{{ priceSum.toLocaleString('ja-JP') }}円</p>
          <p>{{ (priceSum * tax).toLocaleString('ja-JP') }}円</p>
          <p class="font-bold">
            {{
              Math.floor(priceSum + priceSum * tax).toLocaleString('ja-JP')
            }}円
          </p>
        </div>
      </div>
      <div class="list-element">
        <button
          v-if="!this.show"
          class="list-element__btn"
          @click="backToTop()"
        >
          <i class="fas fa-shopping-basket"></i>ショッピングを続ける
        </button>
        <button
          v-if="!this.show"
          class="list-element__btn"
          @click="loginCheck()"
        >
          <i class="fas fa-cash-register"></i>レジへ進む
        </button>
      </div>
    </div>
    <OrderForm v-if="this.show" />
  </div>
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
    this.fetchOrderList()
    if (this.$store.state.cartItems == null) {
      this.cartFlg = false
    } else {
      //this.$store.state.cartItemsはfirestoreと同じ形でデータを保持している
      let cartItemsList = this.$store.state.cartItems
      //そのため下記でitemInfoだけを取り出さないといけない
      this.cartItems = cartItemsList.itemInfo
      this.cartFlg = true
      this.deleteFlg = true
    }
  },
  data() {
    return {
      cartItems: [],
      tax: 0.1,
      show: false,
      cartFlg: true,
      deleteFlg: true,
      changeFlg: true,
    }
  },
  computed: {
    priceSum() {
      let sum = 0
      this.cartItems.forEach((item) => {
        sum += item.itemNum * item.itemPrice
      })
      return sum
    },
  },
  methods: {
    ...mapActions([
      'deleteItemFromCart',
      'updateOrderedList',
      'fetchOrderList',
    ]),
    deleteConfirm(id) {
      if (window.confirm('削除してもよろしいですか？')) {
        this.deleteItemFromCart({ id: id })
      }
    },
    loginCheck() {
      if (this.$store.getters.uid) {
        this.show = !this.show
        this.changeFlg = false
        this.deleteFlg = false
      } else {
        this.$router.push('/Login')
      }
    },
    backToTop() {
      this.$router.push('/')
    },
  },
  destroyed() {
    this.updateOrderedList()
  },
}
</script>

<style lang="scss">
@import 'https://use.fontawesome.com/releases/v5.13.0/css/all.css';

.list-element {
  width: 750px;
  margin: 40px auto;
  text-align: center;
  &__btn {
    display: inline-block;
    background-color: #666;
    color: #fff;
    border-radius: 5px;
    padding: 13px 30px;
    margin-right: 20px;
    font-weight: 700;
    font-size: 15px;
    transition: 0.3s;
    > i {
      padding-right: 10px;
      color: #fff;
    }
    &:hover {
      background-color: #ddd;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}

//ulに付与する
.items {
  border-bottom: 1px solid #ddd;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0 auto;
  &__label {
    padding: 5px 20px;
    margin: 0 1px;
    width: 200px;
    text-align: center;
    font-size: 14px;
    &--img {
      padding: 8px 20px;
      margin: 0 1px;
      width: 300px;
      text-align: center;
      font-size: 13px;
    }
  }
  &__itemName {
    margin: 0;
  }
  &__num {
    margin: 0;
  }
}
.head {
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0 auto;
  &__label {
    background-color: #f5f5f5;
    padding: 5px 20px;
    margin: 0 1px;
    width: 200px;
    text-align: center;
    font-size: 12px;
    &--img {
      background-color: #f5f5f5;
      padding: 5px 20px;
      margin: 0 1px;
      width: 300px;
      text-align: center;
      font-size: 12px;
    }
  }
}

ul.cart-list {
  list-style: none;
  padding: 0;
}

.total-price {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  padding-top: 15px;
  font-size: 13px;
  .font-bold {
    font-size: 15px;
    font-weight: bold;
  }
  &__left {
    > p {
      padding-bottom: 5px;
    }
  }
  &__right {
    padding-left: 35px;
    > p {
      padding-bottom: 5px;
    }
  }
}

.bold-font {
  font-weight: 700;
}

.title__tag {
  margin-bottom: 15px;
  &::after {
    margin: 0 auto;
    content: '';
    width: 150px;
    height: 3px;
    background-color: #e5e5e5;
    display: block; //下線部をひくための疑似要素
  }
}
</style>
