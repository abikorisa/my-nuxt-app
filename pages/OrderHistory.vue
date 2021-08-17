<template>
  <v-app>
    <v-container>
      <h2>注文履歴</h2>
      <v-layout justify-center>
        <v-data-table
          hide-default-footer
          class="elevation-1"
          :headers="headers"
          :items="orderdItem"
        >
          <template v-slot:[`item.img1`]="{ item }">
            <img :src="item.img1" width="100px" />
          </template>
          <template v-slot:[`item.itemPrice`]="{ item }">
            <td>{{ item.itemPrice.toLocaleString('ja-JP') }}円</td>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  created() {
    let orderedItems = this.$store.state.orderedItems
    orderedItems.forEach((order) => {
      this.orderdItem = order.itemInfo
    })
  },
  data() {
    return {
      show: true,
      headers: [
        {
          text: '',
          value: 'img1',
        },
        {
          text: '商品名',
          value: 'itemName',
        },
        {
          text: '価格',
          value: 'itemPrice',
        },
        {
          text: '個数',
          value: 'num',
        },
        { value: 'delete', sortable: false },
      ],
      orderdItem: [],
    }
  },
  methods: {
    loginCheck() {
      if (this.$store.getters.uid) {
        this.show = !this.show
      } else {
        this.$router.push('/Login')
      }
    },
  },
}
</script>
