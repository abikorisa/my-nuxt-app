<template>
  <v-container class="flex__main">
    <div class="left_clum">
      <v-img :src="item.img1"></v-img>
      <div class="img__list">
        <v-img :src="item.img1"></v-img>
        <v-img :src="item.img2"></v-img>
        <v-img :src="item.img3"></v-img>
      </div>
    </div>
    <div class="right_clum">
      <v-card>
        <v-card-title>{{ item.itemName }}</v-card-title>
        <v-card-text>¥{{ item.itemPrice }}　(税込)</v-card-text>

        <div align="center">
          <v-text-field
            width="5"
            v-model="number"
            type="number"
            style="width: 100px"
            max="10"
            min="1"
          >
          </v-text-field>
          <table>
            <tr>
              <td colspan="4">ONE SIZE</td>
              <td><v-btn @click="addCart()">カートに追加</v-btn></td>
              <td>
                <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
              </td>
            </tr>
          </table>
        </div>
        <v-card-text
          >【アイテム詳細】<br />
          {{ item.itemText }}
        </v-card-text>
        <v-card-text>
          ご注文金額合計：{{
            (item.itemPrice * number).toLocaleString('ja-JP')
          }}円(税抜)
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created() {
    this.item.itemId = this.$route.params.item_id
    this.item.itemName = this.$route.params.itemName
    this.item.itemPrice = this.$route.params.itemPrice
    this.item.itemText = this.$route.params.itemText
    this.item.img1 = this.$route.params.img1
    this.item.img2 = this.$route.params.img2
    this.item.img3 = this.$route.params.img3
  },
  data() {
    return {
      item: {},
      id: '',
      number: 1,
    }
  },
  methods: {
    ...mapActions(['addItemToCart']),
    addCart() {
      this.item.itemNum = this.number
      this.item.itemId = parseInt(this.item.itemNum)
      this.addItemToCart(this.item)
    },
  },
}
</script>

<style scoped lang="scss">
.flex__main {
  display: flex;
  max-width: 80%;
  padding-top: 40px;
}

.left_clum {
  width: 50%;
  .img__list {
    display: flex;
    width: 35%;
    padding: 10px 0px;
  }
}
.right_clum {
  width: 50%;
  padding-left: 40px;
}
</style>
