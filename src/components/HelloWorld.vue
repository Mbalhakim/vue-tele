<template>

    <div class="container">

      <div
          class="row justify-content-center align-items-center"
          style="height: 100vh">
      <div class="col-5">
        <button class="btn btn-info mb-5" @click="getProjects">Projects</button>
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="loginUser">
              <div class="mb-3">
                <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    v-model="email"
                />
              </div>
              <div class="mb-3">
                <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="password"
                />
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>


          </div>
        </div>
      </div>
      </div>
    </div>

</template>

<script>
import axios from "axios";
import setAuthHeader from "@/utils/setAuthHeaders";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      email:"",
      password:"",
      projects:[]
    };
  },
  methods:{
    loginUser(){
      const credentials = {
        email:this.email,
        password:this.password
      };
      axios
      .post("http://127.0.0.1:8000/api/login_check",credentials)
      .then((response)=>{
        localStorage.setItem('jwtToken', response.data.token),
            setAuthHeader(response.data.token)
      })
      .catch((err) => console.log(err.response));
    },
    getProjects() {
      axios.get('http://127.0.0.1:8000/api/projects')
      .then(response=> console.log(response.data))
      .catch(err=> console.log(err.response));
    }

  },
  mounted() {
    axios
        .get('http://127.0.0.1:8000/api/projects')
        .then(response => (this.projects = response.data))

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
