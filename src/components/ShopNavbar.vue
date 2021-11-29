<template>
    <div id="navbar">
      

  <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top inverse1">
        <div class="container">
          <router-link to="/shopBoard/shopProduct" class="nav-link">
            <a class="t mb-0 h2" href="#">娃娃世界</a>
          </router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
              <!-- <li class="nav-item active">
              <a class="nav-link" href="#"
                >Home <span class="sr-only">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li> -->
            </ul>

            <button
              v-if="!login"
              class="btn btn-outline-light my-2 my-sm-0 btn-lg"
              type="submit"
              @click.prevent="loginModal"
            >
              登入
            </button>
            
            <ul class="navbar-nav">
              <li v-if="login" class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle h5"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ userData.nickname }}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <router-link to="/shopBoard/orderHistory" >
                  <a class="dropdown-item" href="#">購買歷史</a>
                  </router-link>
                  <router-link to="/shopBoard/changeUser" >
                  <a class="dropdown-item" href="#">會員資料</a>
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" @click="signout">登出</a>
                </div>
              </li>
            </ul>

            <div></div>
            <div class="my-2 my-md-0">
              <!-- <button
                type="button"
                class="btn btn-lg btn-outline-light btn-block"
                @click="getCart()"
                style="
          background-size: 100%, 100%;
          background-position: center;
          background-image: url('http://localhost:8082/16348130439051458.jpg');

        "
                :style="{ backgroundImage: `url(${imageUrlCart})` }"
              > -->
              <button
                type="button"
                class="btn btn-lg btn-outline-light"
                @click="getCart()"
                v-if="login"
              >
                <!-- <i class="fas fa-cart-plus">
                  <p class=" text-dark " style="
          font-size: 70%;
          vertical-align: text-bottom;
        ">{{user.cartCount}}</p></i> -->

                <i class="fas fa-cart-plus"> </i>

                <span
                  data-feather="file-text text-danger"
                  style="font-size: 70%; vertical-align: text-bottom"
                  >{{ userData.cartCount }}</span
                >
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>

    
    <div
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      id="cartModal"
    >
      <div
        class="
          modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg
        "
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel">購物車</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row justify-content-center">
                <table class="table col-md-8 mt-6">
                  <thead>
                    <tr>
                      <th width="160" class="text-center"></th>
                      <th width="200">產品名稱</th>
                      <th width="120" class="text-right">數量</th>
                      <th width="120" class="text-right">原價</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cart" :key="item.id">
                      <td class="text-center">
                        <button
                          class="btn btn-sm btn-outline-danger"
                          @click="delCart(item.id)"
                        >
                          <i class="far fa-trash-alt"></i>
                        </button>
                      </td>
                      <td>{{ item.title }}</td>

                      <td class="text-right">
                        {{ item.qty }}
                      </td>
                      <td class="text-right">
                        {{ item.totalOriginPrice | currency }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="text-right">總價</td>

                      <td class="text-right">
                        {{ total | currency }}
                      </td>
                    </tr>
                    <tr v-if="total !== final_total">
                      <td colspan="3" class="text-right">折扣價</td>

                      <td class="text-right">
                        {{ final_total | currency }}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="toCheckout()">
              <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
              ></i>
              去結帳
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" tabindex="-1" id="loginModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">登入</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="signin">
              <div class="form-group">
                <label for="inputEmail">帳號</label>
                <span
                  v-show="code === 102"
                  class="alert-danger"
                  style="font-size: 25px"
                  >{{ this.message }}</span
                >
                <label for="inputEmail" class="sr-only">Email address</label>
                <input
                  v-model="user.username"
                  type="email"
                  id="inputEmail"
                  class="form-control"
                  placeholder="Email address"
                  required
                  autofocus
                />
              </div>
              <div class="form-group">
                <label for="inputPassword">密碼</label>
                <label for="inputPassword" class="sr-only">Password</label>
                <input
                  v-model="user.password"
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <div class="checkbox mb-3">
                <label>
                  <input type="checkbox" v-model="user.rememberMe" /> Remember
                  me
                </label>
              </div>
              <button class="btn btn-lg btn-primary btn-block" type="submit">
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    </div>
</template>

<script>

import $ from "jquery";
export default {
  name:'Navbar',
  data() {
    return {
      message: "",
      code: 0,
      user: {},
      userData: {},
      login: false,
      i: 0,
      status: {
        loadingItem: "",
      },
      product: {},
      cart: [],
      total: 0,
      final_total: 0,
    };
  },
  methods: {
            
    getCart() {
      console.log("getCart()  ");
      //開啟網頁就創建
      const vm = this;
      vm.status.loadingItem = "";
      const api = `${process.env.APIPATH}/${process.env.USER}/cart`;
      this.$http.get(api).then((response) => {
        vm.status.loadingItem = "";
        console.log("cart:response", response.data);
        if (response.data.success) {
          $("#cartModal").modal("show");
          vm.cart = response.data.data.carts;
          vm.total = response.data.data.total;
          vm.final_total = response.data.data.final_total;
          console.log("cart:response.data.carts", vm.cart);
        }
      });
    },
    delCart(id) {
      console.log("getCart()  ");
      //開啟網頁就創建
      const vm = this;
      const api = `${process.env.APIPATH}/${process.env.USER}/cart/${id}`;
      this.$http.delete(api).then((response) => {
        vm.status.loadingItem = "";
        console.log("cart:response", response.data);
        if (response.data.success) {
          vm.getCart();
          vm.getUser();
        }
      });
    },

    getUser() {
      console.log("getUser() ");

      const vm = this;
      const api = `${process.env.APIPATH}/${process.env.USER}/user`;

      this.$http.get(api).then((response) => {
        vm.status.loadingItem = "";
        console.log("getUser():response", response.data);
        if (response.data.success) {
          vm.login = true;
          vm.userData = response.data.data;
          console.log("vm.userData", vm.userData);
          this.$emit('childByValue',vm.userData)
        } else {
          vm.login = false;
        }
      });
    },
    signout() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.get(api).then((response) => {
        console.log("logout:response", response.data);
        if (response.data.code === 0) {
          console.log("//////logout:response/////", response.data);
          vm.login = false;
          vm.userData = {};
          this.$emit('childByValue',vm.userData)
          vm.$router.push('/shopBoard/shopProduct')
        }
      });
    },
    loginModal() {
      const vm = this;

      $("#loginModal").modal("show");
    },
    signin() {
      const api = `${process.env.APIPATH}/login`;
      const vm = this;
      //  let formData = JSON.stringify(vm.user);
      let body = new FormData();
      body.append("username", vm.user.username);
      body.append("password", vm.user.password);
      body.append("remember-me", vm.user.rememberMe);
      this.$http.post(api, body).then((response) => {
        console.log("signin:response", response);
        console.log("signin:response.data.success", response.data);
        if (response.data.code === 0) {
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie = `hexToken = ${token};expires=${new Date(expired)};`;
          $("#loginModal").modal("hide");
          this.getUser();
          vm.$router.push(`/shopBoard/shopProduct`)
        } else {
          console.log("signin:登入錯誤");
          this.message = response.data.message;
          this.code = response.data.code;
          vm.$bus.$emit("message:push", response.data.code, "danger");
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },

    toCheckout() {
      $("#cartModal").modal("hide");
      this.$router.push(`/shopBoard/checkout`);
    },


    // signin() {
    //   const api = `${process.env.APIPATH}/api/login`;
    //   const vm = this;
    //   //  let formData = JSON.stringify(vm.user);
    //    let body = new FormData();
    //     body.append('username', vm.user.username);
    //     body.append('password',  vm.user.password);
    //     body.append('remember-me',  vm.user.rememberMe);
    //   this.$http.post(api,body).then((response) => {
    //     console.log("signin:response", response, response);
    //     console.log("signin:response.data.success", response.data);
    //     if (response.data.code===0) {
    //       const token = response.data.token;
    //       const expired = response.data.expired;
    //       document.cookie = `hexToken = ${token};expires=${new Date(expired)};`;
    //       vm.$router.push("/dashboard/openDate");
    //     }else{
    //       console.log("signin:登入錯誤");
    //       this.message=response.data.message
    //       this.code=response.data.code
    //       vm.$bus.$emit("message:push", response.data.code, "danger");
    //       vm.$bus.$emit("message:push", response.data.message, "danger");
    //     }
    //   });
    // },






updateClick(){
            this.userData.cartCount=this.userData.cartCount+1;
            console.log("chired~ this.userData",this.userData)
            return
        }




  },



  //開啟網頁就創建

  created() {
    // this.getCart();
    this.getUser();
  },
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