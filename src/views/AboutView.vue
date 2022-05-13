<template>




      <button type="button" @click="showDiv">showDiv</button>
<div v-if="play" style="height: 100px; width: 100px;background-color: #4d00ff">all users can see div</div>
<div v-else  style="height: 100px; width: 100px;">Div not shown for all users</div>




</template>

<script>

export default {
  name:'project-view',
  data: function() {
    return {
      play:false,
      project:[],
      users:[]

    }
  },
  mounted() {


  },
  methods:{

    showDiv(){

      this.play=true;
    },
  },
  beforeCreate () {
    if (this.$store.state.isLogged) {
      this.$router.push({ name: 'login' })
    }
  }
}

</script>

