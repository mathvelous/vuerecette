import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddRecipe from '@/components/AddRecipe'
import Recipe from '@/components/Recipe'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/addrecipe',
      name: 'AddRecipe',
      component: AddRecipe
    },
    {
      path: '/recipe/:id',
      name: 'Recipe',
      component: Recipe
    }
  ]
})
