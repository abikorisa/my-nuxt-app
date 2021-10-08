<template>
  <client-only>
    <v-app>
      <v-app-bar clipped-left fixed app>
        <v-toolbar-title @click="toHome" class="header-title" v-text="title" />
        <v-spacer />
        <v-btn v-if="$store.state.login_user" @click="toCart" icon
          ><v-icon>mdi-cart</v-icon></v-btn
        >
        <v-btn v-if="$store.state.login_user" @click="toOrderHistory" icon
          ><v-icon>mdi-book-open</v-icon></v-btn
        >
        <v-btn v-if="$store.state.login_user" @click="checkOut" icon
          ><v-icon>mdi-logout</v-icon></v-btn
        >
        <!-- <v-btn to="Admin" icon><v-icon>mdi-key-star</v-icon></v-btn> -->

        <button
          v-if="!$store.state.login_user"
          class="list-element__btn"
          @click="checkIn()"
        >
          <i class="fas fa-user"></i>
          Sign in
        </button>
      </v-app-bar>
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
      <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </client-only>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'ホーム画面',
          to: '/',
        },
        {
          icon: 'mdi-cart',
          title: 'ショッピングカート',
          to: '/Cart',
        },
        {
          icon: 'mdi-book-open',
          title: '注文履歴画面',
          to: '/OrderHistory',
        },
      ],
      title: '#4',
    }
  },
  methods: {
    ...mapActions(['logout']),
    checkIn() {
      this.$router.push('/Login')
    },
    toHome() {
      this.$router.push('/')
    },
    toCart() {
      this.$router.push('/Cart')
    },
    toOrderHistory() {
      this.$router.push('/OrderHistory')
    },
    checkOut() {
      this.logout()
      alert('ログアウトしました')
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap');
@import 'https://use.fontawesome.com/releases/v5.13.0/css/all.css';

.header-title {
  font-family: 'Amatic SC', cursive;
  font-size: 40px;
  cursor: pointer;
}

.list-element {
  width: 750px;
  margin: 40px auto;
  text-align: center;
  &__btn {
    display: inline-block;
    background-color: #666;
    color: #fff;
    border-radius: 5px;
    padding: 13px 30px;
    margin-right: 20px;
    font-weight: 700;
    font-size: 15px;
    transition: 0.3s;
    > i {
      padding-right: 10px;
      color: #fff;
    }
    &:hover {
      background-color: #ddd;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
