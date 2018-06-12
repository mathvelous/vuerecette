<template>
  <header>
      <div class="logo">
        <router-link :to="{ name: 'Home'}">
        <img src="../assets/images/logo.gif" alt="logo">
        </router-link>
      </div>
      <div class="menu">
        <router-link :to="{ name: 'Home'}">Accueil</router-link>
        <router-link :to="{ name: 'AddRecipe'}">Ajout</router-link>
      </div>
  </header>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>
  header{
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 10vh;
  }
  .logo img{
    width: 150px;
    height: auto;
  }
  .menu{
    display: flex;
    justify-content: center;
  }
  .menu a{
    color: #f48225;
    text-transform: uppercase;
    padding: 0 30px;
    font-size: 0.9rem;
  }

</style>
