<template>
<Nav />
  <div class="wrapper">
    <div class="logo">
      <img src="https://vpos-dev.o.auroraobjects.eu/image/cache/col_3/logo-3794-22172e2de94440fc.png" alt="">
    </div>
    <div class="text-center mt-4 name">
      Kei Studio
    </div>
    <form @submit.prevent="loginUser" class="p-3 mt-3">
      <div class="form-field d-flex align-items-center">
        <span class="far fa-user"></span>
        <input type="email" name="userName" id="userName" placeholder="Email"  v-model="email">
      </div>
      <div class="form-field d-flex align-items-center">
        <span class="fas fa-key"></span>
        <input type="password" name="password" id="pwd" placeholder="Wachtwoord" v-model="password">
      </div>
      <button  type="submit" class="btn mt-3">Login</button>
    </form>

  </div>


</template>

<script>
import setAuthHeader from "@/utils/setAuthHeaders";
import api from "@/lib/api-platform";
import Nav from "@/components/Nav";
import {useStore} from 'vuex'
// declare the store variable
const store = useStore();
import {mapGetters} from "vuex";


export default {
  name: 'Login-view',
  components:{Nav},
  props: {
    msg: String
  },
  data(){
    return {
      email:"",
      password:"",

    } ;
  },
  methods:{
    asd(){

    },
   async loginUser(){
console.log("asdasd")
      const credentials = {
        email:this.email,
        password:this.password,

      };



     await api.anonymous()
          .post("/api/login_check",credentials)
          .then((response)=>{
            localStorage.setItem('jwtToken', response.data.token)
                setAuthHeader(response.data.token);
            localStorage.setItem('jwtRefreshToken', response.data.refresh_token)

            this.$router.push('/').then(r => r);
            store.dispatch('user', response.data.user);
          });


    },
  },
  computed: {
    ...mapGetters(['user'])
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
@import '../assets/login.css';
</style>
