<template>
  <div class="wrapper">
    <div class="login__form">
      <div class="signIn">
        <h2 class="signIn__title">新規登録</h2>
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <p class="signIn__subTitle">お名前</p>
          <validation-provider
            v-slot="{ errors }"
            name="お名前"
            rules="required"
          >
            <input class="signIn__input" type="text" v-model="name" />
            <div class="signIn__error">
              <p>
                {{ errors[0] }}
              </p>
            </div>
          </validation-provider>
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
            登録する
          </button>
          <router-link class="signIn__link" :to="{ name: 'Login' }"
            >ログイン画面にもどる</router-link
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
      name: '',
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
