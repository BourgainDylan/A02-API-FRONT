<template>
  <div class="order">
    <form class="form" @submit.prevent="postOrder()" method="POST">
      <input disabled type="text" :value="orderMovie.titre" />
      <input v-model="firstName" type="text" placeholder="inserez votre nom"  />
      <input v-model="lastName"  type="text" placeholder="inserez votre prénom"  />
      <input disabled type="text" :value="room.name" />
      <p class="room-title">{{ room.name }}</p>
    </form>
      <!-- places room -->
      <div class="room1">
        <div v-if="room.name == 'Voie Lactée'">
          <div v-for="(placeStateRoom1, idplace1) in placesStateRoom1" :key=idplace1>
              <p>{{placeStateRoom1}}-{{idplace1 +1}}</p>
              <div v-if="placeStateRoom1 == true">
                <input id="checkbox" type="checkbox"  disabled>
                  <label  for="checkbox">
                  <div class="checkboxReserved" >
                  </div>
                  </label>
              </div>
              <div v-if="placeStateRoom1 == false">
                <input :value="`/api/places/${idplace1}`" v-model="checkPlaces"  id="checkbox" type="checkbox"  >
                <label  for="checkbox">
                  <div class="checkboxNotReserved" >
                  </div>
                </label>
              </div>
            </div>
        </div>
      <div v-if="room.name == 'Orion'">
        <div v-for="(placeStateRoom2, idplace2) in placesStateRoom2" :key=idplace2>
            <p>{{placeStateRoom2}}-{{idplace2 +1}}</p>
            <div v-if="placeStateRoom2 == true">
              <input id="checkbox" type="checkbox"  disabled>
                <label  for="checkbox">
                <div class="checkboxReserved" >
                </div>
                </label>
            </div>
            <div v-if="placeStateRoom2 == false">
              <input :value="`/api/places/${idplace2}`" v-model="checkPlaces" id="checkbox" type="checkbox"  >
              <label  for="checkbox">
                <div class="checkboxNotReserved" >
                </div>
              </label>
            </div>
          </div>
      </div>
    </div>
        <button @click="ActiveModal">Reservez</button>
        <div v-if="isModal">
          <div class="modal">
              Reservation faite !
          </div>
        </div>
  </div>
</template>
<script>
import axios from "axios";
import {mapActions, mapState} from 'vuex'

export default {
  name: "order",
  data: () => {
    return {
      lastName:"",
      firstName:"",
      checkPlaces: [],
      placesStateRoom1:[],
      placesStateRoom2:[],
      isModal:false
    };
  },
  methods: {
    ...mapActions(['fetchRoom']),
    postOrder() {
      axios({
        method: 'post',
        url: "http://localhost:8000/api/orders",
        data: {
          firstName: this.firstName,
          lastName: this.lastName,
          places : this.checkPlaces
        }
      });
    },
      getPlacesOrdered1(){
          axios
          .get('http://localhost:8000/api/rooms/1/places?page=1')
          .then(response =>{

              const places = response.data['hydra:member'];
              
              for (let i = 0; i < places.length; i++) {
                  this.placesStateRoom1[i] = places[i].isReserved
              }
          })
          .catch(error=>{
              console.log(error)

          })
          this.fetchRoom(this.orderMovie.roomId)
      },
       getPlacesOrdered2(){
          axios
          .get('http://localhost:8000/api/rooms/2/places?page=1')
          .then(response =>{

              const places = response.data['hydra:member'];
              
              for (let i = 0; i < places.length; i++) {
                  this.placesStateRoom2[i] = places[i].isReserved
              }
          })
          .catch(error=>{
              console.log(error)
          })
          this.fetchRoom(this.orderMovie.roomId)
      },
       removeModal(){
        this.isModal= false 
      },
      ActiveModal(){
          this.isModal = true
          setTimeout(this.removeModal,4000)
      },
     
  

  }
  ,
  computed: {
    ...mapState(['room', 'orderMovie'])
  },
  mounted(){
    this.getPlacesOrdered1(),
    this.getPlacesOrdered2()

  
   
  },

}

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

.checkboxReserved{
    width:10px;
    height:10px;
    background-color:red
}
.checkboxNotReserved{
  width:10px;
    height:10px;
    background-color:green
}

.modal{
  width:300px;
  padding:10px;
  background:white;
  position:absolute;
  top:20%;
  left:20%;
}


</style>

<!-- <div
          v-for="placeId in room.places"
          class="roomPlaces"
          :key="placeId"
        >
          <input v-model="checkPlaces" :value="placeId" type="checkbox"  />
        </div> -->