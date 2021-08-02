<template>
  <v-app>
    <Carousel />
    <SearchForm />
    <v-container v-if="$store.state.flag">
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
import SearchForm from '@/components/molecules/SearchForm.vue'
import Carousel from '@/components/molecules/Carousel.vue'

export default {
  created() {
    this.$store.state.flag = true
  },
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
          img: require('../../ec-img/2/3.jpeg'),
        },
        {
          id: 3,
          name: 'ショートスリーブニット',
          price: 1900,
          img: require('../../ec-img/3/1.jpeg'),
        },
        {
          id: 4,
          name: 'ロングデニムパンツ',
          price: 2400,
          img: require('../../ec-img/4/1.jpeg'),
        },
        {
          id: 5,
          name: 'ロングデニムパンツ',
          price: 2400,
          img: require('../../ec-img/5/1.jpeg'),
        },
        {
          id: 6,
          name: 'ロングデニムパンツ',
          price: 2400,
          img: require('../../ec-img/6/1.jpeg'),
        },
        {
          id: 7,
          name: 'ロングデニムパンツ',
          price: 2400,
          img: require('../../ec-img/7/1.jpeg'),
        },
        {
          id: 8,
          name: 'ロングデニムパンツ',
          price: 2400,
          img: require('../../ec-img/8/1.jpeg'),
        },
      ],
    }
  },
  components: {
    SearchForm,
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

<style lang="scss">
* {
  box-sizing: border-box;
}

a:link,
a:visited {
  color: black;
  text-decoration: none;
}
</style>
