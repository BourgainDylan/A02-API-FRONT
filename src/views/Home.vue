<template>
  <div class="home">
    <button @click="onClick">
      Choisir film
    </button>
    <ul v-for="(movie, id) in movieList" :key="id">
      <li>{{movie.overview}}</li>
      <li>{{movie.titre}}</li>
      <li>{{movie.date}}</li>
      <li>{{movie.time}}</li>
      <li>{{movie.gender}}</li>
      <li>{{movie.img}}</li>
      <div v-if="movie.img">
        <img :src="imgaddress + movie.img" />
        <button>
          <router-link to="/order" >reservez</router-link>
        </button>
      </div>
    </ul>
    
  </div>
 
</template>

<script>
  import axios from 'axios';
  import {mapActions, mapState} from 'vuex'
  export default {
    name: 'Home',
    data() {
      return {
        imgaddress: 'https://image.tmdb.org/t/p/w500/',
        room1:'',
        room2:'',
      };
    },
    methods: {
      ...mapActions(['fetchMovies']),

      getRooms1() {
           
        axios
          .get('http://127.0.0.1:8000/api/rooms/1')
          .then(response => {
            this.room1 = response.data;
            console.log(this.room1)
        
          })
          .catch(error => {
            console.log('error', error.data)
          });
       
      },
      getRooms2() {
        axios
          .get('http://127.0.0.1:8000/api/rooms/2')
          .then(response => {
            this.room2 = response.data;
            console.log(this.room2)
        
          })
          .catch(error => {
            console.log('error', error.data)
            
          });
       
      },
      
      onClick() {
        this.fetchMovies('422');
        this.fetchMovies('550');
      }

    },
    computed:{
      ...mapState(['movieList']),
      
    },
    mounted() {
     
    }
  }

</script>

