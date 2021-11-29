<template>
  <div>
    <div class="container">
      <div class="my-4 p-4 bg-white rounded shadow-sm">
        <h2 class="border-bottom border-gray pb-2 mb-0">會員資料</h2>
        <div class="my-5 row justify-content-center">
          <form class="col-md-6">
            <div class="form-group">
              <label for="useremail">Email</label>
              <p>{{ user.account }}</p>
            </div>
            <div v-on:click.capture="doConfirmation()">
              <div class="form-group">
                <label for="password">密碼</label>

                <p>**********************************</p>
                <button
                  class="btn btn-outline-danger"
                  @click.prevent="openPasswordModal"
                >
                  修改密碼
                </button>
                <span class="text-danger" v-if="errors.has('password')">{{
                  errors.first("password")
                }}</span>
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
                v-model="user.nickname"
                v-validate="'required'"
                placeholder="請輸入暱稱"
              />
              <span class="text-danger" v-if="errors.has('name')">{{
                errors.first("name")
              }}</span>
            </div>
            <div class="text-right">
              <button class="btn btn-danger" @click.prevent="updateUser">
                確認
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal" tabindex="-1" id="passwordModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">更改密碼</h3>
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
            <form @submit.prevent="updatePassword">
              <div class="form-group">
                <label for="inputEmail">舊密碼</label>
                <span
                  v-show="code === 102"
                  class="alert-danger"
                  style="font-size: 25px"
                  >{{ this.message }}</span
                >
                <label for="orderPassword" class="sr-only"
                  >order password</label
                >
                <input
                  v-model="user.orderPassword"
                  type="password"
                  id="orderPassword"
                  class="form-control"
                  placeholder="Order password"
                  required
                  autofocus
                />
              </div>
              <div class="form-group">
                <label for="newPassword">新密碼</label>
                <label for="newPassword" class="sr-only">new password</label>
                <input
                  v-model="user.newPassword"
                  type="password"
                  id="newPassword"
                  class="form-control"
                  placeholder="New Password"
                  required
                />
              </div>
              <div class="form-group">
                <label for="newPasswordCheck">新密碼確認</label>
                <label for="newPasswordCheck" class="sr-only"
                  >new password chack</label
                >
                <input
                  v-model="user.confirmationNewPassword"
                  type="password"
                  id="newPasswordCheck"
                  class="form-control"
                  placeholder="New Password Check"
                  required
                />
                <span class="text-danger" v-if="confirmation">兩次密碼輸入不同，請重新確認
        </span>
              </div>
              
              <button class="btn btn-lg btn-primary btn-block" type="submit">
                確認
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
  data() {
    return {
      response: "",
      confirmation: "",
      message: "",
      code: 0,
      user: {
        name: "",
        email: "",
        orderPassword: "",
        newPassword: "",
        confirmationPassword: "",
      },
      i: 0,
      imageUrlCart: "http://localhost:8082/16348130439051458.jpg",
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
    getUser() {
      console.log("getUser() ");

      const vm = this;
      const api = `${process.env.APIPATH}/${process.env.USER}/user`;

      this.$http.get(api).then((response) => {
        vm.status.loadingItem = "";
        console.log("getUser():response", response.data);
        if (response.data.success) {
          vm.login = true;
          vm.user = response.data.data;
          console.log("vm.userData", vm.userData);
        } else {
          vm.login = false;
        }
      });
    },
    updateUser() {
      console.log("updateUser() ");

      const vm = this;

      vm.$validator.validate().then((result) => {
          console.log("result", result);
        if (result) {
          const api = `${process.env.APIPATH}/${process.env.USER}/user`;
          const user = {
            nickname: vm.user.nickname,
          };
          console.log("user", user);
          vm.$http.put(api, user).then((response) => {
            console.log("getUser():response", response.data);
            if (response.data.success) {
              console.log("vm.userData", vm.userData);
              vm.$router.push(`/shopBoard/shopProduct`);
            } else {
              vm.login = false;
            }
          });
        }
      });
    },
    updatePassword() {
      console.log("updatePassword() ");

      const vm = this;

      vm.$validator.validate().then((result) => {
        if (result) {
          if (vm.user.newPassword !== vm.user.confirmationNewPassword) {
            this.confirmation = true;
            return;
          }
          const api = `${process.env.APIPATH}/${process.env.USER}/password`;
          const password = {
            orderPassword: vm.user.orderPassword,
            newPassword: vm.user.newPassword,
            confirmationNewPassword: vm.user.confirmationNewPassword,
          };
          this.$http.put(api, password).then((response) => {
            console.log("getUser():response", response.data);
            if (response.data.success) {
              console.log("vm.userData", vm.userData);
              $("#passwordModal").modal("hide");
            } else {
              console.log("signin:登入錯誤");
              this.message = "密碼錯誤";
              this.code = response.data.code;
            }
          });
        }
      });
    },
    openPasswordModal() {
      $("#passwordModal").modal("show");
    },

    doConfirmation() {
      this.confirmation = false;
    },
  },
  //開啟網頁就創建
  created() {
    this.getUser();
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