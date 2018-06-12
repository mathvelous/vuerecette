<template>
  <main>
    <section>
      <h1>{{Recipe.recipe.name}}</h1>
      <div class="info">
        <p>{{Recipe.recipe.time}} mm</p>
        <p>{{Recipe.recipe.difficulty}}</p>
        <p>{{Recipe.recipe.price}}</p>
      </div>
      <div class="row content">
        <div class="row">
          <div class="column">
            <div v-for="ingredient in Recipe.ingredients">
              <p>{{ingredient.name}}</p>
            </div>
          </div>
          <div class="column">
            <div v-for="ingredient in Recipe.ingredients">
              <p>{{ingredient.quantity}}</p>
            </div>
          </div>
        </div>
        <div class="steps">
          <div v-for="step in Recipe.steps">
            <p>{{step.text}}</p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <h2>Commentaires</h2>
      <form method="POST" @submit.prevent="submitForm">
        <textarea name="comment" id="" v-model="comment.text"></textarea>
        <div class="end">
          <button type="submit">Envoyer</button>
        </div>
      </form>
      <div>
        <div v-for="comment in Recipe.comments">
          <div class="comment">
            <p>{{comment.text}}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style>

  .content {
    margin-top: 50px;
  }

  .steps {
    text-align: justify;
    padding: 0 20px;
    font-size: 0.8rem;
  }

  .steps div {
    margin-bottom: 10px;
  }

  main {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  section {
    margin-top: 50px;
    width: 60vw;
    padding: 20px;
    background-color: white;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #f48225;
  }

  h2 {
    margin-bottom: 30px;
  }

  .info {
    display: flex;
    justify-content: space-around;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  button {
    border: none;
    background: #12123f;
    color: white;
    padding: 10px 10px;
    border-radius: 5px;
  }

  .end {
    display: flex;
    justify-content: flex-end;
  }

  textarea {
    width: 100%;
    height: 60px;
    resize: none;
    border: 1px solid #eeeeee;
    margin-bottom: 10px;
  }

  .comment{
    border: 1px solid #eeeeee;
    margin-bottom: 10px;
    margin-top: 10px;
    padding: 10px;
  }
</style>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        Recipe: '',
        id: '',
        comment: {
          text: '',
          id_recipe: ''
        }
      }
    },
    methods:{
      submitForm: function () {
        this.$http.post("http://localhost:3000/comment", {
          data: this.comment
        })
          .then(response => {
            console.log(response.data)
            this.comment.text = ''
            this.init()
          })
          .catch(error => {
            console.log(error)
          })
      },
      init: function () {
        this.id = window.location.pathname.split('/')[2]
        this.comment.id_recipe = this.id
        this.$http.get(`http://localhost:3000/recipe/${this.id}`)
          .then(response => {
            console.log(response.data)
            this.Recipe = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

