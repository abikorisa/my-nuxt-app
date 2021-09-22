<template>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item
      height="100%"
      v-for="(slide, i) in slides"
      :key="i"
      :src="slide.src"
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        { src: require('../../assets/img/ec1.png') },
        { src: require('../../assets/img/ec2.png') },
        { src: require('../../assets/img/ec3.png') },
      ],
    }
  },
}
</script>

<style lang="scss">
.wrapper {
  margin: 0 auto;
  max-width: 1170px;
  width: 80%;
}
</style>
