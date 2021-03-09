<template>
  <div class="home">
    <button @click="onClick">
      Choisir film
    </button>
    <ul v-for="movie in movieList" :key="movie.id">
      <li>{{movie.overview}}</li>
      <li>{{movie.titre}}</li>
      <li>{{movie.date}}</li>
      <li>{{movie.time}}</li>
      <li>{{movie.gender}}</li>
      <li>{{movie.img}}</li>
      <div v-if="movie.img">
        <img :src="imgaddress + movie.img" />
        <button @click="order(movie)">reservez</button>
      </div>
    </ul>
  </div>
 
</template>

<script>

  import {mapActions, mapState} from 'vuex'
  export default {
    name: 'Home',
    data() {
      return {
        imgaddress: 'https://image.tmdb.org/t/p/w500/',
      };
    },
    methods: {
      ...mapActions(['fetchMovie','setOrderMovie']),
      async onClick() {
        await this.fetchMovie('422')
        await this.fetchMovie('550');
      },
      order(movie) {
        this.setOrderMovie(movie)
        this.$router.push({name: "Order"})
      }
    },
    computed:{
      ...mapState(['movieList']),
      
    },
  }

</script>

