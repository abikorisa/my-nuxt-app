<template>
  <div class="wrapper">
    <div v-if="showFlg" class="list-element">
      <div class="title__tag"><h3>注文履歴</h3></div>
      <div class="head">
        <p class="head__label--img">商品</p>
        <p class="head__label">価格(税抜)</p>
        <p class="head__label">数量</p>
        <p class="head__label">小計</p>
      </div>
      <div class="waku">
        <ul class="cart-list" v-for="item in orderdList" :key="item.index">
          <div class="orderDate">
            <li>{{ item.orderDate }}注文</li>
          </div>
          <li v-for="i in item.itemInfo" :key="i.index">
            <div class="items">
              <div class="items__label--img">
                <img :src="i.img1" width="100px" />
                <p class="items__itemName">{{ i.itemName }}</p>
              </div>
              <div class="items__label">
                <p class="items__num">
                  {{ i.itemPrice.toLocaleString('ja-JP') }}円
                </p>
              </div>
              <div class="items__label">
                <p class="items__num">{{ i.itemNum }}個</p>
              </div>
              <div class="items__label bold-font">
                <p class="items__num">
                  {{ (i.itemPrice * i.itemNum).toLocaleString('ja-JP') }}円
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="list-element">商品はありません</div>
    <div class="list-element">
      <button class="list-element__btn" @click="backToTop()">
        <i class="fas fa-arrow-left"></i>ホーム画面に戻る
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created() {
    this.fetchOrderList()
    console.log(this.$store.state.orderedItems)
    this.orderdList = this.$store.state.orderedItems
    this.showFlg = this.$store.state.orderedLength
    console.log(this.$store.state.orderedLength)
  },
  data() {
    return {
      tax: 0.1,
      show: true,
      orderdList: null,
      showFlg: false,
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
    backToTop() {
      this.$router.push('/')
    },
  },
  destroyed() {
    this.updateOrderedList()
  },
}
</script>

<style scoped lang="scss">
.orderDate {
  background-color: #f5f5f5;
  padding: 5px 0;
  font-size: 13px;
}

.waku {
  border: 1px solid #f5f5f5;
}

//以下おためし
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
