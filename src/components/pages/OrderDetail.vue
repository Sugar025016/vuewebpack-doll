<template>
  <div>
      <div class="container">
        <div class="my-3 p-3 bg-white rounded">
          <div class="row mb-3 shadow-sm p-3 mb-5 bg-white rounded">
            <h2 class="border-gray pb-2 mb-0">訂單明細</h2>
          </div>
          <div
            class="row shadow-sm p-3 mb-5 bg-white rounded"
            :key="order.orderId"
          >
            <div class="col-md-12 themed-grid-col shadow-sm mb-4 p-3">
              <div class="my-1 row justify-content-center p-3">
                <div class="col-md-5 themed-grid-col">
                  <ul class="list-unstyled text-small">
                    <li>
                      <h5>訂單日期：{{ order.creatDate }}</h5>
                    </li>
                  </ul>
                </div>
                <div class="col-md-5 themed-grid-col">
                  <ul class="list-unstyled text-small">
                    <li>
                      <h5>訂單編號：{{ order.orderId }}</h5>
                    </li>
                  </ul>
                </div>
                <div class="col-md-5 themed-grid-col">
                  <ul class="list-unstyled text-small">
                    <li>
                      <h5>訂單價格：{{ order.final_total }}</h5>
                    </li>
                  </ul>
                </div>
                <div class="col-md-5 themed-grid-col">
                  <ul class="list-unstyled text-small">
                    <li>
                      <h5 class="" >
                        訂單狀態：{{ order.status }}
                      </h5>
                    </li>
                  </ul>
                </div>
                <div class="col-md-5 themed-grid-col">
                  <ul class="list-unstyled text-small">
                    <li>
                      <h5>收貨人姓名：{{ order.name }}</h5>
                    </li>
                  </ul>
                </div>
                <div class="col-md-5 themed-grid-col">
                  <ul class="list-unstyled text-small">
                    <li>
                      <h5>收貨人電話：{{ order.phone }}</h5>
                    </li>
                  </ul>
                </div>
                <div class="col-md-10 themed-grid-col">
                  <ul class="list-unstyled text-small">
                    <li>
                      <h5>收貨人住址：{{ order.address }}</h5>
                    </li>
                  </ul>
                </div>
                <div class="col-md-10 themed-grid-col">
                  <ul class="list-unstyled text-small">
                    <li>
                      <h5>收貨人備註：{{ order.message }}</h5>
                    </li>
                  </ul>
                </div>
                <div class="col-md-10 themed-grid-col p-3 mb-4">
                  <h4 class="border-bottom border-gray pb-2 mb-0 p-3">
                    購買清單
                  </h4>
                  <table class="table">
                    <thead>
                      <tr>
                        <th width="200">產品名稱</th>
                        <th width="120" class="text-right">數量</th>
                        <th width="120" class="text-right">原價</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in order.orderDetailResponseList"
                        :key="item.id"
                      >
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
                        <td colspan="2" class="text-right">總價</td>

                        <td class="text-right">
                          {{ order.total | currency }}
                        </td>
                      </tr>
                      <tr v-if="order.total !== order.final_total">
                        <td colspan="2" class="text-right">折扣價</td>

                        <td class="text-right">
                          {{ order.final_total | currency }}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      code: 0,
      orders: [],
      order: {},
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
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    getOrderDetail(orderId) {
      console.log("getOrderDetail()  ", orderId);
      //開啟網頁就創建
      const vm = this;

      const api = `${process.env.APIPATH}/${process.env.USER}/order/${orderId}`;
      this.$http.get(api).then((response) => {
        console.log("getOrderDetail:response", response.data);
        if (response.data.success) {
          vm.order = response.data.data;
          console.log("getOrderDetail:response.data.order", vm.order);
        }
      });
    },
  },
  created() {
    // this.getOrders();
    this.order.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.getOrderDetail(this.order.orderId);
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