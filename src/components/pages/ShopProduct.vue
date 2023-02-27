<template>
  <div>
      

      <div class="album py-5 bg-light">
        <div class="container-fluid">
          <h2>可愛娃娃</h2>
          <!-- <div class="row"> -->
          <div
            class="row row-cols-1 row-cols-sm-1 row-cols-lg-2 row-cols-xl-2 g-3"
          >
            <div
              class="col-md-12 col-lg-6 col-xl-4"
              v-for="item in products"
              :key="item.id"
            >
              <div class="card mb-4 shadow-sm">
                <div class="container">
                  <div class="row">
                    <div class="col-8">
                      <div class="card-body">
                        <h4>
                          {{ item.title }}
                        </h4>
                        <p class="card-text">
                          {{ item.content }}
                        </p>
                        <div
                          class="
                            d-flex
                            justify-content-between
                            align-items-center
                          "
                        >
                          <div class="btn-group">
                            <button
                              type="button"
                              class="btn btn-sm btn-outline-success"
                              @click="getProduct(item.id)"
                            >
                              <i
                                class="fas fa-spinner fa-spin"
                                v-if="item.id === status.loadingItem"
                              ></i>
                              查看更多
                            </button>
                            <button
                              type="button"
                              class="btn btn-sm btn-outline-info"
                              @click="addtoCart(item.id, 1, true)"
                            >
                              <i
                                class="fas fa-spinner fa-spin"
                                v-if="item.id === status.loadingItem"
                              ></i>
                              加到購物車
                            </button>
                          </div>
                          <small class="text-muted"
                            ><div class="h6" v-if="!item.price">
                              {{ item.origin_price }} 元
                            </div>
                            <del class="h7" v-if="item.price"
                              >原價 {{ item.origin_price }} 元</del
                            >
                            <div class="h6" v-if="item.price">
                              特價 {{ item.price }} 元
                            </div></small
                          >
                        </div>
                      </div>
                    </div>

                    <div class="col-4 div-set">
                      <!-- <img
                        class="img-set"
                        src="http://localhost:8082/16348130439051456.jpg"
                        alt="Card image cap"
                        :style="{ backgroundImage: `url(${item.imageUrl})` }"
                      /> -->
                      <div
                        style="
                          height: 150px;
                          background-size: cover;
                          background-position: center;
                        "
                        :style="{ backgroundImage: `url(${item.imageUrl})` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row justify-content-between">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li
                    class="page-item"
                    :class="{ disabled: !pagination.has_pre }"
                  >
                    <a
                      class="page-link"
                      href="#"
                      aria-label="Previous"
                      @click.prevent="getProducts(pagination.current_page - 1)"
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li
                    class="page-item"
                    v-for="page in pagination.total_pages"
                    :key="page"
                    :class="{ active: pagination.current_page === page }"
                    @click.prevent="getProducts(page)"
                  >
                    <a class="page-link" href="#">{{ page }}</a>
                  </li>
                  <li
                    class="page-item"
                    :class="{ disabled: !pagination.has_next }"
                  >
                    <a
                      class="page-link"
                      href="#"
                      aria-label="Next"
                      @click.prevent="getProducts(pagination.current_page + 1)"
                    >
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
              <div>
                <button
                  v-if="userData.cartCount > 0"
                  class="btn btn-lg btn-outline-info"
                  @click="toCheckout()"
                >
                  去結帳
                </button>
              </div>
            </div>
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
            <div class="div_product_img">
              <img :src="url+product.imageUrl" class="img-fluid product_img" alt="" />
            </div>
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
              @click="addtoCart(product.id, product.num, false)"
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
      url : `${process.env.imgUrl}`,
      message: "",
      code: 0,
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
    };
  },
  methods: {
    getProducts(page = 1) {
      console.log("getProducts(page = 1) ");
      //開啟網頁就創建
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/products?page=${page}`;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        console.log("products:response", response.data);
        if (response.data.success) {
          vm.products = response.data.data.content;
          console.log("products:response.data.products", vm.products);
          vm.pagination = response.data.data.page;
        }
      });
    },
    getProduct(id) {
      //開啟網頁就創建
      const vm = this;
      vm.status.loadingItem = id;
      const api = `${process.env.APIPATH}/api/product/${id}`;
      this.$http.get(api).then((response) => {
        vm.status.loadingItem = "";
        console.log("product:response", response.data);
        if (response.data.success) {
          $("#productModal").modal("show");
          vm.product = response.data.data;
          vm.product.num = vm.product.num <= 1 ? 1 : vm.product.num;
          console.log("product:response.data.product", vm.product);
        }
      });
    },
    addtoCart(id, qty = 1, one = false) {
      console.log("addtoCart(id, qty,one) ");
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
          $("#productModal").modal("hide");
        if (response.data.success) {
          console.log(" vm.$parent.updateItme()");
          // this.$emit('refreshbizlines');
          vm.$parent.updateItme()

        } else if (response.data.code == 109) {
          $("#loginModal").modal("show");
        }
      });
    },
    toCheckout() {
      $("#cartModal").modal("hide");
      this.$router.push(`/shopBoard/checkout`);
    },

    
  },
  //開啟網頁就創建
  created() {
    this.getProducts();
    this.$parent.updateItme()
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

.div_product_img{
  display: flex;
  /* 水平置中 */
  justify-content: center;    
  /* 垂直置中 */
  align-content: center;      
  flex-wrap: wrap;
  height: 400px;
}

.product_img {
  max-height: 400px;
  height: 100%;
  // width: 70%;
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