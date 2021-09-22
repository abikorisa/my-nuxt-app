<template>
  <div class="wrapper">
    <div class="login__form">
      <div class="signIn">
        <h2 class="signIn__title">ログイン</h2>
        <p class="signIn__subTitle">メールアドレス</p>
        <input class="signIn__input" type="text" v-model="email" />
        <p class="signIn__subTitle">パスワード</p>
        <input class="signIn__input" type="password" v-model="password" /><br />
        <button class="main-btn" @click="signIn()">ログイン</button>
        <router-link class="signIn__link" :to="{ name: 'Resister' }"
          >新規会員登録はこちら</router-link
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
    ...mapActions(['loginUser']),
    signIn() {
      this.loginUser({ email: this.email, password: this.password })
      alert('ログインに成功しました。')
    },
  },
}
</script>

<style lang="scss">
.login__form {
  margin: 60px auto;
  width: 500px;
}

.signIn {
  padding: 30px;
  border-radius: 10px;
  background-color: #f5f5f5;
  text-align: center;
  &__link {
    display: block;
    font-size: 12px;
    text-decoration: none;
    color: rgb(170, 170, 170);
    &:visited {
      color: rgb(170, 170, 170);
    }
  }
  &__title {
    margin-bottom: 25px;
    font-size: 20px;
    font-weight: normal;
    letter-spacing: 1px;
    &::after {
      margin: 0 auto;
      content: '';
      width: 30%;
      height: 3px;
      background-color: #e5e5e5;
      display: block; //下線部をひくための疑似要素
    }
  }
  &__subTitle {
    margin-bottom: 5px;
    font-size: 12px;
  }
  &__input {
    padding: 10px 20px;
    margin-bottom: 30px;
    width: 250px;
    border: 1px solid #ddd;
    background-color: #fff;
  }
}
.main-btn {
  display: inline-block;
  padding: 10px 30px;
  font-size: 12pt;
  cursor: pointer;
  background: #e5e5e5;
  line-height: 1em;
  transition: 0.3s;
  &:hover {
    background-color: #ddd;
  }
}
</style>
