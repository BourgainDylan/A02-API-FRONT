
<template>
    <div class="rooms">
        <h1>Salles</h1>
            <div class="RoomsContainer1" v-if="isActive1">
                    <div v-for="(placeStateRoom1, idplace1) in placesStateRoom1" :key=idplace1>
                        <div>
                            <p>{{placeStateRoom1}}-{{idplace1 + 1}}</p>
                            <div v-if="placeStateRoom1 == true">
                                <input id="checkbox" type="checkbox" hidden disabled>
                                <label  for="checkbox">
                                    <div class="checkboxReserved" >
                                    </div>
                                </label>
                            </div>
                            <div v-if="placeStateRoom1 == false">
                                <input id="checkbox"  type="checkbox" hidden checked disabled>
                                <label  for="checkbox">
                                    <div class="checkboxNotReserved" >
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="RoomsContainer2" v-if="isActive2">
                    <div v-for="(placeStateRoom2, idplace2) in placesStateRoom2" :key=idplace2>
                        <p>{{placeStateRoom2}}-{{idplace2 + 1}} </p>
                        <div v-if="placeStateRoom2 == true">
                            <input id="checkbox" type="checkbox" hidden disabled>
                            <label for=checkbox>
                                    <div class="checkboxReserved" >
                                    </div>
                            </label>
                        </div>
                        <div v-if="placeStateRoom2 == false">
                             <input id="checkbox" type="checkbox" hidden checked disabled>
                              <label for=checkbox>
                                    <div class="checkboxNotReserved" >
                                    </div>
                                </label>
                        </div>
                    </div>
            </div>
            
            <button :class="{active: isActive1}" @click="clickVoieLactee">1</button>
            <button :class="{active: isActive2}" @click="clickOrion">2</button>

            <div v-if="movieRoom.titre">
                <div>
                    <li>titre:{{movieRoom.titre}} </li>
                    <li>durée:{{movieRoom.time}} min</li>
                </div>
                <h2>{{room.name}}</h2>
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
            placesStateRoom1: [],
            placesStateRoom2: [],
        }
    },
    methods: {

       ...mapActions(['fetchRoom','fetchMovieRoom']),
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
         
        },
     
        clickVoieLactee(){
            this.fetchRoom('1')
            this.fetchMovieRoom('550')
            this.isActive1 = true
            this.isActive2 = false
        },
        clickOrion(){
            this.fetchRoom('2')
            this.fetchMovieRoom('422')
            this.isActive1 = false
            this.isActive2 = true
        },
    
    },
    computed: {
        ...mapState(['movieRoom','room']),
    },
    mounted(){
        this.getPlacesOrdered1();
        this.getPlacesOrdered2();
    }
  
}
</script>

<style  scoped>
  .active{
      color:green;
  }

.checkboxNotReserved{
    width:10px;
    height:10px;
    background-color:green
}

.checkboxReserved{
    width:10px;
    height:10px;
    background-color:red
}

.RoomsContainer1, .RoomsContainer2{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

</style>