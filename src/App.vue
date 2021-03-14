
<template>
  <div id="app">
    <div id="nav">
      <div id="navigation">
        <img class="logo" src="./assets/img/logo.svg">
        <router-link to="/">Home</router-link> 
        <router-link to="/Rooms">Salles</router-link> 

      </div>
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

.logo{
  width:400px;
}

#nav {

  height:10vh;
  font-family: 'Rajdhani', sans-serif;

#navigation{
    display: flex;
    align-items: center;
    justify-content: unset;
}
  a {
    font-weight: bold;
    text-decoration: none;
    color: #FFD600;
    margin-left:40px;
    font-variant: small-caps;
    letter-spacing: 2px;
    font-size:30px;

    &.router-link-exact-active {
      color: #ffffff;
      transform:scale(1.2);
      transition: ease all 300ms;
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
