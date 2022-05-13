<template>

  <div class="border border-light p-3 mb-1">

    <div class="d-flex align-items-center justify-content-center">
      <button type="button" @click="sendMessage" class="p-2 btn btn-light btn-circle text-black btn-xl">send</button>
      <span class="p-2">Scroll </span><button type="button" id="scrollText" @click="scrollToBottom" class="col-example p-2 btn btn-light btn-circle text-black btn-xl"><i class="fa-solid fa-arrow-down"></i></button>

      <span class="p-2">Tekst Verticaal </span><button type="button" id="flipTextVert" @click="flipTextV"  class="col-example p-2 btn btn-light btn-circle text-black btn-xl"><i class="fa-solid fa-arrows-up-down"></i></button>

      <span class="p-2">Tekst Horizentaal  </span><button type="button" id="flipTextHorz" @click="flipTextH" class="col-example p-2 btn btn-light btn-circle text-black btn-xl"><i class="fa-solid fa-arrows-left-right"></i></button>
    </div>
    <div class="slidecontainer"><p id="demo"></p>
      <span>Font size </span>
      <input type="range" min="10" max="100" value="50" id="myRange">
    </div>

    <div class="slidecontainer"><p id="speedOutPut"></p>
      <span>Scroll speed </span>
      <input type="range" min="1" max="10" value="1"  id="speedRange">
    </div>
    <div class="d-flex align-items-start">
      <span>Background Color</span>
      <input class="m-2" id = "colorpicker" type = "color" value="#000000" >

      <span>Font Color</span>
      <input class="m-2" id = "fontColorpicker" type = "color" value="#ffffff">

    </div>

  </div>



</template>

<script>
import axios from "axios";
import $ from "jquery";
import io from "socket.io-client";


$(window).scrollTop(0);
var play = false;

var flipH = false;
var flipV = false
var currentScroll = 0;
var speed = 1;




export default {
  name:'project-view',
  data: function() {
    return {
      project:[],
      users:[]

    }
  },
  mounted() {


this.join();
    let colorpicker = document.getElementById('colorpicker');

    // get script
    // Getting the id from the url.
    var itemId = this.$route.params.id
    // Getting the data from the api.
    axios
        .get('http://127.0.0.1:8000/api/projects/' + itemId)
        .then(response => (this.project = response.data)),
        axios
            .get('http://127.0.0.1:8000/api/users')
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
  methods:{

    // This function is called when the flipTextH button is pressed. It toggles the flipH variable. If the flipH variable
    // is true it adds the class flipTextH to the textDiv. If the flipH variable is false it removes the class flipTextH
    // from the textDiv.
    flipTextH(){
      console.log("clicked")
      const text = $('#textDiv')
      flipH = !flipH;
      if(flipH == true){
        text.addClass('flipTextH');
      }
      else {
        text.removeClass('flipTextH');
      }

    },
    join() {
      this.joined = true;
      this.socketInstance = io("http://localhost:3000");
      this.socketInstance.on(
          "message:received", (data) => {
            this.messages = this.messages.concat(data);
          }
      )
    },
    sendMessage() {
      this.scrollToBottom();
      this.text = "";
      console.log("Send message ")
    },
    // This function is called when the flipTextV button is pressed. It toggles the flipV variable. If the flipV variable
    // is true it adds the class flipTextV to the textDiv. If the flipV variable is false it removes the class flipTextV
    // from the textDiv.
    flipTextV(){
      console.log("clickeVd")
      const text1 = $('#textDiv')
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
    scrollToBottom(){
      if(flipV) {
        currentScroll = document.body.scrollHeight - $(window).height()
        $(window).scrollTop(currentScroll)
      }

      play=!play;
      console.log(speed)

    },
  },
  isLogged: state => {
    return state.isLogged
  }
}

</script>

<style lang="scss">




/* This pen */
body {
  //font-family: "Baloo 2", cursive;
  font-size: 16px;
  color: #000000;
  text-rendering: optimizeLegibility;
  font-weight: initial;

}
.slidecontainer {
  width: 100%;
}


.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}
.flipTextH{

  transform: scaleX(-1);
}

.flipTextV{

  transform: scaleY(-1);
}



a, a:hover {
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

#pageHeaderTitle {
  margin: 2rem 0;
  text-transform: uppercase;
  text-align: center;
  font-size: 2.5rem;
}

/* Cards */
.postcard {
  flex-wrap: wrap;
  display: flex;

  box-shadow: 0 4px 21px -12px rgba(0, 0, 0, 0.66);
  border-radius: 10px;
  margin: 0 0 2rem 0;
  overflow: hidden;
  position: relative;
  color: #000000;


  .t-dark {
    color: #4d00ff;
  }

  a {
    color: inherit;
  }

  h1,	.h1 {
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }

  .small {
    font-size: 80%;
  }

  .postcard__title {
    font-size: 1.75rem;
  }


  .postcard__bar {
    width: 50px;
    height: 10px;
    margin: 10px 0;
    border-radius: 5px;

    transition: width 0.2s ease;
  }

  .postcard__text {
    padding: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .postcard__preview-txt {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: justify;
    height: 100%;
  }

  .postcard__tagbox {
    display: flex;
    flex-flow: row wrap;
    font-size: 14px;
    margin: 20px 0 0 0;
    padding: 0;
    justify-content: center;
  }




  &:hover .postcard__bar {
    width: 100px;
  }
}

@media screen and (min-width: 769px) {
  .postcard {
    flex-wrap: inherit;

    .postcard__title {
      font-size: 2rem;
    }

    .postcard__tagbox {
      justify-content: start;
    }

    .postcard__img {
      max-width: 300px;
      max-height: 100%;
      transition: transform 0.3s ease;
    }

    .postcard__text {
      padding: 3rem;
      width: 100%;
      font-size: 1rem;
    }



    &:hover .postcard__img {
      transform: scale(1.1);
    }

    &:nth-child(2n+1) {
      flex-direction: row;
    }

    &:nth-child(2n+0) {
      flex-direction: row-reverse;
    }


  }
}
@media screen and (min-width: 1024px){
  .postcard__text {
    padding: 2rem 3.5rem;
  }





}

/* COLORS */

.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  border-radius: 35px;
  font-size: 24px;
  line-height: 1.33;
}

.btn-circle {
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
  color: black;
}



</style>