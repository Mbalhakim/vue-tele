<template>
<div style="background-color: #4d00ff; width:200px;height: 200px " v-if="display">Blue</div>
<div style="background-color: #ff0000; width:200px;height: 200px " v-else>Red</div>
<div></div>

  <button @click="startScroll">Start</button>
  <button @click="stopScroll">Stop</button>
  <button @click="sitDisplayTrue">Set Display True</button>
  <button @click="sitDisplayFalse">Set Display False</button>


</template>

<script>
// import io from "socket.io-client";

export default {
  data() {
    return {
      display: false,
      currentUser: "",
      text: "",
      messages: [],
      connection:null
    };
  },


  created() {
    console.log("Starting connection")
    this.connection = new WebSocket("ws://localhost:8082")
    this.connection.onopen = function (event) {
      console.log(event)
      console.log("Successfully Connected")

    }
    this.connection.onmessage = (event) =>{

      console.log("message recieved from the server " + event.data)
      this.display = event.data.toString()
    }

  },

  methods: {

    // Sending a message to the server to start the scrolling.
    startScroll(message){


      if(this.display ===false){

        message = {
          "method": "start",
          "display": this.display
        };
        console.log(this.connection);
        console.log("message is sent " + message.method);

        this.connection.send(JSON.stringify(message));

      } else if(this.display ===true){

        const payLoad = {
          "method":"stop",
          "display":this.display
        }
        console.log(this.connection);
        console.log("message is sent " + payLoad.toString());
        this.connection.send(JSON.stringify(payLoad));
      }



    },
    stopScroll(){


      if(this.display ===true){

        const payLoad = {
          "method":"stop",
          "display":this.display
        }
        console.log(this.connection);
        console.log("message is sent " + payLoad.toString());
        this.connection.send(JSON.stringify(payLoad));
      }


    },
    sitDisplayTrue(){
      this.display = true
    },
    sitDisplayFalse(){
      this.display = false
    }
  },
  mounted() {
    // this.join();
  },

  beforeCreate () {
    if (this.$store.state.isLogged) {
      this.$router.push({ name: 'login' })
    }
  },
  name: "So-Test"
}
</script>

<style scoped>

</style>