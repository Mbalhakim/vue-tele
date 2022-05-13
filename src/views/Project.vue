<template>
<NavLoggedIn />
  <div class="d-flex flex-row py-2" id="controllers">

<div class="d-flex flex-row p-2">

    <button type="button" id="scrollText" @click="scrollToBottom" class="p-2 btn btn-light btn-circle text-black btn-xl"><i class="fa-solid fa-arrow-down"></i></button>

    <button type="button" id="flipTextVert" @click="flipTextV"  class="p-2 btn btn-light btn-circle text-black btn-xl"><i class="fa-solid fa-arrows-up-down"></i></button>

    <button type="button" id="flipTextHorz" @click="flipTextH" class=" p-2 btn btn-light btn-circle text-black btn-xl"><i class="fa-solid fa-arrows-left-right"></i></button>
</div>
    <div class="slidecontainer"><p id="demo"></p>
      <span>Font size </span>
      <input type="range" min="10" max="100" value="10" id="myRange">
    </div>

    <div class="slidecontainer"><p id="speedOutPut"></p>
      <span>Scroll speed </span>
      <input type="range" min="1" max="20" value="1"  id="speedRange">
    </div>
    <div class="d-flex align-items-start">
    <span>Background Color</span>
    <input class="m-2" id = "colorpicker" type = "color" value="#000000" >

    <span>Font Color</span>
    <input class="m-2" id = "fontColorpicker" type = "color" value="#ffffff">

    </div>

  </div>

  <h1 class="h1 text-center" id="pageHeaderTitle">PodCast: {{project.title}}</h1>
    <div class="container " id="textDiv">




          Script :
          <br />

            <p id="script">{{project.script}}</p>

    </div>

</template>

<script>
import api from "@/lib/api-platform";
import $ from "jquery";
import NavLoggedIn from "@/components/NavLoggedIn";
//import io from "socket.io-client";
$(window).scrollTop(0);
var play = false;
var flipH = false;
var flipV = false
var currentScroll = 0;
var speed = 1;

export default {
  name:'project-view',
  components:{
    NavLoggedIn
  },
  data: function() {
    return {
      project:[],
      users:[],
      connection:null


    }
  },

  mounted() {

// this.join();
    let colorpicker = document.getElementById('colorpicker');

    // get script
    // Getting the id from the url.
    var itemId = this.$route.params.id
    // Getting the data from the api.
    api.authenticated()
        .get('/api/projects/' + itemId)
        .then(response => (this.project = response.data)),
        api.authenticated()
            .get('/api/users')
            .then(response => (this.users = response.data)),

// set backgoround color
    // Setting the background color of the page to the color that is selected in the color picker.
    setInterval(()=>{
      let color = colorpicker.value;
      document.body.style.backgroundColor = color;

    }, 200);

    // Setting the font color to the color that is selected in the color picker.
    let fontcolorpicker = document.getElementById('fontColorpicker');


// set Font color
    setInterval(()=>{
      let fontcolor = fontcolorpicker.value;
      document.body.style.color = fontcolor;

    }, 200);

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
// Set scroll speed
    var speedSlider = document.getElementById("speedRange");
    var speedOutput = document.getElementById("speedOutPut");
    speedOutput.innerHTML = speedSlider.value;
    // This is a function that is called when the slider is moved. It sets the speed to the value of the slider.
    speedSlider.oninput = function (){
    speedOutput.innerHTML = this.value;
    speed = this.value;
    speed = parseInt(speed)

    }
    var scroller = setInterval(scroll, 10);
    console.log(scroller)

    window.onscroll = function() {myFunction()};
    var controllers = document.getElementById("controllers");
    var sticky = controllers.offsetTop;


    function myFunction() {
      if (window.scrollY >= sticky) {
        console.log('sticky: ' + sticky)
        controllers.classList.add("sticky")

      } else {
        controllers.classList.remove("sticky");
      }
    }

    // This function is called every 10 milliseconds. It checks if the play button is pressed. If it is pressed it checks
    // if the flipV button is pressed. If it is pressed it scrolls up. If it is not pressed it scrolls down.
    function scroll() {
      if(play) {
        if (flipV) {
          currentScroll -= speed
          $(window).scrollTop(currentScroll);
          if($(window).scrollTop() === 0) {
            play = false
          }
        } else {
          currentScroll = $(window).scrollTop() ;
          if($(window).scrollTop() + $(window).height()  == $(document).height()) {
            $(window).scrollTop(0);
            play = false
          } else {
            $(window).scrollTop(currentScroll + speed);
          }
        }
        var docHeight = $(document).height();
        var windowHeight = $(document).height();
        console.log('scroll ')
        console.log('speed ' + '' + speed)
        console.log('CurrentScroll ' + '' +  currentScroll)
        console.log('docHeight ' + '' + docHeight)
        console.log('windowHeight ' + '' + windowHeight)
      }
    }

    // This function is called when a key is pressed. It checks if the key that is pressed is the enter key. If it is the
    // enter key it toggles the play variable.
    function keyDownTextField(e) {
      var keyCode = e.keyCode;
      if(keyCode==13) {
        event.preventDefault();
        play = !play;
        return false;
      }
    }
    document.addEventListener("keydown", keyDownTextField, false);
    output.innerHTML = slider.value;
    slider.oninput = function() {
      output.innerHTML = this.value;
    }
        // verander font grootte
        // This is a function that is called when the slider is moved. It sets the speed to the value of the slider.
        $('#myRange').on("input", function () {
          $('#textDiv').css("font-size", $(this).val() + "px")

        })

  },
  created() {
    console.log("Starting connection")
    this.connection = new WebSocket("ws://localhost:8082")
    this.connection.onopen = function (event) {
      console.log(event)
      console.log("Successfully Connected")

    }
    this.connection.onmessage = (event) =>{

      console.log("message recieved from the server " + event.data.toString())
      play = event.data.toString()
    }

  },
  methods:{
    // This function is called when the flipTextH button is pressed. It toggles the flipH variable. If the flipH variable
    // is true it adds the class flipTextH to the textDiv. If the flipH variable is false it removes the class flipTextH
    // from the textDiv.
    flipTextH(){
      console.log("clicked")
      const text = $('#script')
      flipH = !flipH;
      if(flipH == true){
        text.addClass('flipTextH');
      }
      else {
        text.removeClass('flipTextH');
      }

    },

    flipTextV(){
      console.log("clickeVd")
      const text1 = $('#script')
      flipV = !flipV;
      if(flipV) {

        text1.addClass('flipTextV');
      }
      else {
        text1.removeClass('flipTextV');
      }

    },
    // This function is called when the scrollToBottom button is pressed. It checks if the flipV variable is true. If it is
    // true it sets the currentScroll variable to the height of the document minus the height of the window. It then
    // scrolls to the currentScroll position. If the flipV variable is false it sets the currentScroll variable to the
    // height of the document minus the height of the window. It then scrolls to the currentScroll position. It then
    // toggles the play variable.

    // sendMessage(message){
    //   console.log(this.connection);
    //   console.log("message is sent " + message.toString());
    //   this.connection.send(play);
    //
    // },
    scrollToBottom(){
      // this.sendMessage();
      if(flipV) {
        currentScroll = document.body.scrollHeight - $(window).height()
        $(window).scrollTop(currentScroll + speed)
      }

        play=!play;
        console.log(speed)

    },


  },

  isLogged: state => {
    return state.isLogged
  },
  beforeRouteLeave(to, from, next){

      $("#colorpicker").val('#000000')
      $("#fontColorpicker").val('#ffffff')
      $("#myRange").val(0)
      $("#speedRange").val(0)
      next()

  }
}

</script>

<style lang="scss">
@import "../assets/project.scss";
</style>