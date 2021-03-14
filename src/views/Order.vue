<template>
  <div class="order">
      <div class="order__container-form">
        <form class="order__form" @submit.prevent="postOrder(), ActiveModal()" method="POST">
          <input class="order__input" disabled type="text" :value="orderMovie.titre" />
          <input class="order__input" v-model="firstName" type="text" placeholder="Nom"  />
          <input class="order__input" v-model="lastName"  type="text" placeholder="Prénom"  />
          <button class="order__button">Reservez</button>
        </form>
          <div class="order__room1">
        
                <div v-if="room.name == 'Voie Lactée'">
                  <div v-for="(place, placeid) in placesRoom1" :key=placeid>
                    <div v-if="place.isReserved == true">
                      <input id="checkboxReserved" type="checkbox" hidden disabled>
                      <label for="checkboxreserved">
                        <div class="order__checkboxReserved"></div>
                      </label>
                    </div>

                    <div v-if="place.isReserved == false">
                      <input :value="`/api/places/${place.id}`" class="checkbox" v-model="checkPlaces" hidden :id="place.id" type="checkbox"  > 
                      <label :for=place.id>
                        <div class="order__checkboxNotReserved"></div>
                      </label>  
                    </div>
                  </div>
                  <p class="order__RoomName">{{room.name}}</p>
              </div>
              

            <div v-if="room.name == 'Orion'">
              <div v-for="(place, placeid) in placesRoom2" :key=placeid>
                <div v-if="place.isReserved == true">
                  <label for="checkboxreserved">
                      <div class="order__checkboxReserved"></div>
                  </label> <input id="checkboxreserved" type="checkbox" hidden disabled >
                </div>
                
                <div v-if="place.isReserved == false">
                  <input :value="`/api/places/${place.id}`" class="checkbox" v-model="checkPlaces" hidden :id="place.id"  type="checkbox">
                  <label  :for=place.id>
                      <div class="order__checkboxNotReserved"></div>
                  </label> 
                </div>
              </div>
               <p class="order__RoomName">{{room.name}}</p>
            </div>
          </div>
      </div>
      
    
      <div v-if="checkPlaces.length > 0" class="order__ShopCart">
         
        <h1> Choix des places </h1>
        <div v-for="(places, placesid) in checkPlaces" :key="placesid" class="order__ShopCartElement">
          <p v-if="places.length == 13">Place numéro: <span class="order__ShopCartNumber">{{places.substr(12)}}</span></p>
          <p v-if="places.length == 14">Place numéro: <span class="order__ShopCartNumber">{{places.substr(12)}}</span></p>
          <p></p>
        </div>
        
      </div>
   

       
         <div v-if="isModal">
          <div class="order__modal">
            <p class="order__warningNotif" v-if="lastName.length < 4">
              {{error1}}
            </p>
             <p class="order__warningNotif" v-if="firstName.length < 4">
              {{error2}}
            </p>
             <p class="order__warningNotif" v-if="checkPlaces.length < 1">
              {{error3}}
            </p>
            <p class="order__ConfirmNotif" v-else-if="lastName.length >= 4 && firstName.length >= 4 && checkPlaces.length >= 1">
              {{notifSubmit}}
              
            </p>
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
      placesRoom1: [],
      placesRoom2: [],
      isModal:false,
      error1: 'Veuillez entrer un nom avec au moins 4 caractères',
      error2: 'Veuillez entrer un prénom au moins 4 caractères',
      error3: 'Veuillez choisir au moins une place',
      notifSubmit: 'vos places ont été reservées'
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


.checkbox:checked ~ label{
  transform:scale(1.3);
  background-color:rgb(221, 165, 60);
  transition: ease-in all 250ms;
  
}

label{
   transition: ease-in all 250ms;
}

.order {

  width: 100%;
      height: 75vh;
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
      width:70%;
      height:70%;
      margin:auto;
      z-index: 10;
      position:absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      box-shadow: 4px -3px 19px 10px rgba(0,0,0,0.26);
    
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
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
    }

    &__room1 div, &__room2 div{
      display: flex;
      border-radius: 2px;
      flex-wrap: inherit;
      justify-content: center;
      align-items: center;
    }

  &__room1 div div, &__room2 div div{
    margin: 5px;
  }

&__checkboxReserved{
    background-color:#ff3a08;
    width:20px;
    height:20px;
   box-shadow: 4px -3px 19px 10px rgba(0,0,0,0.26);
}

&__checkboxNotReserved{
  background-color:#7fc47c;
  width:20px;
  height:20px;
  transform:scale(1.2);
  transition: ease all 300ms;
  box-shadow: 4px -3px 19px 10px rgba(0,0,0,0.26);
}


&__RoomName{
  position: absolute;
  bottom: 100%;
  left: 50%;
  color: white;
  /* letter-spacing: 5px; */
  font-variant: small-caps;
  font-weight: 800;
  font-size: 35px;
  transform: translate(-50%, -10%);
  opacity: 0.4;

}

&__button{
  margin-top:20px;
  padding:8px;
  border-radius: 8px;
  letter-spacing: 2px;
  font-size:30px;
  font-weight: bold;
  font-variant: small-caps;
  outline: none;
  cursor: pointer;
  background: none;
  border:solid #FFD600 2px;
  color:white;
  position:relative;
  z-index: 10;
  transition:ease all 200ms;
  font-family: 'Rajdhani', sans-serif;
}

&__ShopCart{
  position:absolute;
  top:50%;
  right:10%;
  height:200px;
  width:300px;
  font-family: 'Rajdhani', sans-serif;
  display:flex;
  align-items: center;
  flex-direction: column;
  justify-content:flex-start;
  z-index: 10;
  box-shadow: -1px -3px 20px 4px rgba(0,0,0,0.66);



}

&__ShopCart::before{
  content:'';
  top:0;
  left:0;
  width:100%;
  height:100%;
  position:absolute;
  background-color:rgb(235, 214, 100);
  opacity:0.7;
  z-index: -10;
}

&__ShopCartNumber{
  font-weight:800;
  font-variant:small-caps;
  right: 4%;
}

&__modal{
  position:absolute;
  top:50%;
  left:0%;
  font-size:25px;

  height:200px;
  letter-spacing: 1px;
  font-variant: small-caps;
  padding:5px;
  border-radius:20px;
  font-family: 'Rajdhani', sans-serif;
  display:flex;
  align-items: center;
  flex-direction: column;
  justify-content:flex-start;
  z-index: 10;
}

&__warningNotif{
  color:red;
}

&__confirmNotif{
  color:green;
}


&__modal::before{
  content:'';
  top:0;
  left:0;
  width:100%;
  height:100%;
  position:absolute;
  background-color:rgb(223, 195, 106);
  box-shadow: -1px -3px 20px 4px rgba(0,0,0,0.66);
  -webkit-box-shadow: -1px -3px 20px 4px rgba(0,0,0,0.66);
  -moz-box-shadow: -1px -3px 20px 4px rgba(0,0,0,0.66);
  z-index: -10;
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

</style>
