<template>
  <v-app>
    <v-container>
      <v-layout justify-center>
        <v-card class="box-shadow-none" width="60%">
          <div class="top-card">
            <v-card-title class="justify-center top-title">
              ログイン</v-card-title
            >
          </div>
          <v-card-text>
            <form>
              <v-text-field
                id="email"
                prepend-icon="mdi-email"
                label="メールアドレス"
                required
              ></v-text-field>

              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                label="パスワード"
                required
                type="password"
              ></v-text-field>

              <div class="text-center">
                <v-btn>ログイン</v-btn>
              </div>
            </form>
          </v-card-text>
          <v-card-text>
            <div class="text-center">
              <router-link :to="{ name: 'Resister' }"
                >※新規会員登録はこちら！</router-link
              >
            </div>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {}
</script>
