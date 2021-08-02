<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped fixed>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"
          /></v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="header-title" v-text="title" />
      <v-spacer />
      <router-link :to="{ name: 'Cart' }"
        ><v-btn icon><v-icon>mdi-cart</v-icon></v-btn></router-link
      >
      <router-link :to="{ name: 'OrderHistory' }"
        ><v-btn icon><v-icon>mdi-book-open</v-icon></v-btn></router-link
      >
      <router-link :to="{ name: 'Login' }"
        ><v-btn icon><v-icon>mdi-account-check</v-icon></v-btn></router-link
      >
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <div class="footer_item">
        <router-link :to="{ name: 'Cart' }"
          ><v-btn icon><v-icon>mdi-cart</v-icon></v-btn></router-link
        >
        <router-link :to="{ name: 'OrderHistory' }"
          ><v-btn icon><v-icon>mdi-book-open</v-icon></v-btn></router-link
        >
        <router-link :to="{ name: 'Login' }"
          ><v-btn icon><v-icon>mdi-account-check</v-icon></v-btn></router-link
        ><br />
      </div>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
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
          icon: 'mdi-chart-bubble',
          title: 'ショッピングカート',
          to: '/Cart',
        },
      ],
      title: '#4',
    }
  },
}
</script>

<style scopled lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap');

.header-title {
  font-family: 'Amatic SC', cursive;
  font-size: 40px;
}

.footer_item {
  margin-left: auto;
  margin-right: auto;
}
</style>
