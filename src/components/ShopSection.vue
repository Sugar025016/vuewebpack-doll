<template>
  <div>
    <section
        class="jumbotron text-center"
        style="
          background-size: cover;
          background-position: center;
          background-image: url('http://localhost:8082/16348130439051457.jpg');
        "
        :style="{ backgroundImage: `url(${imageUrl})` }"
      >
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-4">
              <h1 class="display-4 t-shadow">娃娃世界</h1>
              <p class="lead">各種可愛的娃娃，在這都可以找的到</p>
              <p class="lead">台北市信義區XXX路XXX號</p>
              <p>
                <router-link
                  to="/shopBoard/join"
                  class="nav-link"
                  v-if="!userData.nickname"
                >
                  <a href="#" class="btn btn-primary my-2" v-if="!userData.nickname">加入會員</a>
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </section>
    <!-- <section
      class="jumbotron text-center"
      style="
        background-size: cover;
        background-position: center;
        background-image: url('http://localhost:8082/16348130439051457.jpg');
      "
      :style="{ backgroundImage: `url(${imageUrl})` }"
    >
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-4">
            <h1 class="display-4 t-shadow">娃娃世界</h1>
            <p class="lead">各種可愛的娃娃，在這都可以找的到</p>
            <p class="lead">台北市信義區XXX路XXX號</p>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
import $ from "jquery";
export default {
  props:{
    userData:{}
  },
  data() {
    return {
      imageUrl: "http://localhost:8082/16348130439051457.jpg",
    };
  },
  methods:{
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/_homeboard";
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.img-set {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.div-set {
  overflow: hidden;
  border: 2px;
  position: relative;
}
.t-shadow {
  text-shadow: 2px 2px 2px #fcfff9;
}
.t {
  // text-shadow:2px 2px 2px #fcfff9;
  color: rgb(252, 220, 220);
}
</style>