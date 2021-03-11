
<template>
    <div class="rooms">
        <h1 class="rooms__Title">Salles</h1>
            <div class="rooms__ViewRoom" v-if="isActive1">
                    <div v-for="(place, idplace1) in places1" :key=idplace1>
                        <div>
                         
                            <div v-if="place.isReserved == true">
                                <input id="checkbox" type="checkbox" hidden disabled>
                                <label class="rooms__places"  for="checkbox">
                                    <div class="checkboxReserved" >
                                    </div>
                                </label>
                            </div>
                            <div v-if="place.isReserved == false">
                                <input id="checkbox"  type="checkbox" hidden checked disabled>
                                <label class="rooms__places"  for="checkbox">
                                    <div class="checkboxNotReserved" >
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="rooms__ViewRoom" v-if="isActive2">
                    <div v-for="(place, idplace2) in places2" :key=idplace2>
                               
                        <div v-if="place.isReserved == true">
                            <input id="checkbox" type="checkbox" hidden disabled>
                            <label class="rooms__placesReserved" for=checkbox>
                                    <div class="checkboxReserved" >
                                    </div>
                            </label>
                        </div>
                        <div v-if="place.isReserved == false">
                                
                             <input id="checkbox" type="checkbox" hidden >
                              <label  class="rooms__placesnotReserved" for=checkbox>
                                    <div class="checkboxNotReserved" >
                                    </div>
                            </label>

                            
                        </div>
                    </div>
            </div>

            <div class="rooms__container">

                <div class="rooms__CurrentRoom">
                    <button :class="{active: isActive1}" @click="clickVoieLactee">1</button>
                    <button :class="{active: isActive2}" @click="clickOrion">2</button>
                </div>

                <div v-if="isActive1 || isActive2 " class="rooms__Movieinfo">
                    <div class="rooms__MovieCart">
                        <div>
                        <img class="rooms__MovieImg" :src="imgaddress + movieRoom.img" >
                        </div>
                        <div>
                                <p><span class="rooms__MovieCartInfo">Titre: </span> {{movieRoom.titre}} </p>
                                <p><span class="rooms__MovieCartInfo">Durée: </span> {{movieRoom.time}} min</p>
                            <div v-if="room.name == 'Voie Lactée' && places1.length == 25">
                                <p ><span class="rooms__MovieCartInfo">places disponibles: </span> {{letReservePlaces1}}</p>
                                <p ><span class="rooms__MovieCartInfo">places totales: </span> {{places1.length}}</p>
                            </div>    
                            <div v-if="room.name == 'Orion' && places2.length == 15">
                                <p ><span class="rooms__MovieCartInfo">Places disponibles: </span>  {{letReservePlaces2}}</p>
                                <p ><span class="rooms__MovieCartInfo">Places totales: </span> {{places2.length}}</p>
                            </div>  
                        </div>
                       
                    </div>
                    <h2 class="rooms__RoomName">{{room.name}}</h2>
                </div>
          </div>
    </div>

</template>


<script>
import axios from 'axios'
import {mapActions, mapState} from 'vuex'

export default {
    name:"rooms",
    data: ()=>{
        return{
            isActive1: false,
            isActive2: false,
            places1: [],
            places2: [],
            letReservePlaces1:'',
            letReservePlaces2:'',
            imgaddress: 'https://image.tmdb.org/t/p/w500/',
            reccupplace: []
        }
    },
    methods: {

       ...mapActions(['fetchRoom','fetchMovieRoom']),

           getPlacesOrdered1(){
            axios
            .get('http://localhost:8000/api/rooms/1/places?page=1')
            .then(response =>{
                this.places1 = response.data['hydra:member'];
            })
            .catch(error=>{
                console.log(error)
            })

        },
          getPlacesOrdered2(){
            axios
            .get('http://localhost:8000/api/rooms/2/places?page=1')
            .then(response =>{
                 this.places2 = response.data['hydra:member'];
            })
            .catch(error=>{
                console.log(error)
            })
        },
         roomPlacesAvailable1(){
            this.places1.forEach(place => {
               if(place.isReserved == false){
                 this.letReservePlaces1++
                 this.letReservePlaces2 = 0
               }
               return this.letReservePlaces1
        });
        },
        roomPlacesAvailable2(){
            this.places2.forEach(place=>{
            if(place.isReserved == false){
                this.letReservePlaces2++
                this.letReservePlaces1 = 0
            }
            return this.letReservePlaces2
            })
            
        },
    
        clickVoieLactee(){
            this.fetchRoom('1');
            this.fetchMovieRoom('550');
            this.isActive1 = true;
            this.isActive2 = false;
            this.roomPlacesAvailable1()
        },
        clickOrion(){
            this.fetchRoom('2');
            this.fetchMovieRoom('422');
            this.isActive1 = false;
            this.isActive2 = true;
            this.roomPlacesAvailable2()
            
        },
    },
    computed: {
        ...mapState(['movieRoom','room']),
    },
    watch: {

    },
    created(){
        this.getPlacesOrdered1();
        this.getPlacesOrdered2();
    },
}
</script>

<style lang="scss" scoped>
  .active{
      color:green;
  }

.checkboxNotReserved{
   
    background-color:#7fc47c;
    border-radius:2px;
}

.checkboxReserved{
 
    background-color:#ff3a08;
    border-radius:2px;
}


    .rooms{
      
        font-family: 'Rajdhani', sans-serif;
        height: 40vh;
        font-family: "Rajdhani", sans-serif;
        display: flex;

        &__ViewRoom{
       display: flex;
    align-items: center;
    justify-content: SPACE-AROUND;
    flex-direction: column;
    height: 200px;
    flex-wrap: wrap;
    width: 500px;
    margin: auto;
        
        }
    &__Title{
        position:absolute;
        top:0;
        right:0;
        text-align:left;
        color:white;
        padding:30px;
        font-size:40px;
       letter-spacing: 10px;
       font-variant:small-caps
    }
    

    &__ViewRoom div{
        margin-bottom:20px;
        width:20px;
        box-shadow: -3px -3px 20px 1px rgba(0,0,0,0.26);
        height:20px;
    }
    &__container{
        z-index: 20;
        position:absolute;
        color:white;
        width:100%;
        height:40%;
        bottom:0;
        left:0;
        box-shadow: 2px -9px 46px 1px rgba(15, 15, 15, 0.55);
        -webkit-box-shadow: 2px -9px 46px 1px rgba(15, 15, 15, 0.55);
        -moz-box-shadow: 2px -9px 46px 1px rgba(15, 15, 15, 0.55);

    }

    &__placesReserved{
        width:100px;
        height:100px;
        background-color:#FFA800;
    }

    &__placesNotReserved{
        
    }
    &__container:before{
        content:'';
         background-color:#994343;
         opacity:0.3;
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index: -10;
    }

    &__CurrentRoom{
        position:absolute;  
        top: -30px;
        right: 100px;
        
    }

    &__CurrentRoom button{
        margin-left:20px;
        width:65px;
        height:65px;
        border-radius: 10px;
        outline:none;
        background-color:#C14D4D;
        border:none;
        color:white;
        font-weight: bold;
        font-size:40px;
        cursor:pointer;
        border-radius: 29px;
        background: #851414;
        box-shadow:  8px 8px 10px #791212,
             -8px -8px 10px #911616;

    }
    
    &__Movieinfo{
        display:flex;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: right;
    font-size: 30px;
    border-radius: 14px;
    

    }

    &__MovieCart{
    height: 100%;
    display: flex;
    display: flex;
    justify-content: center;
    text-align: initial;
    letter-spacing: 2px;
    }
    
    &__MovieCartInfo{
        font-weight:800;
    }

    &__MovieImg{
        width:300px;
        border-radius: 10px;
        margin-top: -100px;
        margin-right: 20px;
    }


   &__RoomName{
       position:absolute;
       bottom:0;
       right:0;
       padding:30px;
       letter-spacing: 10px;
       font-variant:small-caps
   }


}

</style>