<template>
  <v-container class="flex__main">
    <div class="left_clum">
      <v-img width="500" :src="item.img1"></v-img>
    </div>
    <div class="right_clum">
      <v-card>
        <v-card-title>{{ item.itemName }}</v-card-title>
        <v-card-text>¥{{ item.itemPrice }}　(税込)</v-card-text>

        <div align="center">
          <table>
            <tr>
              <td colspan="4">サイズ：S</td>
              <td><v-btn @click="addCart()">カートに追加</v-btn></td>
              <td>
                <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
              </td>
            </tr>
            <tr>
              <td colspan="4">サイズ：M</td>
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
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created() {
    this.item.id = this.$route.params.item_id
    this.item.itemName = this.$route.params.itemName
    this.item.itemPrice = this.$route.params.itemPrice
    this.item.itemText = this.$route.params.itemText
    this.item.img1 = this.$route.params.img1
  },
  data() {
    return {
      item: {},
      id: '',
    }
  },
  methods: {
    ...mapActions(['addItemToCart']),
    addCart() {
      this.addItemToCart(this.item)
      console.log(this.$store.state.cartItems)
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
  padding-left: 40px;
  .img__list {
    display: flex;
    padding: 10px 0px;
  }
}
.right_clum {
  width: 50%;
  padding-left: 40px;
}
</style>
