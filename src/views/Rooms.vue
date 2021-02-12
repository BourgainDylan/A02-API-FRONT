
<template>
  <div class="about">
    <h1>Salles</h1>
        <div v-if="RoomActive1">
            <RoomPattern1 />
        </div>
        <div v-if="RoomActive2" >
            <RoomPattern2 />
        </div>
        <button v-bind:class="{active: IsActive1}" @click="RoomIsActive1()">La voie lactée</button>
        <button v-bind:class="{active: IsActive2}" @click="RoomIsActive2()">Orion</button>

  </div>
</template>


<script>
import RoomPattern1 from '@/components/RoomPattern1'
import RoomPattern2 from '@/components/RoomPattern2'



export default {
    name:"rooms",
    data: ()=>{
        return{
            RoomActive1 : true,
            IsActive1 : true,
            RoomActive2 : false,
            IsActive2: false

        }
    },
    methods:{
        RoomIsActive1(){
            this.RoomActive1 =true;
            this.RoomActive2 =false;
            this.IsActive1 = true;
            this.IsActive2= false

        },
        RoomIsActive2(){
            this.RoomActive1 =false;
            this.RoomActive2 =true;
            this.IsActive2 = true;
            this.IsActive1= false
        }
    },
    components: {
    RoomPattern1,
    RoomPattern2,

  },

}
</script>

<style scoped>
    .active{
        color:green;
    }
</style>