<template>
  <v-app>
    <v-container>
      <v-layout justify-center>
        <v-card class="box-shadow-none" width="60%">
          <div class="top-card">
            <v-card-title class="justify-center top-title">
              会員登録画面</v-card-title
            >
          </div>
          <v-card-text>
            <form>
              <v-text-field
                id="email"
                v-model="email"
                prepend-icon="mdi-email"
                label="メールアドレス"
              ></v-text-field>

              <v-text-field
                id="password"
                v-model="password"
                prepend-icon="mdi-lock"
                label="パスワード"
                type="password"
              ></v-text-field>

              <div class="text-center">
                <v-btn @click="signIn()">ログイン</v-btn>
              </div>
            </form>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </v-app>
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
