<template>
  <div class="home">
    <button @click="LoadFilm1(),  LoadFilm2(), getRandomNumber1(), getRandomNumber2() ">Choisir
      film</button>
    <li v-for=" (result1, i) in results1" v-bind:key="i">{{result1}}</li>
    <div v-if="isrenderimg">
      <img :src="imgaddress + results1[5]" />
      <button>
        <router-link to="/order" >reservez</router-link>
      </button>
    </div>
    <li v-for=" (result2, i) in results2" v-bind:key="'A'+ i">{{result2}}</li>
    <div v-if="isrenderimg">
      <img :src="imgaddress + results2[5]" />
      <button  @click="getRooms2()">reserver</button>
    </div>
  </div>
</template>



<script>
  import axios from 'axios';

  export default {
    name: 'Home',
    data() {
      return {
        imgaddress: 'https://image.tmdb.org/t/p/w500/',
        results1: [],
        results2: [],
        idnumber1: '',
        idnumber2: '',
        isrenderimg: false,
        room1:'',
        room2:[],

      };
    },
    methods: {
      LoadFilm1() {
        axios
          .get('https://api.themoviedb.org/3/movie/' + this.idnumber1 +
            '?api_key=7d2c42cd595c1e21b175923581d3036f')
          .then(response => {
            this.results1 = [response.data.overview, response.data.original_title,
              response.data.release_date, response.data.runtime, response.data.genres[0][
              'name'],
              response.data.poster_path
            ]
          })
          .catch(error => {
            console.log(error.data);
          })
        this.isrenderimg = true;
      },
      LoadFilm2() {
        axios
          .get('https://api.themoviedb.org/3/movie/' + this.idnumber2 +
            '?api_key=7d2c42cd595c1e21b175923581d3036f')
          .then(response => {
            this.results2 = [response.data.overview, response.data.original_title,
              response.data.release_date, response.data.runtime, response.data.genres[0][
              'name'],
              response.data.poster_path
            ]
          })
          .catch(error => {
            console.log('error', error.data)
          });
        this.isrenderimg = true;
      },

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

      getRandomNumber1() {
        var random = Math.floor(Math.random() * (100 - 1) + 1);
        this.idnumber1 = random

      },
      getRandomNumber2() {
        var random = Math.floor(Math.random() * (100 - 1) + 1);
        this.idnumber2 = random

      }

    },
    mounted() {
      this.getRandomNumber1()
      this.getRandomNumber2()
    }
  }

</script>

