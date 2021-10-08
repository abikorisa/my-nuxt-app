<template>
  <v-app>
    <div class="wrapper">
      <Carousel />
      <SearchForm />
      <v-container v-if="$store.state.flag">
        <v-hover>
          <v-row>
            <v-col cols="3" v-for="(item, i) in items" :key="i" align="center">
              <router-link
                :to="{
                  name: 'ItemDetail-id',
                  params: {
                    item: item,
                    id: item.id,
                  },
                }"
                ><v-card>
                  <v-img :src="item.img1"></v-img>
                  <v-card-text>
                    {{ item.itemName }}
                  </v-card-text>
                  <v-card-text>
                    ¥{{ item.itemPrice.toLocaleString('ja-JP') }}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                  </v-card-actions> </v-card
              ></router-link>
            </v-col>
          </v-row>
        </v-hover>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import SearchForm from '@/components/molecules/SearchForm.vue'
import Carousel from '@/components/molecules/Carousel.vue'
import firebase from '~/plugins/firebase'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    SearchForm,
    Carousel,
  },
  async fetch() {
    if (this.$store.state.itemList.length === 0) {
      await Promise.all([this.fetchItemList()])
      this.items = this.$store.state.itemList
    } else {
      this.items = this.$store.state.itemList
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user)
        this.fetchCartList()
        this.$router.push('/')
      } else {
        this.deleteLoginUser()
        this.clearItems()
        this.$router.push('/')
      }
    })
    this.$store.state.flag = true
  },
  data() {
    return {
      items: [],
    }
  },
  computed: {
    ...mapState(['login_user']),
  },
  methods: {
    ...mapActions([
      'setLoginUser',
      'logout',
      'deleteLoginUser',
      'fetchItemList',
      'fetchCartList',
      'clearItems',
      'updateItemList',
      'updateOrderedList',
    ]),
  },
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
}

a:link,
a:visited {
  color: black;
  text-decoration: none;
}

.v-application p {
  margin-bottom: 2px;
}

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
