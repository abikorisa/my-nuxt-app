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
                  name: 'ItemDetail',
                  params: {
                    item: item,
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
import { mapState, mapActions } from 'vuex'

export default {
  created() {
    this.fetchItemList()
    this.items = this.$store.state.itemList
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user)
        this.$router.push('/')
      } else {
        this.deleteLoginUser()
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
  components: {
    SearchForm,
    Carousel,
  },
  methods: {
    ...mapActions([
      'setLoginUser',
      'logout',
      'deleteLoginUser',
      'updateItemList',
      'fetchItemList',
    ]),
    // ...mapActions('item', ['fetchItemList']),
  },
  destroyed() {
    this.updateItemList()
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
</style>
