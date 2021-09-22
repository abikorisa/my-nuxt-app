<template>
  <div class="wrapper">
    <div class="item">
      <div class="item-left">
        <div><img class="item-left__img" :src="item.img1" /></div>
        <div class="item-left__img">
          <img :src="item.img1" />
          <img :src="item.img2" />
          <img :src="item.img3" />
        </div>
      </div>
      <div class="item-right">
        <h3 class="item-right__title">{{ item.itemName }}</h3>
        <p class="item-right__price">
          ¥{{ item.itemPrice.toLocaleString('ja-JP') }}　(税込)
        </p>
        <div class="item-right__num">
          <span class="btn__count" @click="decrement">-</span>
          <span class="countNum">{{ number }}</span>
          <span class="btn__count" @click="increment">+</span>
          <button class="btn__addToCart" @click="addCart()">
            <i class="fas fa-shopping-cart"></i>カートに追加する
          </button>
        </div>
        <p class="item-right__text">【アイテム説明】</p>
        <p class="item-right__text">{{ item.itemText }}</p>
        <p class="item-right__totalPrice">
          ご注文金額合計：<span
            >{{
              (item.itemPrice * number).toLocaleString('ja-JP')
            }}円(税抜)</span
          >
        </p>
      </div>
    </div>
    <button>トップ画面に戻る</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created() {
    this.item = this.$route.params.item
  },
  data() {
    return {
      item: {},
      number: 1,
    }
  },
  methods: {
    ...mapActions(['addItemToCart']),
    addCart() {
      this.item.itemNum = this.number
      this.addItemToCart(this.item)
    },
    increment() {
      this.number++
    },
    decrement() {
      if (this.number === 1) {
        return this.number
      } else {
        this.number--
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import 'https://use.fontawesome.com/releases/v5.13.0/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap');
.item {
  display: flex;
  margin: 60px auto;
  width: 80%;
  &-left {
    width: 50%;
    &__img {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 10px;
      > img {
        width: 30%;
      }
    }
  }
  &-right {
    width: 50%;
    padding: 0 10px 0 30px;
    &__title {
      font-family: 'Roboto', sans-serif;
      font-size: 30px;
      font-weight: 200;
      padding: 10px 0;
    }
    &__price {
      font-size: 18px;
      padding: 10px 0;
      border-bottom: 1px dashed #ddd;
      text-align: right;
    }
    &__num {
      text-align: center;
      margin-bottom: 20px;
    }
    &__text {
      font-size: 14px;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    &__totalPrice {
      padding: 30px 0 10px 0;
      //border-bottom: 1px solid #ddd;
      text-align: center;
      span {
        font-size: 25px;
      }
    }
  }
}

.btn__addToCart {
  display: inline-block;
  background-color: #666;
  color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 8px;
  margin-left: 20px;
  font-weight: 700;
  font-size: 15px;
  transition: all 0.3s;
  > i {
    padding-right: 10px;
    color: #fff;
  }
  &:hover {
    background-color: #e5e5e5;
  }
}

.btn__count {
  display: inline-block;
  padding: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
  margin: 0 -5px;
}

.countNum {
  display: inline-block;
  padding: 10px 20px;
  border: 1px solid #ddd;
}
</style>
