<template>
    <div>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#"  @click.prevent="signout" >登出</a>
        </li>
      </ul>
    </nav>
    </div>
</template>

<script>
    export default {
  name: 'HelloWorld',
  methods:{
    // signout(){
    //   const api = `${process.env.APIPATH}/logout`;
    //   const vm = this;
    // this.$http.post(api).then((response)=>{
    //   console.log('logout:response',response.data)
    //   if(response.data.success){
    //     vm.$router.push('/login')
    //   }
    // });
    // }
    signout(){
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
    this.$http.get(api).then((response)=>{
      console.log('logout:response',response.data)
      if(response.data.code===0){
      console.log('//////logout:response/////',response.data)
        vm.$router.push('/')
      }
    });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>