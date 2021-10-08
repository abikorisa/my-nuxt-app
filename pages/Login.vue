<template>
  <div class="wrapper">
    <div class="login__form">
      <div class="signIn">
        <h2 class="signIn__title">ログイン</h2>
        <p class="error-message" v-if="this.$store.state.loginError">
          入力に不備があります
        </p>
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <p class="signIn__subTitle">メールアドレス</p>
          <validation-provider
            v-slot="{ errors }"
            name="メールアドレス"
            rules="required|email"
          >
            <input class="signIn__input" type="text" v-model="email" />
            <div class="signIn__error">
              <p>
                {{ errors[0] }}
              </p>
            </div>
          </validation-provider>

          <p class="signIn__subTitle">パスワード</p>
          <validation-provider
            v-slot="{ errors }"
            name="パスワード"
            rules="required"
          >
            <input class="signIn__input" type="password" v-model="password" />
            <div class="signIn__error">
              <p>
                {{ errors[0] }}
              </p>
            </div>
          </validation-provider>
          <button class="main-btn" :disabled="invalid" @click="signIn()">
            ログイン
          </button>
          <router-link class="signIn__link" :to="{ name: 'Resister' }"
            >新規会員登録はこちら</router-link
          >
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
extend('email', {
  ...email,
  message: '※入力形式が正しくありません',
})
extend('required', {
  ...required,
  message: '※{_field_}は必須項目です',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
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
    width: 250px;
    border: 1px solid #ddd;
    background-color: #fff;
  }
  &__error {
    margin-bottom: 30px;
    font-size: 13px;
    color: red;
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
