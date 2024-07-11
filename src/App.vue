<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import InitMessage from './components/InitMessage.vue'
</script>

<template>
  <header>
    <div class="container_head">

      <img alt="Vue logo" class="logo" src="@/assets/starwars.png"/>
      
      <div class="wrapper">
        <InitMessage msg="Star Wars" />
        
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<script lang="ts">
import { usePlanet } from '@/stores/planets'
import { http, type ApiOptions } from '@/utils/http/index'

// Config of the graphql petition
const opt:ApiOptions = 
{
  url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  contentType: 'application/json'
}
const graphqlQuery = {
  query: `query Query {
      allPlanets {
        planets {
          id
          name
          orbitalPeriod
          gravity
          diameter
          climates
          population
          terrains
          surfaceWater
          rotationPeriod
          residentConnection {
            residents {
              id
              name
              mass
              skinColor
              height
              eyeColor
              edited
              created
            }
          }
          edited
          created
        }
      }
    }`
}
const useP = usePlanet();

// Init call to the api to get all planets (and their habitants)
http.graphqlCall(graphqlQuery, opt).then((res) => {
  console.log("data", res)
  useP.setAllPlanets(res.data.data.allPlanets.planets)
})
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
}
.container_head {
  position: absolute;
  transform: translatey(-50%);
  top: 50%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  width: 240px;
  height: auto;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
