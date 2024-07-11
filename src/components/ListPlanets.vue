
<template>
  <PlanetPreview v-for="plan, key in useP.getAllPlanets" :key="key" :id="plan.id" viewUrl="" viewEdit= "" viewDelete= "">
    <template #name>{{plan.name}}</template>
    <template #diameter>{{plan.diameter}}</template>
    <template #climate>{{(plan.climates && plan.climates?.length > 0) ? plan.climates[0] : undefined}}</template>
    <template #terrain>{{(plan.terrains && plan.terrains?.length > 0) ? plan.terrains[0] : undefined}}</template>
    <template #population>{{plan.population}}</template>
  </PlanetPreview>
</template>


<script setup lang="ts">
  
  import PlanetPreview from './PlanetPreview.vue'
  import { http, type ApiOptions } from '@/utils/http/index'
  import { usePlanet } from '@/stores/planets'


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

  http.graphqlCall(graphqlQuery, opt).then((res) => {
    console.log("data", res)
    useP.setAllPlanets(res.data.data.allPlanets.planets)
  })
  
  // console.log("planets", planets)


</script>
