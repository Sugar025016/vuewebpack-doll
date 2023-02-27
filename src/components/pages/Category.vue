<template>
  <div>
    <div class="container-fluid">
      <div class="my-3 p-3 bg-white rounded shadow-sm row">
        <!-- <h2 class="border-bottom border-gray pb-2 mb-0">設定分類</h2>
        <div class="my-5 row justify-content-center"> -->
        <div class="col-9">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                class="nav-link active"
                id="nav-home-tab"
                data-toggle="tab"
                href="#nav-home"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
                >Home</a
              >
              <a
                class="nav-link"
                id="nav-profile-tab"
                data-toggle="tab"
                href="#nav-profile"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
                >Profile</a
              >
              <a
                class="nav-link"
                id="nav-contact-tab"
                data-toggle="tab"
                href="#nav-contact"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
                >Contact</a
              >
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active "
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
            <!-- <div
            class="row row-cols-1 row-cols-sm-1 row-cols-lg-2 row-cols-xl-2 g-3"
          > -->
              <!-- <draggable
                :list="list1"
                v-bind="getRightOption()"
                @start="startRight"
                @end="endRight"
                class="dragArea11 row row-cols-1 row-cols-sm-1 row-cols-lg-2 row-cols-xl-2 g-3"
                style="height: 700px"
                >   -->
              <draggable
                :list="list1"
                v-bind="getRightOption()"
                @start="startRight"
                @end="endRight"
                class="dragArea11 row row-cols-sm-1"
                >   
                <div
                  v-for="(element, index) in list1"
                  :key="element.id"
                  class="list-complete-item  col-sm-4"
                >
                     <div>
                           
                    <i
                      class="el-icon-delete "
                      @click="handleDel(index, element.id)"
                    ></i>
                       
                  </div>      
                  <productCmmponent :product="element" ></productCmmponent>      
                             
                  
                     
                </div>
              </draggable>
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              ...
            </div>
            <div
              class="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              ...

              
            </div>
          </div>
        </div>

        <div class="col-3">
          <div class="col-md-12"><h3 class="text-center">商品</h3></div>
          <div class="container-fluid ">
          <draggable 
            :list="list2"
            v-bind="getLeftOption()"
            @end="end"
            class="dragArea"
            >
            <div
              v-for="element in list2"
              :key="element.id"
              :class="{ undraggable: element.flag }"
              class="list-complete-item " style="max-width: 340px;"
            >
              <productCmmponent :product="element" v-if="!element.flag"></productCmmponent>
            </div>
          </draggable>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ProductCmmponent from "./ProductComponent";
import Draggable from "vuedraggable";
let dom = null;
export default {
  name: "DndList",
  // components: { Draggable, ProductCmmponent },
  components: { Draggable },
  watch: {},
  ready: function () {},
  data() {
    return {
      falgs: "article",

      disabled: false,
      list1: [],
      list2: [],
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
          vm.list2 = response.data.data.content;
          console.log("products:response.data.products", vm.products);
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

    toCheckout() {
      $("#cartModal").modal("hide");
      this.$router.push(`/shopBoard/checkout`);
    },
    getRightOption() {
      console.log("getRightOption()")
      return { group: "article", disabled: this.disabled };
    },

    startRight(event) {
      console.log("startRight(event)",event)
      this.falgs = "222222";
    },

    endRight(ev) {
      console.log("endRight(ev)",ev)
      this.falgs = "article";
    }, // 左侧列表设置

    getLeftOption() {
      console.log("getLeftOption()")
      return {
        group: { name: this.falgs, pull: "clone" },
        filter: ".undraggable",
        sort: false,
      };
    },

    end(ev) {
      console.log("end(ev)",ev)
      if (ev.to.className === "dragArea11 row row-cols-sm-1") {
        this.$set(this.list2[ev.oldIndex], "flag", true);
      }
    },

    handleDel(index, id) {
      console.log("handleDel(index, id)",index,id)
      this.list1.splice(index, 1);

      let q = this.list2.find((value, index, arr) => {
        return value.id === id;
      });

      this.$set(q, "flag", false);
    },
  },
  created() {
    this.getProducts();
  },
  mounted() {
    //為了防止火狐瀏覽器拖拽的時候以新標籤開啟，此程式碼真實有效
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
  },
};
</script>

<style lang="scss" scoped>
.boxLeft {
  height: 100%; //限定高度
  // min-height: 100vh;
  overflow-y: auto; //自動產生 y 軸捲軸
  // display: flex;
}
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
}
.container-fluid {
    padding: 0;
    min-height:83%;
    height: 83%;
    overflow: hidden;
}
</style>