<template>
  <v-app>
    <v-container class="flex__main">
      <div class="left_clum">
        <v-img width="500" :src="imagePath"></v-img>
        <!--  <div class="img__list">
          <v-img
            width="120"
            @click="changeImage1()"
            :src="$route.params.image1"
          ></v-img>
           <v-img
            width="120"
            @click="changeImage2()"
            :src="$route.params.image2"
          ></v-img>
          <v-img
            width="120"
            @click="changeImage3()"
            :src="$route.params.image3"
          ></v-img>
        </div> -->
      </div>
      <div class="right_clum">
        <v-card>
          <v-card-title>{{ $route.params.name }}</v-card-title>
          <v-card-text>¥{{ $route.params.price }}　(税込)</v-card-text>

          <div align="center">
            <table>
              <tr>
                <td colspan="4">サイズ：S</td>
                <td><v-btn>カートに追加</v-btn></td>
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
            {{ $route.params.text }}
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      imagePath: this.$route.params.image1,
    }
  },
  methods: {
    /* changeImage1() {
      this.imagePath = this.$route.params.image1
    },
    changeImage2() {
      this.imagePath = this.$route.params.image2
    },
    changeImage3() {
      this.imagePath = this.$route.params.image3
    }, */
    ...mapActions(['addItemToCart']),
    addCart() {
      this.addItemToCart({ item: this.itemPath })
      console.log('動いた！')
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
