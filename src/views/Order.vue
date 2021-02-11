<template>
  <div class="order">
    <form class="form" method="POST">

      <input type="text" placeholder="inserez votre nom" value="?">
      <input type="text" placeholder="inserez votre prénom" value="?">
      <select name="select" value=""  placeholder="choisisez votre film" >
        <option value="">pirates des caraibes</option>
        <option value="">inception</option> 
      </select>
      
      <button>reservez</button>
    </form>
  </div>
</template>

<script>
export default {
  
}
</script>