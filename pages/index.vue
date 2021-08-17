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
                  item_id: item.id,
                  itemName: item.itemName,
                  itemPrice: item.itemPrice,
                  itemText: item.itemText,
                  img1: item.img1,
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
        this.fetchOrderList()
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
      'fetchItemList',
      'updateItemList',
      'fetchOrderList',
    ]),
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
