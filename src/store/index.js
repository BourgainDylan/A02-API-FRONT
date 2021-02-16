import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movieList : [],
    // movies list
  },
  mutations: {
    setMovieList(state,movieList){
      state.movieList.push(movieList)
    }
  },
  actions: {
    fetchMovies(context, id){
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=7d2c42cd595c1e21b175923581d3036f`)
        .then(({data})  => {
          context.commit('setMovieList',{ 
            overview: data.overview,
            titre:    data.original_title,
            date:     data.release_date,
            time:     data.runtime,
            gender:   data.genres[0]['name'],
            img:      data.poster_path
          })
        })
        .catch(error => {
          console.error('error', error)
        });
    }
  },
  modules: {
  },
});
