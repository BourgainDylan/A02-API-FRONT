import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movieList : [],
    orderMovie : {},
    room: {},
    movieRoom: {},
    placesState:[]
  },
  mutations: {
    setMovieList(state,movieList){
      state.movieList.push(movieList)
    },
    setRoom(state, room){
      state.room = room;
    },
    setOrderMovie(state, movie){
      state.orderMovie = movie
    },
    setMovieRoom(state, movieRoom){
      state.movieRoom = movieRoom
    },
    setPlacesState(state,places){
      state.placesState = places
    }
  },
  actions: {
    /**
     * Fetch movie by id
     */
    fetchMovie(context, id){
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=7d2c42cd595c1e21b175923581d3036f`)
        .then(({data})  => {
          context.commit('setMovieList', { 
            overview: data.overview,
            titre:    data.original_title,
            date:     data.release_date,
            time:     data.runtime,
            gender:   data.genres[0]['name'],
            img:      data.poster_path,
            roomId:   context.state.movieList.length ? '2' : '1',
            id:       data.id,

          })
        })
        .catch(error => {
          console.error('error', error)
        });
    },
    
    /**
     * Fetch room by id
     */
    fetchRoom(context, roomsId) {
      axios
        .get(`http://127.0.0.1:8000/api/rooms/${roomsId}`)
        .then(({data}) =>{
          
          context.commit('setRoom',{
            name:   data.name,
            places: data.places
          })
        })
        .catch(error =>{
          console.error('error', error)
        });
    },

    /**
     * Set movie who want to order
     */
    setOrderMovie(context, movie){
      context.commit('setOrderMovie', movie)
    },

    fetchMovieRoom(context, id){
      axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=7d2c42cd595c1e21b175923581d3036f`)
      .then(({data})  => {
        context.commit('setMovieRoom', { 
          overview: data.overview,
          titre:    data.original_title,
          date:     data.release_date,
          time:     data.runtime,
          gender:   data.genres[0]['name'],
          img:      data.poster_path,
          id:       data.id
        })
      })
      .catch(error => {
        console.error('error', error)
      });
    },

    
  }

});
