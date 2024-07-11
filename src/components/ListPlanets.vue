
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
  import { usePlanet } from '@/stores/planets'

  const useP = usePlanet();

</script>
