<template>
  <div class="wrapper">
    <div class="list-element">
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
            <li>
              <button>
                {{ item.status === 1 ? 'キャンセルする' : 'キャンセル済み' }}
              </button>
            </li>
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
    this.orderdList = this.$store.state.orderedItems
  },
  data() {
    return {
      tax: 0.1,
      show: true,
      orderdList: [],
      showFlg: true,
    }
  },
  computed: {
    cancelFlg() {
      this.orderdList.forEach((item) => {
        return item.status
      })
    },
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
    deleteConfirm() {
      confirm('削除してもよろしいですか？')
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
</style>
