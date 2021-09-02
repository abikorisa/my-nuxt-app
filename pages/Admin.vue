<template>
  <v-app>
    <v-container>
      <v-layout justify-center>
        <v-card class="box-shadow-none" width="60%">
          <div class="top-card">
            <v-card-title class="justify-center top-title">
              アイテム登録画面</v-card-title
            >
          </div>
          <v-card-text>
            <form>
              <v-text-field
                id="id"
                v-model="item.id"
                label="ID"
                type="number"
              ></v-text-field>

              <v-text-field
                id="itemName"
                v-model="item.itemName"
                label="商品名"
              ></v-text-field>

              <v-text-field
                id="itemPrice"
                v-model="item.itemPrice"
                label="値段"
                type="number"
              ></v-text-field>

              <v-text-field
                id="itemText"
                v-model="item.itemText"
                multiple="multiple"
                label="アイテム説明"
              ></v-text-field>

              <input type="file" ref="preview1" @change="addImage1" />

              <div class="text-center">
                <v-btn @click="submit()">登録</v-btn>
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
      item: {},
    }
  },
  methods: {
    addImage1() {
      this.item.img1 = this.$refs.preview1.files[0]
    },
    submit() {
      this.doAddItem(this.item)
    },
    ...mapActions(['doAddItem', 'doAddItem2']),
  },
}
</script>
