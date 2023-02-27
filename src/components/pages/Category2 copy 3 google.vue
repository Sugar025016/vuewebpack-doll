<template>
  <div>
    <div class="container-fluid">
      <div class="my-3 p-3 bg-white rounded shadow-sm row">
        <!-- <h2 class="border-bottom border-gray pb-2 mb-0">設定分類</h2>
        <div class="my-5 row justify-content-center"> -->
        <div class="col-8">
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
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              ...AAAAA
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

        <div class="col-4">
          <div class="col-md-12"><h3>AAAAAAAAAAA</h3></div>
          <!-- <div class="col-md-12" v-for="item in products" :key="item.id"> -->
          <ul id="demo">
            <li draggable="true">1</li>
            <li draggable="true">2</li>
            <li draggable="true">3</li>
            <li draggable="true">4</li>
            <li draggable="true">5</li>
          </ul>
          <ul id="demo2"></ul>
          <!-- </div> -->
          <transition-group id="app" name="drog" tag="ul">
            <li
              draggable="true"
              v-for="(item, index) in lists"
              @dragstart="dragStart($event, index)"
              @dragover="allowDrop"
              @drop="drop($event, index)"
              v-bind:key="item"
            >
              {{ item }}
            </li>
          </transition-group>
          <transition-group id="app" name="drog" tag="ul">
            <li
              draggable="true"
              v-for="(item, index) in lists2"
              @dragstart="dragStart($event, index)"
              @dragover="allowDrop"
              @drop="drop($event, index)"
              v-bind:key="item"
            >
              {{ item }}
            </li>
          </transition-group>
        </div>

        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            ...AAAAA
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
      <div>AAAAAAAAAAABBBBBBBBBBBB</div>

      <div class="drag-content">
        <div class="project-content">
          <div
            class="select-item"
            draggable="true"
            @dragstart="drag($event)"
            v-for="pjdt in projectdatas"
            v-bind:key="pjdt.id"
          >
            {{ pjdt.name }}
          </div>
        </div>
        <div class="people-content">
          <div
            class="drag-div"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
          >
            <div class="select-project-item">
              <label class="drag-people-label"
                >AAAAAAAA:
                <!-- <div
                  class="select-item"
                  draggable="true"
                  @dragstart="drag($event)"
                  v-for="item in products"
                  :key="item.id"
                >
                  <productCmmponent :product="item"></productCmmponent>
                </div> -->
              </label>
            </div>
          </div>
          <div
            class="drag-div"
            v-for="(ppdt, ppindex) in peopledata"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
            v-bind:key="ppindex"
          >
            <div class="select-project-item">
              <label class="drag-people-label"
                >{{ ppdt.name }}:{{ ppdt }}</label
              >
            </div>
          </div>
        </div>
      </div>

      <div id="drag-drop-basic">
        <div id="source-container">
          <div id="drag-source" draggable="true"></div>
        </div>
        <div id="target-container"></div>
      </div>

      <div>
        <span draggable="true">Hello</span>
      </div>
      <div>
        <span draggable="true">Nono</span>
      </div>
      <div>
        <div id="kanban" class="row">
          <div class="col-xs-4">
            <div class="panel panel-info">
              <div class="panel-heading pointer">
                <h3 class="panel-title">Todo</h3>
              </div>
              <div class="panel-body">
                <div id="todo">
                  &nbsp;
                  <div class="alert alert-success pointer" role="alert">
                    Card1
                  </div>
                  <div class="alert alert-success pointer" role="alert">
                    Card2
                  </div>
                  <div class="alert alert-success pointer" role="alert">
                    Card3
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-4">
            <div class="panel panel-info">
              <div class="panel-heading pointer">
                <h3 class="panel-title">In Progress</h3>
              </div>
              <div class="panel-body">
                <div id="in-progress">&nbsp;</div>
              </div>
            </div>
          </div>
          <div class="col-xs-4">
            <div class="panel panel-info">
              <div class="panel-heading pointer">
                <h3 class="panel-title">Done</h3>
              </div>
              <div class="panel-body">
                <div id="done">&nbsp;</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="drag-content">
        <div class="project-content">
          <div
            class="select-item"
            draggable="true"
            @dragstart="drag($event)"
            v-for="pjdt in projectdatas"
            :key="pjdt.id"
          >
            {{ pjdt.name }}
          </div>
        </div>
        <div class="people-content">
          <div
            class="drag-div"
            v-for="(ppdt, ppindex) in peopledata"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
            v-bind:key="ppindex"
          >
            <div class="select-project-item">
              <label class="drag-people-label">{{ ppdt.name }}:</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="drop-zone">
      <div v-for="item in listOne" :key="item.title" class="drag-el">
        {{ item.title }}
      </div>
    </div>
    <div class="drop-zone">
      <div v-for="item in listTwo" :key="item.title" class="drag-el">
        {{ item.title }}
      </div>
    </div>

    <draggable
      v-model="colors"
      @update="datadragEnd"
      :options="{ animation: 500 }"
    >
      <transition-group>
        <div v-for="element in colors" :key="element.text" class="drag-item">
          {{ element.text }}
        </div>
      </transition-group>
    </draggable>
    <div>tttttttttttttttttt</div>

    <draggable
      v-model="colors"
      @update="datadragEnd"
      :options="{ animation: 500 }"
    >
      <transition-group>
        <div v-for="element in colors" :key="element.text" class="drag-item">
          {{ element.text }}
        </div>
      </transition-group>
    </draggable>



    

    <div class="drag-box">
         
      <div class="drag-leftbox">
             
        <h3>所有</h3>

             
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
            class="list-complete-item"
          >
                       
            <div class="list-complete-item-handle2">{{ element.name }}</div>

                     
          </div>

               
        </draggable>

           
      </div>

         
      <div class="drag-rightbox">
             
        <h3>常用</h3>

             
        <draggable
          :list="list1"
          v-bind="getRightOption()"
          @start="startRight"
          @end="endRight"
          class="dragArea11"
          style="height: 100px"
        >
                   
          <div
            v-for="(element, index) in list1"
            :key="element.id"
            class="list-complete-item"
          >
                       
            <div class="list-complete-item-handle">{{ element.name }}</div>

                       
            <div>
                           
              <i
                class="el-icon-delete"
                @click="handleDel(index, element.id)"
              ></i>

                         
            </div>

                     
          </div>

               
        </draggable>

           
      </div>

       
    </div>

  </div>
</template>

<script>
let dom = null;
import ProductCmmponent from "./ProductComponent";
import Draggable from "vuedraggable";

// document.addEventListener("turbolinks:load", function(event){
//   let el = document.querySelector('#show-list');
export default {
   name: 'DndList',
  components: {
    ProductCmmponent,
    Draggable,
  },
    watch: {

  },
  ready: function () {},
  data() {
    var dragObj = null;
    return {
       falgs: 'article',

      disabled: false,

      list1: [],

      list2: [

        { id: 1, name: 1 }, { id: 2, name: 2 }, { id: 3, name: 3 },

        { id: 4, name: 4 }, { id: 5, name: 5 }, { id: 6, name: 6 },

        { id: 7, name: 7 }, { id: 8, name: 8 }, { id: 9, name: 9 },

        { id: 10, name: 10 },

      ],



      msg: "這是測試元件",
      colors: [
        {
          text: "Aquamarine",
        },
        {
          text: "Hotpink",
        },
        {
          text: "Gold",
        },
        {
          text: "Crimson",
        },
        {
          text: "Blueviolet",
        },
        {
          text: "Lightblue",
        },
        {
          text: "Cornflowerblue",
        },
        {
          text: "Skyblue",
        },
        {
          text: "Burlywood",
        },
      ],
      startArr: [],
      endArr: [],
      count: 0,

      items: [
        {
          id: 0,
          title: "Item A",
          list: 1,
        },
        {
          id: 1,
          title: "Item B",
          list: 1,
        },
        {
          id: 2,
          title: "Item C",
          list: 2,
        },
      ],
      projectdatas: [
        {
          id: 1,
          name: "葡萄",
        },
        {
          id: 2,
          name: "芒果",
        },
        {
          id: 3,
          name: "木瓜",
        },
        {
          id: 4,
          name: "榴莲",
        },
      ],
      peopledata: [
        {
          id: 1,
          name: "小颖",
        },
        {
          id: 2,
          name: "hover",
        },
        {
          id: 3,
          name: "空巢青年三 ",
        },
        {
          id: 3,
          name: "一丢丢",
        },
      ],
      el: "#app",
      lists: ["1: apple", "2: banana", "3: orange", "4: melon"],
      lists2: [],
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
    listOne() {
      return this.items.filter((item) => item.list === 1);
    },
    listTwo() {
      return this.items.filter((item) => item.list === 2);
    },

    drag: function (event) {
      dom = event.currentTarget;
    },
    drop: function (event) {
      event.preventDefault();
      event.target.appendChild(dom);
    },
    allowDrop: function (event) {
      event.preventDefault();
    },

    getdata(evt) {
      console.log(evt.draggedContext.element.text);
    },
    datadragEnd(evt) {
      evt.preventDefault();
      console.log("拖動前的索引 :", evt.oldIndex);
      console.log("拖動後的索引 :", evt.newIndex);
      console.log(this.colors);
    },
    getRightOption () {

      return { group: 'article', disabled: this.disabled }

    },

    startRight (event) {

      this.falgs = '222222'

    },

    endRight (ev) {

      this.falgs = 'article'

    },

    // 左侧列表设置

    getLeftOption () {

      return { group: { name: this.falgs, pull: 'clone' }, filter: '.undraggable', sort: false }

    },

    end (ev) {

      if (ev.to.className === 'dragArea11') {

        this.$set(this.list2[ev.oldIndex], 'flag', true)

      }

    },

    handleDel (index, id) {

      this.list1.splice(index, 1)

      let q = this.list2.find((value, index, arr) => {

        return value.id === id

      })

      this.$set(q, 'flag', false)

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
.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}

.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}

.test {
  border: 1px solid #ccc;
}
.drag-item {
  width: 200px;
  height: 50px;
  line-height: 50px;
  margin: auto;
  position: relative;
  background: #ddd;
  margin-top: 20px;
}
.ghostClass {
  opacity: 1;
}
.bottom {
  width: 200px;
  height: 50px;
  position: relative;
  background: blue;
  top: 2px;
  left: 2px;
  transition: all 0.5s linear;
}
</style>