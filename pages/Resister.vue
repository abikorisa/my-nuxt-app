<template>
  <div class="wrapper">
    <div class="login__form">
      <div class="signIn">
        <h2 class="signIn__title">新規登録</h2>
        <p class="signIn__subTitle">メールアドレス</p>
        <input class="signIn__input" type="text" v-model="email" />
        <p class="signIn__subTitle">パスワード</p>
        <input class="signIn__input" type="password" v-model="password" /><br />
        <button class="main-btn" @click="signIn()">登録する</button>
        <router-link class="signIn__link" :to="{ name: 'Login' }"
          >ログイン画面にもどる</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(['resisterUser']),
    signIn() {
      this.resisterUser({
        email: this.email,
        password: this.password,
      })
      alert('ログインに成功しました。')
    },
  },
}
</script>
