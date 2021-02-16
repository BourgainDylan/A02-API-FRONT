<template>
  <div class="order">
    <form class="form" @submit.prevent="postOrder()" method="POST">
      <input v-model="firstName" type="text" placeholder="inserez votre nom"  />
      <input   v-model="lastName"  type="text" placeholder="inserez votre prénom"  />
      <select
        v-model="isRoom"
        name="select"
        @click="roomChange()"
        placeholder="choisissez votre film"
      >
        <option value="" selected disabled hidden>Films</option>
        <option value="isRoom1">pirates des caraibes</option>
        <option value="isRoom2">inception</option>
      </select>
      <button>reservez</button>
    </form>

    <div class="room-container">
      <!-- <p>{{rooms1}}</p> -->
      <div class="room1" v-if="isRoom1">
        <div
          v-for="(Rooms1, idRoom1) in rooms1Places"
          class="roomPlaces"
          v-bind:key="idRoom1"
        >
          <input type="checkbox" value="" />
        </div>
        <p class="room-title">{{ rooms1 }}</p>
      </div>
      <div class="room2" v-if="isRoom2">
        <div
          v-for="(Rooms2, id) in rooms2Places"
          class="roomPlaces"
          v-bind:key="'A' + id"
        >
          <input 
          type="checkbox" 
          style='visibility:hidden'
          :id="Rooms2"
          :value="Rooms2" 
          v-model="checkPlaces"
   
          />
          <label @click="placesChecked()" v-bind:for="Rooms2">
            <i  class="fas fa-chair notif"></i>
              <div class="notif"></div>
        
          </label>
        </div>
        <p class="room-title">{{ rooms2 }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "order",
  data: () => {
    return {
      rooms1: "",
      rooms2: "",
      rooms1Places: [],
      rooms2Places: [],
      isRoom: "",
      isRoom1: true,
      isRoom2: false,
      lastName:"",
      firstName:"",
      checkPlaces: [],
      
      
    };
  },
  methods: {
    getRooms1() {
      axios
        .get("http://127.0.0.1:8000/api/rooms/1")
        .then((response) => {
          this.rooms1 = response.data.name;
          this.rooms1Places = response.data.places;
          console.log(this.rooms1.name);
          console.log(this.rooms1Places);
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
    getRooms2() {
      axios
        .get("http://127.0.0.1:8000/api/rooms/2")
        .then((Response) => {
          this.rooms2 = Response.data.name;
          this.rooms2Places = Response.data.places;
          console.log(this.rooms2);
          console.log(this.rooms2Places);
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
    postOrder() {
            axios({
                method: 'post',
                url: "http://localhost:8000/api/orders" ,
                data: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    places :this.checkPlaces

                    }
                    
    });
     
    },

 
    roomChange() {
      if (this.isRoom == "isRoom1") {
            this.isRoom1 = true;
            this.isRoom2 = false;
      } else if (this.isRoom == "isRoom2") {
            this.isRoom1 = false;
            this.isRoom2 = true;
      }
    },

    
    //   checkboxWatch() {
    //           const checkbox = document.getElementsByTagName('input');
    //             for (let i = 0; i < checkbox.length; i++) {
    //               if(checkbox[i].checked){
    //                 return true
    //               }else{
    //                 return false
    //               }
    //             }
    //         },
    // placesChecked(){
    //   const notif = document.querySelector('notif');
    //   if(this.checkboxWatch()){
    //     notif.ClassList.add('notif-check')
    //   }
    //     console.log(this.checkboxWatch())
    // },
    
   
  },
  computed: {
      
  
  },
  mounted() {
        this.getRooms1();
        this.getRooms2();
  },
  // components:{
  //   formOrder
  // }
};

</script>

<style scoped>
.form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 30vh;
}

.form input {
  margin-top: 20px;
  padding: 10px;
  letter-spacing: 2px;
}

.form select {
  margin-top: 20px;
  padding: 5px;
  letter-spacing: 2px;
}

.form button {
  margin-top: 20px;
  padding: 10px;
  letter-spacing: 2px;
}
.room-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  height: 30vh;
}
.roomRender {
  display: flex;
  flex-direction: column;
}

.room1,
.room2 {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
}
.roomPlaces {
  margin: 5px;
}

.room-title {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  color: white;
  font-variant: small-caps;
  letter-spacing: 5px;
  font-size: 30px;
}

/* 
.notif{
  background-color:white;
  width:20px;
  height:20px;
}
.notif-check{
  background:green;
}
.notif-not-check{
  background:white;
} */
</style>