<template>
  <div class="order">
    <form class="form" @submit.prevent="postOrder()" method="POST">
      <input disabled type="text" :value="orderMovie.titre" />
      <input v-model="firstName" type="text" placeholder="inserez votre nom"  />
      <input v-model="lastName"  type="text" placeholder="inserez votre prénom"  />
      <input disabled type="text" :value="room.name" />
      <button>Reservez</button>
    </form>

    <div class="room-container" v-if="room.name">
      <!-- title room -->
      <p class="room-title">{{ room.name }}</p>

      <!-- places room -->
      <div class="room1">
        <div
          v-for="placeId in room.places"
          class="roomPlaces"
          :key="placeId"
        >
          <input v-model="checkPlaces" :value="placeId" type="checkbox"  />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {mapActions, mapState} from 'vuex'

export default {
  name: "order",
  data: () => {
    return {
      lastName:"",
      firstName:"",
      checkPlaces: [],
    };
  },
  methods: {
    ...mapActions(['fetchRoom']),
    postOrder() {
      axios({
        method: 'post',
        url: "http://localhost:8000/api/orders",
        data: {
          firstName: this.firstName,
          lastName: this.lastName,
          places : this.checkPlaces
        }
      });
    },
  },
  computed: {
    ...mapState(['room', 'orderMovie'])
  },
  mounted() {
    this.fetchRoom(this.orderMovie.roomId);
  }
};

</script>

<style scoped>
.form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 30vh;
}

.form input {
  margin-top: 20px;
  padding: 10px;
  letter-spacing: 2px;
}

.form select {
  margin-top: 20px;
  padding: 5px;
  letter-spacing: 2px;
}

.form button {
  margin-top: 20px;
  padding: 10px;
  letter-spacing: 2px;
}
.room-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  height: 30vh;
}
.roomRender {
  display: flex;
  flex-direction: column;
}

.room1,
.room2 {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
}
.roomPlaces {
  margin: 5px;
}

.room-title {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  color: white;
  font-variant: small-caps;
  letter-spacing: 5px;
  font-size: 30px;
}
</style>