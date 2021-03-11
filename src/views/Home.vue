<template>
  <div class="container">
    <button class="container__button" @click="onClick">
      Choisir film
    </button>
    <div class="container__card" v-for="movie in movieList" :key="movie.id">   <div v-if="movie.img">
      
        <div class="container__imgContainer">
          <img class="container_img" :src="imgaddress + movie.img" />
          <button class="container_imgButton" @click="order(movie)">Reserver</button>
        </div>
      </div>
      <div class="container__element">
        <div class="container__elementTop">
          <p><span class="container__StrongElement">Titre :</span> {{movie.titre}}</p>
          <p><span class="container__StrongElement">Date :</span> {{movie.date}}</p>
          <p><span class="container__StrongElement">Durée :</span> {{movie.time}} min</p>
          <p><span class="container__StrongElement">Genre :</span> {{movie.gender}}</p>
          <p><span class="container__StrongElement">salle :</span> {{movie.roomId}}</p>
        </div>
        <div class="container__elementBot">
          <p>{{movie.overview}}</p>
        </div>
      </div>
    </div>
  
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
        await this.fetchMovie('422');
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

<style lang="scss">

  *{
    padding:0;
    margin:0;
    box-sizing: border-box;
  }

  .container{
    width:80%;
    margin:auto;
    display: flex;
    flex-direction: column;
   justify-content: space-evenly;;
    align-items: center;
    height: 80vh;


    &__button{
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

  
    &__button::before{
      content:"";
      position:absolute;
      width:100%;
      height:100%;
      top:0;
      left:0;
      background-color: #FFD600;
      border-radius: 8px;
      opacity:10%;
      z-index: -10;
    }

  
    &__card{
      display:flex;
      align-items: center;
      justify-content: flex-end;
    }
    
    &__imgContainer{
      display:flex;
      flex-direction: column;
    }

    &_img{
      width:150px;
    }
    
    &_imgButton{
      padding:15px;
      font-size:18px;
      background-color:#FFD600;
      letter-spacing: 2px;
      font-weight: bold;
      font-variant: small-caps;
      outline: none;
      cursor:pointer;

    }

    &__element{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left:30px;
      font-family: 'Rajdhani', sans-serif;
      font-size:18px;
      letter-spacing: 1px;
      color:white;
      text-align: left;
    }

    &__StrongElement{
      font-weight: 800;
      font-variant: small-caps;
      font-size: 25px;
    }
    &__elementBot{
      border-top:solid 5px #FFD600;
      margin-top:30px;
         padding: 10px;
      font-size:14px;
      text-align: left;
      width:60%;
    }
  }
  

</style>