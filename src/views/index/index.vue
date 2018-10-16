<template>
  <div class="wrapper">
    <head-top></head-top>
    <footer-guide></footer-guide>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import HeadTop from '../../components/head.vue'
  import FooterGuide from '../../components/footer.vue'

  export default {
    components: {
      HeadTop,
      FooterGuide
    }
  }
</script>

<style scoped lang="stylus">

</style>