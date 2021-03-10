<template>
  <div class="order">
      <div class="order__container-form">
        <form class="order__form" @submit.prevent="postOrder()" method="POST">
          <input class="order__input" disabled type="text" :value="orderMovie.titre" />
          <input class="order__input" v-model="firstName" type="text" placeholder="Nom"  />
          <input class="order__input" v-model="lastName"  type="text" placeholder="Prénom"  />
          <!-- <p class="order__room-title">{{ room.name }}</p> -->
          <button class="order__input">Reservez</button>
        </form>
          <!-- places room -->
          <div class="order__room1">
        
                <div v-if="room.name == 'Voie Lactée'">
                  <div v-for="(place, placeid) in placesRoom1" :key=placeid>
                      
                    <div v-if="place.isReserved == true">
                      <input id="checkboxreserved" type="checkboxreserved" disabled>
                    </div>

                    <div v-if="place.isReserved == false">
                      <input :value="`/api/places/${place.id}`" v-model="checkPlaces"  id="checkboxNotReserved" type="checkbox"  >   
                    </div>
                  </div>
              </div>
              

            <div v-if="room.name == 'Orion'">
              <div v-for="(place, placeid) in placesRoom2" :key=placeid>
                <div v-if="place.isReserved == true">
                  <input id="checkboxreserved" type="checkbox" disabled >
                </div>
                
                <div v-if="place.isReserved == false">
                  <input :value="`/api/places/${place.id}`" v-model="checkPlaces"  id="checkboxNotReserved" type="checkbox">
                </div>
              </div>
            </div>

          </div>
      </div>
       
        <!-- <div v-if="isModal">
          <div class="modal">
              Reservation faites
          </div>
        </div> -->
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
      placesRoom1: [],
      placesRoom2: [],
      isModal:false,
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

               this.placesRoom1 = response.data['hydra:member'];
                console.log(this.placesRoom1)
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

               this.placesRoom2 = response.data['hydra:member'];
              
          })
          .catch(error=>{
              console.log(error)
          })
         this.fetchRoom(this.orderMovie.roomId)
      },
      //  removeModal(){
      //   this.isModal= false 
      // },
      // ActiveModal(){
      //     this.isModal = true
      //     setTimeout(this.removeModal,4000)
      // },

  }
  ,
    computed: {
      ...mapState(['room', 'orderMovie']),

    },
    beforeMount(){
      this.fetchRoom(this.orderMovie.roomId)
    },
    
    mounted(){
      this.getPlacesOrdered1(),
      this.getPlacesOrdered2()
    },

  }
</script>

<style lang="scss" scoped>

.order {

  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
    &__form {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
   
    }

    &__container-form{
        width:40%;
        height:70%;
        margin:auto;
        z-index: 10;
        position:absolute;
            display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    }

    &__container-form:before{
    position:absolute;
    content:'';
    top:0;
    left:0;
    width:100%;
    z-index: -10;
    height:100%;
    opacity:0.4;
    background-color:black;
    border-radius:10px;
      
    }

    &__input {
    margin-top: 20px;
    padding: 20px;
    opacity:0.8;
    letter-spacing: 2px;
    color:rgb(133, 15, 15);
    font-weight: bolder;
    outline: none;
    background: #fffcf6;
    text-decoration: none;
    border-color: transparent;
    text-align: center;
    font-variant: small-caps;
   
    }

    ::placeholder { 
    color: rgb(133, 15, 15);
    padding: 10px;
    letter-spacing: 2px;
    font-weight: 600;
  
    }


    &__room-title {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    color: white;
    font-variant: small-caps;
    letter-spacing: 5px;
    font-size: 30px;
  }

  &__room1,
  &__room2 {
    display: flex;
    align-items: center;
    width: 40%;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
}

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

.roomPlaces {
  margin: 5px;
}





// .modal{
//   width:300px;
//   padding:10px;
//   background:white;
//   position:absolute;
//   top:20%;
//   left:20%;
// }
</style>
