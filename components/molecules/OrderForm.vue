<template>
  <v-container>
    <div class="wrapper">
      <div class="form">
        <div class="form__contact">
          <ValidationObserver ref="observer" v-slot="{ invalid }" immediate>
            <form>
              <ValidationProvider
                v-slot="{ errors }"
                name="お名前"
                rules="required"
              >
                <span>お名前</span><span class="must">必須</span>
                <v-text-field
                  id="name"
                  placeholder="山田太郎"
                  :error-messages="errors"
                  outlined
                  dense
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="メールアドレス"
                rules="required|email"
              >
                <span>メールアドレス</span><span class="must">必須</span>
                <v-text-field
                  id="email"
                  :error-messages="errors"
                  placeholder="sample@sample.com"
                  required
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="お問い合わせ内容"
                rules="required"
              >
                <span>お問い合わせ内容</span><span class="must">必須</span>
                <v-textarea
                  id="text"
                  :error-messages="errors"
                  placeholder="お問い合わせ内容をご入力ください"
                  required
                  outlined
                  dense
                ></v-textarea>
              </ValidationProvider>
              <div class="text-center">
                <v-btn :disabled="invalid" @click="submit()"
                  >この内容で送信する</v-btn
                >
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <v-layout justify-center>
      <v-card class="box-shadow-none" width="60%">
        <div class="top-card">
          <v-card-title class="justify-center top-title">
            お届け先情報</v-card-title
          >
        </div>
        <v-card-text>
          <ValidationObserver ref="observer" v-slot="{ invalid }" immediate>
            <form>
              <ValidationProvider
                v-slot="{ errors }"
                name="お名前"
                rules="required"
              >
                <v-text-field
                  id="name"
                  prepend-icon="mdi-account-circle"
                  v-model="orderInfo.name"
                  :error-messages="errors"
                  placeholder="山田太郎"
                  outlined
                  dense
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="メールアドレス"
                rules="required|email"
              >
                <v-text-field
                  id="email"
                  prepend-icon="mdi-email"
                  v-model="orderInfo.email"
                  :error-messages="errors"
                  label="メールアドレス"
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="電話番号"
                rules="required"
              >
                <v-text-field
                  id="tel"
                  v-model="orderInfo.tel"
                  prepend-icon="mdi-phone"
                  label="電話番号"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>

              <v-text-field
                id="zipNum"
                v-model="orderInfo.zipNum"
                prepend-icon="mdi-message-text"
                label="郵便番号"
                required
              ></v-text-field>
              <v-text-field
                id="address"
                v-model="orderInfo.address"
                prepend-icon="mdi-home"
                label="住所"
                required
              ></v-text-field>

              <div class="text-center">
                <v-btn :disabled="invalid" @click="checkInput()"
                  >この内容で注文する</v-btn
                >
              </div>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email } from 'vee-validate/dist/rules'
import {
  localize,
  extend,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja.json'
extend('required', required)
extend('email', email)
localize('ja', ja)

export default {
  data() {
    return {
      orderInfo: {},
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    ...mapActions(['orderConfirm']),
    checkInput() {
      if (this.$refs.observer.validate()) {
        const date = new Date()
        let obj = this.$store.state.cartItems
        obj.name = this.orderInfo.name
        obj.email = this.orderInfo.email
        obj.tel = this.orderInfo.tel
        obj.zipNum = this.orderInfo.zipNum
        obj.address = this.orderInfo.address
        obj.status = 1
        this.orderConfirm({ order: obj }).then(() => {
          this.$router.push('/OrderComp')
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.form {
  width: 60%;
  padding: 20px;
  border: 3px solid #0c3484;
  margin: 60px auto;
  border-radius: 10px;
  &__contact {
    width: 80%;
    margin: 0 auto;
  }
  .must {
    font-size: 10px;
    font-weight: 900;
    padding: 3px 5px;
    margin-left: 5px;
    border-radius: 5px;
    color: #fff;
    background-color: red;
    display: inline-block;
    vertical-align: top;
  }
}
</style>
