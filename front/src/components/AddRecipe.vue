<template>
  <section>
    <form method="POST" @submit.prevent="submitForm">
      <h1>Ajouter une recette</h1>
      <div class="column">
        <label for="name">Nom de la recette</label>
        <input type="text" id="name" name="name" v-model="recipe.add.name">
      </div>
      <div class="column">
        <label for="time">Temps de préparation en minutes</label>
        <input type="text" id="time" name="time" v-model="recipe.add.time">
      </div>
      <div>
        <p class="title">Difficulté</p>
        <div class="row centre space">
          <input type="radio" id="easy" name="difficulty" value="Facile" v-model="recipe.add.difficulty"/>
          <label for="easy">Facile</label>
          <input type="radio" id="medium" name="difficulty" value="Moyen" v-model="recipe.add.difficulty"/>
          <label for="medium">Moyen</label>
          <input type="radio" id="hard" name="difficulty" value="Difficile" v-model="recipe.add.difficulty"/>
          <label for="hard">Difficile</label>
        </div>
      </div>
      <div>
        <p class="title">Prix</p>
        <div class="row centre space">
          <input type="radio" id="cheap" name="price" value="Bon marché" v-model="recipe.add.price"/>
          <label for="cheap">Bon marché</label>
          <input type="radio" id="expensive" name="price" value="Cher" v-model="recipe.add.price"/>
          <label for="expensive">Cher</label>
          <input type="radio" id="very-expensive" name="price" value="assez cher" v-model="recipe.add.price"/>
          <label for="very-expensive">Assez cher</label>
        </div>
      </div>

      <h2>Ajouter des ingrédients</h2>
      <div class="row around">
        <div>
          <p>List des ingrédients</p>
          <input class="ingr" type="text" placeholder="exemple : farine" v-model="newIngredient">
        </div>
        <div>
          <p>List des quantités</p>
          <input class="ingr" type="text" placeholder="exemple : 100 gr" v-model="newQuantity">
        </div>
      </div>
      <div class="end">
        <button @click.prevent="addIngredient">Valider l'ingrédient</button>
      </div>

      <div class="mt-10">
        <div v-for="ingredient in ingredients">
          <p>{{ ingredient.name }} : {{ ingredient.quantity }}</p>
        </div>
      </div>

      <h2>Ajouter les étapes</h2>
      <div>
        <textarea type="text" placeholder="exemple : éplucher les légumes" v-model="newStep"></textarea>
        <div class="end">
          <button @click.prevent="addStep">Valider l'étape</button>
        </div>
      </div>
      <div v-for="step in steps">
        <p>{{ step.text }}</p>
      </div>

      <div class="submit">
        <button type="submit">Valider</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
  .around{
    justify-content: space-around;
  }
  .mt-10{
    margin-top: 10px;
  }
  .space label {
    margin: 0 10px;
    border: 1px solid transparent;
    padding: 5px;
    border-radius: 3px;
  }

  .space label:hover {
    border: 1px solid #f48225;
  }

  .centre {
    justify-content: center;
  }

  .title {
    font-size: 0.8rem;
    font-weight: bold;
    margin: 10px 0;
  }

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
    text-transform: uppercase;
    font-size: 1.5rem;
    color: #f48225;
    margin-top: 30px;
  }

  h2 {
    margin: 20px 0;
    font-family: Verdana;
    font-size: 1rem;
  }

  form {
    background-color: white;
    box-shadow: 2px 3px 5px rgb(155, 155, 155, .2);
    border-radius: 5px;
    padding: 20px;
    width: 50vw;
  }

  input {
    border: 1px solid #eeeeee;
    font-family: Verdana;
    height: 30px;
    border-radius: 3px;
    margin: 5px 0;
    padding: 5px;
  }

  .row {
    display: flex;
  }

  .ingr{
    width:250px;
  }

  li p {
    display: block;
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
  }

  textarea {
    width: 100%;
    height: 100px;
    resize: none;
    border: 1px solid #eeeeee;
  }

  button {
    border: none;
    background: #12123f;
    color: white;
    padding: 10px 10px;
    border-radius: 5px;
    margin-top: 10px;
  }




  input[type="radio"] {
    display: none;
  }

  .end {
    display: flex;
    justify-content: flex-end;
  }

  .submit {
    text-align: center;
  }

  .submit button {
    margin-top: 40px;
    width: 150px;
    background-color: #f48225;
  }
</style>

<script>
  export default {
    name: 'addRecipe',
    data() {
      return {
        recipe: {
          add: {
            name: '',
            time: '',
            difficulty: '',
            price: ''
          },
        },
        ingredients: [],
        newIngredient: '',
        newQuantity: '',
        steps: [],
        newStep: '',
        i: 0
      }
    },
    methods: {
      submitForm: function () {
        this.$http.post("http://localhost:3000/recipe/add", {
          data: this.recipe.add, ingredients: this.ingredients, steps: this.steps
        })
          .then(response => {
            console.log(response.data)
            this.$router.push(`/recipe/${response.data}`)
          })
          .catch(error => {
            console.log(error)
          })
      },
      addIngredient() {
        if (this.newIngredient == '' || this.newQuantity == '') {
          return
        }
        this.ingredients.push({
          name: this.newIngredient,
          quantity: this.newQuantity
        })
        this.newIngredient = ''
        this.newQuantity = ''
      },
      addStep(value) {
        this.steps.push({
          text: this.newStep,
        })
        this.newStep = ''
      },
    }
  }
</script>
