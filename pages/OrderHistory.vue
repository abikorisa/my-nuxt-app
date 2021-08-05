<template>
  <v-app>
    <h3>ショッピングカート</h3>
    <v-btn @click="checkUser()">ログイン状態の確認</v-btn>
    <v-row>
      <v-col cols="10">
        <v-data-table :headers="headers" :items="items">
          <template v-slot:[`item.img`]="{ item }">
            <img :src="item.img" width="100px" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <Button message="トップ画面に戻る" />
  </v-app>
</template>

<script>
import Button from '@/components/atoms/Button.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
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
      ],
      items: [
        {
          id: 1,
          name: 'オーバオールワンピース',
          price: 4300,
          img: require('../../ec-img/1/01.jpeg'),
          num: 1,
        },
      ],
    }
  },
  methods: {
    checkUser() {
      console.log(this.$store.state.login_user.uid)
    },
  },
}
</script>
