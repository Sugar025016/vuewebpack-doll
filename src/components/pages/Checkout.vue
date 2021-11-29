<template>
  <div>
    


      


      

      <div class="container">
        <div class="my-3 p-3 bg-white rounded shadow-sm">
    <h2 class="border-bottom border-gray pb-2 mb-0">購買清單</h2>
    <table class="table ">
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
                  {{ item.total | currency }}
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


       <div class="container">
        <div class="my-3 p-3 bg-white rounded shadow-sm">
    <h2 class="border-bottom border-gray pb-2 mb-0">寄送地址</h2>
      <div class="my-5 row justify-content-center">
        <form class="col-md-8" @submit.prevent="createOrder">
          <div class="form-group">
            <label for="useremail">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              id="useremail"
              v-model="form.email"
              placeholder="請輸入 Email"
              :class="{ 'is-invalid': errors.has('email') }"
              v-validate="'required|email'"
            />
            <!-- required chrome網頁會自動攬載，目前不用這個 -->
            <!-- errors.has('input標籤的name') 條件設定 -->
            <!-- is-invalid 是否有效 -->
            <!-- v-validate 驗證 : required(必須要)|email(信箱格式)  -->

            <span class="text-danger" v-if="errors.has('email')"
              >"請輸入正確的mail"</span
            >
            <span class="text-danger" v-if="errors.has('email')">{{
              errors.first("email")
            }}</span>
            <!-- errors.first 自動回傳預設錯誤訊息提示 -->
          </div>

          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="username"
              :class="{ 'is-invalid': errors.has('name') }"
              v-model="form.name"
              v-validate="'required'"
              placeholder="輸入姓名"
            />
            <span class="text-danger" v-if="errors.has('name')">{{
              errors.first("name")
            }}</span>
          </div>

          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input
              type="tel"
              class="form-control"
              id="usertel"
              v-model="form.tel"
              placeholder="請輸入電話"
              v-validate="'required'"
              name="usertel"
            />
            <span class="text-danger" v-if="errors.has('usertel')">請輸入電話</span>
          </div>

          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="useraddress"
              v-model="form.address"
              placeholder="請輸入地址"
              v-validate="'required'"
            />
            <span class="text-danger" v-if="errors.has('address')">請輸入地址</span>
          </div>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              name=""
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger" >送出訂單</button>
            <!-- <router-link to="/shopBoard/orderPay" class="nav-link"> -->
                    <!-- <a class="btn btn-danger sm-2" href="#">
                  <span data-feather="file-text"></span>
                  送出訂單
                </a> -->
                    <!-- </router-link> -->
          </div>
        </form>
      </div>
      </div>
      </div>

    
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
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
            <img :src="product.imageUrl" class="img-fluid" alt="" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option value="" disabled selected>--請選擇數量--</option>
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id, product.num,false)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade  "
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      id="cartModal"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable  modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel">
              購物車
            </h4>
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
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id, product.num)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
              ></i>
              結帳
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" tabindex="-1" id="loginModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="form-signin" @submit.prevent="signin">
      
      <h1 class="h3 mb-3 font-weight-normal">請輸入帳號密</h1>
      <span v-show="code===102" class=" alert-danger" style="font-size:30px">{{this.message}}</span>
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
          <input type="checkbox" v-model="user.rememberMe" /> Remember me
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
  data() {
    return {
      message:'',
      code:0,
      user: {},
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
      form: {
          name: "",
          email: "",
          tel: "",
          address: "",
        message: "",
      },
    };
  },
  methods: {
    
    addtoCart(id, qty = 1,one=false) {
      console.log("addtoCart(id, qty) ");
      //開啟網頁就創建
      const vm = this;
      // vm.status.loadingItem = id;

      const api = `${process.env.APIPATH}/${process.env.USER}/cart`;

      // vm.status.loadingItem = id;
      const cartRequest = {
        product_id: id,
        qty: qty,
        one: one,
      };
      this.$http.post(api, cartRequest).then((response) => {
        // vm.status.loadingItem = "";
        console.log("products:response", response.data);
        if (response.data.success) {
          $("#productModal").modal("hide");
          // vm.getCart();
          this.getUser();
        }
      });
    },
    getCart(modal=true) {
      console.log("getCart()  ");
      //開啟網頁就創建
      const vm = this;
      vm.status.loadingItem = "";
      const api = `${process.env.APIPATH}/${process.env.USER}/cart`;
      this.$http.get(api).then((response) => {
        vm.status.loadingItem = "";
        console.log("cart:response", response.data);
        if (response.data.success && response.data.data.carts.length>0) {
          
          vm.cart = response.data.data.carts;
          vm.total = response.data.data.total;
          vm.final_total = response.data.data.final_total;
          console.log("cart:response.data.carts", vm.cart);
        }else{
          vm.$router.push(`/shopBoard/shopProduct`)
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
          vm.$parent.updateItme()
        }
      });
    },

    createOrder() {
      console.log("createOrder() ");

      const vm = this;
      const api = `${process.env.APIPATH}/${process.env.USER}/order`;

      vm.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(api,  vm.form ).then((response) => {
            vm.status.loadingItem = "";
            console.log("products:response", response.data);
            if (response.data.success) {
              vm.$parent.updateItme()
              vm.$router.push(`/shopBoard/orderPay/${response.data.data}`);
            }
          });
        }
      });
    },

    getUser() {
      console.log("getUser() ");

      const vm = this;
      const api = `${process.env.APIPATH}/${process.env.USER}/user`;

      this.$http.get(api).then((response) => {
        vm.status.loadingItem = "";
        console.log("products:response", response.data);
        if (response.data.success) {
          vm.login = true;
          vm.user = response.data.data;
          vm.form.email=response.data.data.account;
          console.log("vm.user", vm.user);
        } else {
          vm.login = false;
        }
      });
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
  },
  //開啟網頁就創建
  created() {
    this.getCart(false);
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