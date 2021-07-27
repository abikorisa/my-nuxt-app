<template>
  <v-form>
    <div align="center">
      <v-col cols="12" sm="6" md="4">
        <v-text-field label="お探しの商品はなんですか？" outlined dense>
          <template v-slot:append-outer>
            <v-icon>mdi-magnify</v-icon>
            <v-icon>mdi-autorenew</v-icon>
          </template></v-text-field
        >
      </v-col>
    </div>
  </v-form>
</template>
