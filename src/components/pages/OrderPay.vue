<template>
  <div>

      <div class="container">
        <div class="my-3 p-3 bg-white rounded">
          <div class="row mb-3 shadow-sm p-3 mb-5 bg-white rounded">
            <h2 class="border-gray pb-2 mb-0">訂單付款</h2>
          </div>
          <div
            class="row shadow-sm p-3 mb-5 bg-white rounded"
            :key="order.orderId"
          >
            <div class="col-md-6 themed-grid-col">
              <ul class="list-unstyled text-small">
                <li>
                  <h5>訂單日期：{{ order.creatDate }}</h5>
                </li>
              </ul>
            </div>
            <div class="col-md-6 themed-grid-col">
              <ul class="list-unstyled text-small">
                <li>
                  <h5>訂單編號：{{ order.orderId }}</h5>
                </li>
              </ul>
            </div>
            <div class="col-md-6 themed-grid-col">
              <ul class="list-unstyled text-small">
                <li>
                  <h5>收貨人姓名：{{ order.name }}</h5>
                </li>
              </ul>
            </div>
            <div class="col-md-6 themed-grid-col">
              <ul class="list-unstyled text-small">
                <li>
                  <h5>收貨人電話：{{ order.phone }}</h5>
                </li>
              </ul>
            </div>
            <div class="col-md-6 themed-grid-col">
              <ul class="list-unstyled text-small">
                <li>
                  <h5>訂單價格：{{ order.final_total }}</h5>
                </li>
              </ul>
            </div>
            <div class="col-md-4 themed-grid-col">
              <ul class="list-unstyled text-small">
                <li>
                  <h5 class="">訂單狀態：{{ order.status }}</h5>
                </li>
              </ul>
            </div>
            <div class="col-md-12 themed-grid-col shadow-sm mb-4 p-3">
              <!-- <h4 class="border-gray pb-0 mb-0">帳號：</h4> -->
              <div class="col-md-12 order-md-1 row justify-content-center">
                <form class="needs-validation col-md-10"  @submit.prevent="addPay(order.orderId)">
                  <h4 class="mb-3">付款：</h4>

                  
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="cc-name">信用卡姓名</label>
                      <input
                        type="text"
                        class="form-control"
                        id="cc-name"
                        placeholder=""
                        v-model="card.name"
                        required
                      />
                      <small class="text-muted"
                        >Full name as displayed on card</small
                      >
                      <div class="invalid-feedback">
                        Name on card is required
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="cc-number">信用卡號</label>
                      <!-- <input
                        @click.capture="setCardNumber"
                        type="text"
                        class="form-control"
                        id="cc-number"
                        placeholder=""
                        v-model="cardNumber"
                        required
                      /> -->
                      <input
                        type="text"
                        class="form-control"
                        id="cc-number"
                        placeholder=""
                        v-model="card.number"
                        required
                      />
                      <div class="invalid-feedback">
                        Credit card number is required
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3 mb-3">
                      <label for="cc-expiration">有效日期</label>
                      <input
                        type="text"
                        class="form-control"
                        id="cc-expiration"
                        placeholder=""
                        v-model="card.expiration"
                        required
                      />
                      <div class="invalid-feedback">
                        Expiration date required
                      </div>
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="cc-cvv">CVV</label>
                      <input
                        type="text"
                        class="form-control"
                        id="cc-cvv"
                        placeholder=""
                        v-model="card.cvv"
                        required
                      />
                      <div class="invalid-feedback">Security code required</div>
                    </div>
                  </div>
                  <hr class="mb-4" />
                  <button
                    class="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    付款
                  </button>
                </form>
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
      card:{},
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
//     setCardNumber(){
//       const vm=this
//       console.log('number',number)
//       var pattern = new RegExp("[-]")  
//       const number=vm.cardNumber.replace(pattern, '');
//       console.log('number',number)
//       // vm.cardNumber=null
//       console.log('number',number)

//       var a='';
//       for(var i=0; i<=number.length;i+=4){
//       console.log('i',i)
//         if(i!=0){
//           a=a+'-'
//         }
//       console.log('vm.cardNumber',vm.cardNumber)
        
//         a=a+number.substr(i, 4)
        
//       }
// vm.cardNumber=a
//     },

addPay(orderId) {
      console.log("addPay() ");

      const vm = this;
      const api = `${process.env.APIPATH}/${process.env.USER}/pay`;

      vm.$validator.validate().then((result) => {

        if (result) {
            
            const payRequest={
              orderId:orderId,
              name:vm.card.name,
              number:vm.card.number,
              expiration:vm.card.expiration,
              cvv:vm.card.cvv,
            }
            
      console.log("payRequest",payRequest);
          this.$http.post(api, payRequest ).then((response) => {
            console.log("products:response", response.data);
            if (response.data.success) {
              vm.response=response.data.message;
              // vm.$route.push(`/shopBoard/`)
      vm.$router.push(`/shopBoard/orderDetail/${orderId}`)
            }else{
              vm.response=response.data.message;
            }
          });
        }
      });
    },

    getOrderDetail(orderId) {
      console.log("getOrderDetail()  ");
      //開啟網頁就創建
      const vm = this;

      if (vm.order.orderId == orderId) {
        vm.order = {};
        console.log("this.order={}", orderId);

        return;
      }
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
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.getOrderDetail(this.orderId)
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