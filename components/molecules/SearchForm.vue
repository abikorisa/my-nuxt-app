<template>
  <v-container>
    <v-form>
      <div align="center">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="search_word"
            label="お探しの商品はなんですか？"
            dense
          >
            <template v-slot:append>
              <v-btn icon @click="clearWord()"
                ><v-icon>mdi-close-circle</v-icon></v-btn
              >
              <v-btn icon @click="checkWord()"
                ><v-icon>mdi-magnify</v-icon></v-btn
              >
            </template></v-text-field
          >
        </v-col>
        <div v-if="show" align="center">
          <p>該当する商品がありません</p>
        </div>
        <v-hover>
          <v-row>
            <v-col
              cols="3"
              v-for="(search, i) in filterItems"
              :key="i"
              align="center"
            >
              <router-link
                :to="{
                  name: 'ItemDetail',
                  params: {
                    id: search.id,
                    name: search.name,
                    price: search.price,
                    imagePath: search.img,
                  },
                }"
                ><v-card>
                  <v-img :src="search.img"></v-img>
                  <v-card-text>
                    {{ search.name }}
                  </v-card-text>
                  <v-card-text> JPY {{ search.price }} </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                  </v-card-actions> </v-card
              ></router-link>
            </v-col>
          </v-row>
        </v-hover>
      </div>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search_word: '',
      searchItem: [],
      show: false,
      items: [
        {
          id: 1,
          name: 'オーバオールワンピース',
          price: 4300,
          img: require('../../../ec-img/1/01.jpeg'),
        },
        {
          id: 2,
          name: 'カジュアルロゴキャップ',
          price: 1800,
          img: require('../../../ec-img/2/1.jpeg'),
        },
        {
          id: 3,
          name: 'ショートスリーブニット',
          price: 1900,
          img: require('../../../ec-img/3/1.jpeg'),
        },
      ],
    }
  },
  computed: {
    filterItems() {
      return this.searchItem
    },
  },
  methods: {
    checkWord() {
      this.searchItem = []
      this.items.forEach((search) => {
        let findName = search.name
        if (0 <= findName.search(this.search_word)) {
          this.searchItem.push(search)
        } else {
          this.$store.state.flag = false
        }
      })
      if (this.searchItem.length === 0) {
        this.show = true
      } else {
        this.show = false
      }
    },
    clearWord() {
      this.search_word = ''
      this.searchItem = []
      this.show = false
      this.$store.state.flag = true
    },
  },
}
</script>
