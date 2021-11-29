<template>
  <div>
    <div class="card mb-3 shadow-sm ">
      <div class="container">
        <div class="row">
          <div class="col-8">
            <div class="card-body">
              <h4>
                {{ product.title }}
              </h4>
              <p class="card-text">
                {{ product.content }}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-success">
                    <!-- 查看更多 -->
                  </button>
                  <button type="button" class="btn btn-sm btn-outline-info">
                    <!-- 加到購物車 -->
                  </button>
                </div>
                <small class="text-muted"
                  ><div class="h6" v-if="!product.price">
                    {{ product.origin_price }} 元
                  </div>
                  <del class="h8" v-if="product.price"
                    >原價 {{ product.origin_price }} 元</del
                  >
                  <div class="h7" v-if="product.price">
                    特價 {{ product.price }} 元
                  </div></small
                >
              </div>
            </div>
          </div>

          <div class="col-4 div-set">
            <div
              style="
                height: 150px;
                background-size: cover;
                background-position: center;
              "
              :style="{
                backgroundImage: `url(${product.imageUrl})`,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {},
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>