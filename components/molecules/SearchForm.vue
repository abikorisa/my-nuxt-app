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
                    name: search.itemName,
                    price: search.itemPrice,
                    image1: search.img1,
                    text: search.itemText,
                  },
                }"
                ><v-card>
                  <v-img :src="search.img1"></v-img>
                  <v-card-text>
                    {{ search.itemName }}
                  </v-card-text>
                  <v-card-text> JPY {{ search.itemPrice }} </v-card-text>
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
import { mapActions } from 'vuex'

export default {
  created() {
    this.items = this.$store.state.itemList
  },
  data() {
    return {
      search_word: '',
      searchItem: [],
      show: false,
      items: [],
    }
  },
  computed: {
    filterItems() {
      return this.searchItem
    },
  },
  methods: {
    ...mapActions(['fetchItemList']),
    checkWord() {
      this.searchItem = []
      this.items.forEach((search) => {
        let findName = search.itemName
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
