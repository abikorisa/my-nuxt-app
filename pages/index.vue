<template>
  <v-app>
    <Carousel />
    <SearchForm />
    <v-btn @click="checkUser()">ログインされてる？</v-btn>
    <v-btn @click="checkOut">ログアウトする！</v-btn>
    <v-container v-if="$store.state.flag">
      <v-hover>
        <v-row>
          <v-col cols="3" v-for="(item, i) in items" :key="i" align="center">
            <router-link
              :to="{
                name: 'ItemDetail',
                params: {
                  id: item.id,
                  name: item.itemName,
                  price: item.itemPrice,
                  image1: item.img1,
                  image2: item.img2,
                  image3: item.img3,
                  text: item.itemText,
                },
              }"
              ><v-card>
                <v-img :src="item.img1"></v-img>
                <v-card-text>
                  {{ item.itemName }}
                </v-card-text>
                <v-card-text> JPY {{ item.itemPrice }} </v-card-text>
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
import firebase from '~/plugins/firebase'
import { mapState, mapActions } from 'vuex'

export default {
  mounted() {
    this.items = this.$store.state.itemList
    this.fetchItemList()
  },
  created() {
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
      items: [
        /*
        {
          id: 1,
          name: 'オーバオールワンピース',
          price: 4300,
          img1: require('../../ec-img/1/01.jpeg'),
          img2: require('../../ec-img/1/02.jpeg'),
          img3: require('../../ec-img/1/03.jpeg'),
        },
        {
          id: 2,
          name: 'カジュアルロゴキャップ',
          price: 1800,
          img1: require('../../ec-img/2/1.jpeg'),
          img2: require('../../ec-img/2/2.jpeg'),
          img3: require('../../ec-img/2/3.jpeg'),
        }*/
      ],
    }
  },
  computed: {
    ...mapState(['login_user']),
    /* ...mapActions(['fetchItemList']),
    fetchItem() {
      this.fetchItemList()
      this.items = this.$store.state.itemList
    }, */
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
      'fetchItemList',
      'updateItemList',
    ]),
    checkUser() {
      console.log(this.$store.state.login_user)
    },
    checkOut() {
      this.logout()
      alert('ログアウトしました')
    },
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

a:link,
a:visited {
  color: black;
  text-decoration: none;
}
</style>
