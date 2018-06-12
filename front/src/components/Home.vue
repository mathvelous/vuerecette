<template>
  <main>
    <div v-for="recipe in listRecipe">
      <router-link :to="'/recipe/'+recipe.id"><p>{{recipe.name}}</p></router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      listRecipe: []
    }
  },
  mounted() {
    this.$http.get("http://localhost:3000/recipe")
      .then(response => {
        console.log(response.data)
        this.listRecipe = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
  main{
    display: flex;
    align-items: center;
    margin-top: 50px;
    flex-direction: column;
  }

  main div{
    padding: 20px;
    background-color: white;
    width: 60vw;
  }

  a{
    font-size: 1rem;
    color: black;
    transition: all ease 0.5s;
  }

  a:hover{
    color: #f48225;
  }

  main div p {
    padding-bottom: 15px;
    border-bottom: 1px solid grey;
  }
</style>
