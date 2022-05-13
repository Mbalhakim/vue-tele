<template>
<NavLoggedIn />
  <section class="dark" >
    <div class="container py-4"  >


      <h1 class="h1 text-center" id="pageHeaderTitle">PodCast Projecten</h1>

      <article class="postcard dark blue" v-for="project in projects ['hydra:member']" :key='project.id'>


        <div class="postcard__text">
          <h1 class="postcard__title blue"><a href="#">{{ project.title }}</a></h1>
          <ul class="postcard__tagbox">
            <li class="tag__item"><i class="fa-solid fa-calendar-days mr-2"></i>Datum :{{format_date(project.dateStart)}}</li>
            <li class="tag__item"><i class="fa-solid fa-clock mr-2"></i>Tijd :{{format_time(project.timeStart)}}</li>
          </ul>
          <div class="postcard__subtitle small">

          </div>
          <div class="postcard__bar"></div>
          <div class="postcard__preview">{{project.description}}</div>


          <ul class="postcard__tagbox">

            <li class="tag__item"><i class="fas fa-tag mr-2"></i>Type: {{ project.projecttype.type }}</li>
            <li class="tag__item"><i class="fa-solid fa-link mr-2"></i> <a :href="url + project.id" target="_blank">Project in backEnd Silicon</a></li>

            <router-link :to="{ name: 'project', params: { id : project.id }}">
              <button  class="btn btn-light">Open Teleprompter</button>
            </router-link>
          </ul>
        </div>

      </article>
    </div>
  </section>

</template>


<script>
import api from "@/lib/api-platform";
import NavLoggedIn from "@/components/NavLoggedIn";
import moment from "moment";
import {mapGetters} from "vuex";
export default {
  name: 'Projcts-view',

  data(){
    return {
      email:"",
      password:"",
      projects:[],
      isConnected:false,
      url:"http://127.0.0.1:8000/project/show/",





    };
  },
  components:{NavLoggedIn},

  methods:{
    // A function that takes a value and returns a date in the format DD-MM-YYYY
    format_date(value){
      if (value) {
        return moment(String(value)).format('DD-MM-YYYY')
      }
    },
    // A function that takes a value and returns a date in the format DD-MM-YYYY
    format_time(value){
      if (value) {
        return moment(String(value)).format(' H:mm')
      }
    },

  },
  mounted() {
    // A function that is called when the component is mounted. It is a function that gets the data from the API and puts
    // it in the projects variable.
    api.authenticated()
        .get('http://127.0.0.1:8000/api/projects')
        .then(response => (this.projects = response.data))



  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {

  },

};
</script>

<style lang="scss">

@import '../assets/home';
/* COLORS */





</style>