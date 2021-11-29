<template>
  <div>
    <div class="container">
      <div class="my-3 p-3 bg-white rounded shadow-sm">
        <h2 class="border-bottom border-gray pb-2 mb-0">加入我們</h2>
        <div class="my-5 row justify-content-center">
          <form class="col-md-8" @submit.prevent="addUser">
            <div class="form-group">
              <label for="useremail">Email</label>
              <span
                  v-if="code == 103"
                  class="alert-danger"
                  style="font-size: 25px"
                  >{{ this.message }}</span
                >
              <input
                type="email"
                class="form-control"
                name="email"
                id="useremail"
                v-model="user.email"
                placeholder="請輸入 Email"
                :class="{ 'is-invalid': errors.has('email') }"
                v-validate="'required|email'"
              />

              <span class="text-danger" v-if="errors.has('email')"
                >"請輸入正確的mail"</span
              >
              <span class="text-danger" v-if="errors.has('email')">{{
                errors.first("email")
              }}</span>
            </div>
            <div v-on:click.capture="doConfirmation()">
              <div class="form-group">
                <label for="password">密碼</label>

                <input
                  type="password"
                  class="form-control"
                  name="password"
                  id="password"
                  :class="{ 'is-invalid': errors.has('password') }"
                  v-model="user.password"
                  v-validate="'required'"
                  placeholder="請輸入密碼"
                />
                <span class="text-danger" v-if="errors.has('password')">{{
                  errors.first("password")
                }}</span>
              </div>
            </div>
            <div v-on:click.capture="doConfirmation()">
              <div class="form-group">
                <label for="ConfirmationPassword">密碼確認</label>

                <input
                  type="password"
                  class="form-control"
                  name="confirmationPassword"
                  id="confirmationPassword"
                  :class="{
                    'is-invalid': errors.has('confirmationPassword'),
                  }"
                  v-model="user.confirmationPassword"
                  v-validate="'required'"
                  placeholder="請輸入確認密碼"
                />
                <span
                  class="text-danger"
                  v-if="errors.has('confirmationPassword')"
                  >{{ errors.first("confirmationPassword") }}</span
                >
                <span class="text-danger" v-if="confirmation"
                  >兩次密碼輸入不同，請重新確認
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="username">暱稱</label>
              <input
                type="text"
                class="form-control"
                name="name"
                id="username"
                :class="{ 'is-invalid': errors.has('name') }"
                v-model="user.name"
                v-validate="'required'"
                placeholder="請輸入暱稱"
              />
              <span class="text-danger" v-if="errors.has('name')">{{
                errors.first("name")
              }}</span>
            </div>
            <div class="text-right">
              <button class="btn btn-danger">加入會員</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal" tabindex="-1" id="loginModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
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
            <form class="form-signin" @submit.prevent="signin">
              <h1 class="h3 mb-3 font-weight-normal">請輸入帳號密</h1>
              <span
                v-show="code === 103"
                class="alert-danger"
                style="font-size: 30px"
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
              <label for="inputPassword" class="sr-only">Password</label>
              <input
                v-model="user.password"
                type="password"
                id="inputPassword"
                class="form-control"
                placeholder="Password"
                required
              />
              <div class="checkbox mb-3">
                <label>
                  <input type="checkbox" v-model="user.rememberMe" /> Remember
                  me
                </label>
              </div>
              <button class="btn btn-lg btn-primary btn-block" type="submit">
                Sign in
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
  props:{
    userData:{}
  },
  data() {
    return {
      response: "",
      confirmation: "",
      message: "",
      code: 0,
      user: {
        name: "",
        email: "",
        password: "",
        confirmationPassword: "",
      },
      login: false,
      i: 0,
      pagination: {},
      products: [], //接收回傳的資料，必須和回傳資料名稱相同
      isLoading: false,
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
    addUser() {
      console.log("addUser() ");

      const vm = this;
      const api = `${process.env.APIPATH}/api/addUser`;

      vm.$validator.validate().then((result) => {
        if (result) {
          if (vm.user.password !== vm.user.confirmationPassword) {
            this.confirmation = true;
            return;
          }

          console.log("vm.user ", vm.user);
          this.$http.post(api, vm.user).then((response) => {
            console.log("products:response", response.data);
            if (response.data.success) {
              vm.response = response.data.message;
            } else {
              vm.response = response.data.message;
              vm.code=response.data.code
              console.log("vm.response:",vm.response,"vm.code",vm.code)
          vm.$bus.$emit("message:push", response.data.code, "danger");
          vm.$bus.$emit("message:push", response.data.message, "danger");
            }
          });
        }
      });
    },
    doConfirmation() {
      this.confirmation = false;
    },

    checkLogin() {
          console.log("checkLogin()");
      const vm = this;

      if(vm.userData.nickname){
        console.log("window.alert('你已經登入')");
          window.alert("你已經登入");
          vm.$router.push(`/shopBoard/shopProduct`)
      }
     
    },
  },
  //開啟網頁就創建
  created() {
    this.checkLogin();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/_homeboard";
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