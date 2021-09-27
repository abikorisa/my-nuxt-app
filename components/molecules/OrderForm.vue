<template>
  <v-container>
    <div class="wrapper">
      <div class="form">
        <div class="form__contact">
          <div class="form__title">
            <div class="title__tag"><h3>お届け先情報</h3></div>
          </div>
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
                  v-model="orderInfo.name"
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
                  v-model="orderInfo.email"
                  :error-messages="errors"
                  placeholder="sample@sample.com"
                  required
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="電話番号"
                rules="required"
              >
                <span>電話番号</span><span class="must">必須</span>
                <v-text-field
                  id="tel"
                  v-model="orderInfo.tel"
                  :error-messages="errors"
                  placeholder="080-1111-1111"
                  required
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="郵便番号"
                rules="required"
              >
                <span>郵便番号</span><span class="must">必須</span>
                <v-text-field
                  id="zipNum"
                  v-model="orderInfo.zipNum"
                  :error-messages="errors"
                  placeholder="111-1111"
                  required
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="住所"
                rules="required"
              >
                <span>住所</span><span class="must">必須</span>
                <v-text-field
                  id="address"
                  v-model="orderInfo.address"
                  :error-messages="errors"
                  placeholder="東京都世田谷区"
                  required
                  outlined
                  dense
                ></v-text-field>
              </ValidationProvider>
              <div class="text-center">
                <v-btn :disabled="invalid" @click="checkInput()"
                  >この内容で送信する</v-btn
                >
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
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
    showNowTime() {
      let now = new Date()
      let ye = now.getFullYear()
      let mo = ('0' + (now.getMonth() + 1)).slice(-2)
      let da = ('0' + now.getDate()).slice(-2)
      this.orderInfo.orderDate = ye + '年' + mo + '月' + da + '日'
    },
    checkInput() {
      if (this.$refs.observer.validate()) {
        this.showNowTime()
        let obj = this.$store.state.cartItems
        obj.name = this.orderInfo.name
        obj.email = this.orderInfo.email
        obj.tel = this.orderInfo.tel
        obj.zipNum = this.orderInfo.zipNum
        obj.address = this.orderInfo.address
        obj.status = 1
        obj.orderDate = this.orderInfo.orderDate
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
  width: 100%;
  padding: 20px;
  border: 1px solid #e5e5e5;
  margin: 60px auto;
  border-radius: 5px;
  //  text-align: center;
  &__contact {
    width: 80%;
    margin: 0 auto;
  }
  &__title {
    text-align: center;
    margin-bottom: 30px;
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
