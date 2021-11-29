<template>
  <div>
    <navbar v-on:childByValue="childByValue" ref="navbar"></navbar>
    <alert></alert>
    <main role="main">
      <shopSection  :userData="user"></shopSection>
      <router-view :userData="user"></router-view>
    </main>
    <shopFooter ref="footer"></shopFooter>
  </div>
</template>

<script>
import Navbar from "./ShopNavbar.vue";
import Alert from "./AlertMessage.vue";
import ShopFooter from "./Footer.vue";
import ShopSection from "./ShopSection.vue";
export default {
  components: {
    Navbar,
    Alert,
    ShopFooter,
    ShopSection,
  },
  data() {
    return {
      imageUrl: "http://localhost:8082/16348130439051457.jpg",
      user:{},
    };
  },

  created() {
    var headers = {};
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.$http.defaults.headers.common.Authorization = `${token}`;
    // this.$http.defaults.headers= headers;
  },
  methods: {
    updateItme() {
      console.log("updateItme父");
      this.$refs.navbar.getUser();
      return;
    },
    childByValue(userDate){
      console.log("父this.user=userDate",userDate)
      this.user=userDate
      console.log("父this.user=userDate",userDate)
    }
  },
};
</script>

<style lang="scss" scoped>
</style>