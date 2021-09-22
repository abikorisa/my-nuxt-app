<template>
  <div class="wrapper">
    <div class="cart-element">
      <div class="head">
        <p class="head__label--img">商品</p>
        <p class="head__label">価格(税抜)</p>
        <p class="head__label">数量</p>
        <p class="head__label">小計</p>
        <p class="head__label">-</p>
      </div>
      <ul class="cart-list" v-for="item in cartItems" :key="item.index">
        <li>
          <div class="item">
            <div class="item__label--img">
              <img :src="item.img1" width="100px" />
              <p class="item__itemName">{{ item.itemName }}</p>
            </div>
            <div class="item__label">
              <p class="item__num">
                {{ item.itemPrice.toLocaleString('ja-JP') }}円
              </p>
            </div>
            <div class="item__label">
              <p class="item__num">{{ item.itemNum }}個</p>
            </div>
            <div class="item__label bold-font">
              <p class="item__num">
                {{ (item.itemPrice * item.itemNum).toLocaleString('ja-JP') }}円
              </p>
            </div>
            <div class="item__label">
              <button @click="deleteConfirm(item.id)">
                <i class="fas fa-trash-alt"></i>削除
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div class="total-price">
        <p>小計</p>
        <p>消費税</p>
        <p>注文合計:¥ 9,980</p>
      </div>
      <div class="cart-element">
        <button class="cart-element__btn" @click="backToTop()">
          <i class="fas fa-shopping-basket"></i>ショッピングを続ける
        </button>
        <button
          v-if="!this.show"
          class="cart-element__btn"
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
      show: false,
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
    backToTop() {
      this.$router.push('/')
    },
  },
  /* destroyed() {
    this.updateOrderList()
  } */
}
</script>

<style scoped lang="scss">
@import 'https://use.fontawesome.com/releases/v5.13.0/css/all.css';

.cart-element {
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
.item {
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
    background-color: #e5e5e5;
    padding: 5px 20px;
    margin: 0 1px;
    width: 200px;
    text-align: center;
    font-size: 12px;
    &--img {
      background-color: #e5e5e5;
      padding: 5px 20px;
      margin: 0 1px;
      width: 300px;
      text-align: center;
      font-size: 12px;
    }
  }
}

.cart-list {
  list-style: none;
  padding: 0;
}

.total-price {
  text-align: right;
}

.bold-font {
  font-weight: 700;
}
</style>
