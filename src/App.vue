
<template>
  <div id="app">
    <div id="nav">
      <h1>CineMachin</h1>
         <router-link to="/">Home</router-link> 
        <router-link to="/Rooms">Salles</router-link> 
        <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",

}

</script>

<style lang="scss">
*{
  padding:0;
  margin:0;
  box-sizing: border-box;
}

body{
background: rgb(154,48,48);
background: radial-gradient(circle, rgba(154,48,48,1) 0%, rgba(46,12,4,1) 100%);
width:100%;

}
body::before{
  position:absolute;
  content:"";
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: url(./assets/img/background.jpg);
  opacity:0.4;
  z-index: -10;
  background-size:cover;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  height:10vh;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


.footer{
  height:8vh;
  width:100%;
  position:absolute;
  bottom:0;
  color: white;
  position:relative;
  z-index: 20;
  display:flex;
  align-items: center;
  justify-content: flex-end;

}

.footer:before{
  content:"";
  position:absolute;
  top:0;
  left:0;
  background-color:#E59D9D;
  opacity:0.3;
  width:100%;
  height:100%;

}

.footer a{
  color:white;
  margin-left:0px;
  margin-right:100px;
  font-variant: small-caps;
  letter-spacing: 2px;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 800;
  font-size: 25px;
  text-decoration: none;


}


</style>
