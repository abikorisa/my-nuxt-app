<template>
  <v-app>
    <v-container>
      <Carousel />
      <TextForm />
      <v-hover>
        <v-row>
          <v-col cols="3" v-for="(item, i) in items" :key="i" align="center">
            <router-link
              :to="{
                name: 'ItemDetail',
                params: {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  imagePath: item.img,
                },
              }"
              ><v-card>
                <v-img :src="item.img"></v-img>
                <v-card-text>
                  {{ item.name }}
                </v-card-text>
                <v-card-text> JPY {{ item.price }} </v-card-text>
                <v-card-actions>
                  <v-spacer />
                </v-card-actions> </v-card
            ></router-link>
          </v-col>
        </v-row>
      </v-hover>
    </v-container>
  </v-app>
</template>

<script>
import TextForm from '@/components/molecules/TextForm.vue'
import Carousel from '@/components/molecules/Carousel.vue'

export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'オーバオールワンピース',
          price: 4300,
          img: require('../../ec-img/1/01.jpeg'),
        },
        {
          id: 2,
          name: 'カジュアルロゴキャップ',
          price: 1800,
          img: require('../../ec-img/2/1.jpeg'),
        },
        {
          id: 3,
          name: 'ショートスリーブニット',
          price: 1900,
          img: require('../../ec-img/3/1.jpeg'),
        },
        {
          id: 1,
          name: 'オーバオールワンピース',
          price: 4300,
          img: require('../../ec-img/1/01.jpeg'),
        },
        {
          id: 2,
          name: 'カジュアルロゴキャップ',
          price: 1800,
          img: require('../../ec-img/2/1.jpeg'),
        },
        {
          id: 3,
          name: 'ショートスリーブニット',
          price: 1900,
          img: require('../../ec-img/3/1.jpeg'),
        },
      ],
    }
  },
  components: {
    TextForm,
    Carousel,
  },
}
</script>

<style scoped lang="scss">
.v-card {
  transition: all 0.6s;
  overflow: hidden;
  &:hover {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6);
  }
  &.box-shadow-none {
    margin-top: 30px;
    box-shadow: none;
  }
}
</style>
