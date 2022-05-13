<template>

  <nav class="navbar navbar-expand-lg text-light bg-dark ">
    <a class="navbar-brand" href="">
      <img alt="Kei logo" style="height: 36px" src="https://vpos-dev.o.auroraobjects.eu/image/cache/col_3/logo-3794-22172e2de94440fc.png"/>
    </a>
    <div class=" navbar-collapse  " id="navbarNav">
      <ul class="navbar-nav ">

        <li class="nav-item">
          <router-link :to="{ name: 'Home'}" class="nav-link" >Projecten</router-link>
        </li>

      </ul>

<!--      <ul class="navbar-nav ">-->

<!--        <li class="nav-item">-->
<!--          <router-link :to="{ name: 'Remote'}" class="nav-link" >Remote</router-link>-->
<!--        </li>-->

<!--      </ul>-->

<!--      <ul class="navbar-nav ">-->

<!--        <li class="nav-item">-->
<!--          <router-link :to="{ name: 'SoTest'}" class="nav-link" >Socket</router-link>-->
<!--        </li>-->

<!--      </ul>-->






      <ul class="navbar-nav" >
        <li class="nav-item">
          <router-link  :to="{ name: 'login'}" class="nav-link" >Login</router-link>
        </li>
      </ul>
    </div>

  </nav>

</template>

<script>

import store from "@/store";

export default {
  name: "Nav-comp",
  data(){ return{
    display:null,

  }},

  methods: {
    handleClick(){
        localStorage.removeItem('jwtToken');
        this.$router.push('/login');
    }
  },
  computed: {
        isLoggedin(){
         return store.state.count
        }
  },
  mounted() {

  },
  beforeRouteLeave(){
    if (localStorage.getItem('jwtToken')){
      this.display = true
      console.log("its true")
    }else {
      this.display=false
      console.log("its false")
    }


  }
}
</script>

<style>
nav .navbar-nav li a{
  color: white !important;
}

</style>