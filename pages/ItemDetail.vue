<template>
  <v-app>
    <v-container class="flex">
      <div class="left_clum">
        <v-img width="500" :src="$route.params.imagePath"></v-img>
      </div>
      <div class="right_clum">
        <v-card>
          <v-card-title>{{ $route.params.name }}</v-card-title>
          <v-card-text>¥{{ $route.params.price }}　(税込)</v-card-text>
          <table>
            <tr>
              <td rowspan="4">
                <v-img width="50" :src="$route.params.imagePath"></v-img>
                <p>BLACK</p>
              </td>
            </tr>
            <tr>
              <td colspan="4">S</td>
              <td><v-btn>カートに追加</v-btn></td>
              <td>
                <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
              </td>
            </tr>
            <tr>
              <td colspan="4">M</td>
              <td><v-btn>カートに追加</v-btn></td>
              <td>
                <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
              </td>
            </tr>
          </table>
          <v-card-text>【アイテム説明】</v-card-text>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped lang="scss">
.flex {
  display: flex;
  max-width: 80%;
  padding-top: 40px;
  &__item {
    width: 50%;
    padding-left: 40px;
  }
}
</style>
