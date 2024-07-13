
<template>

  <input v-model="text" type="search" name="Search" placeholder="Search..." />
  <template v-if="currentPlanets != null">
    <PlanetPreview v-for="plan, key in currentPlanets" :planet="plan" :key="key" :id="plan.id">
      <template #name>{{plan.name}}</template>
      <template #diameter>{{plan.diameter}}</template>
      <template #climate>{{(plan.climates && plan.climates?.length > 0) ? plan.climates[0] : undefined}}</template>
      <template #terrain>{{(plan.terrains && plan.terrains?.length > 0) ? plan.terrains[0] : undefined}}</template>
      <template #population>{{plan.population}}</template>
    </PlanetPreview>
    <nav class="pagination">
      <a v-for="n in Math.ceil(nItems / nItemsPerPage)" :key="n" class="page" @click="page = (n-1)" href="#">{{ n }}</a>
    </nav>
  </template>
</template>


<script setup lang="ts">
  
  import PlanetPreview from './PlanetPreview.vue'
  import { usePlanet } from '@/stores/planets'
  import type { PlanetType } from '@/types/planet';
  import { ref, computed, watch } from 'vue'


  const useP = usePlanet();
  const nItemsPerPage = 10
  
  const allPlanets = computed(() => {
    return Object.values(useP.getAllPlanets)
  })
  
  let nItems = ref(allPlanets.value.length)


  // We paginate the first time
  const page = ref(0)

  let currentPlanets = computed(() => {
    return getPaginatedPlanets(Object.values(useP.getAllPlanets), page.value)
  })

  // Search field
  const text = ref('')

  // watch works directly on a ref
  watch(text, async () => {
    let resultAll = await [...allPlanets.value.filter(planet => 
    {
      return planet.name.toLowerCase().includes(text.value.toLowerCase()) || 
      planet.climates?.find(clim => clim.toLowerCase().includes(text.value.toLowerCase())) || 
      planet.terrains?.find(terr => terr.toLowerCase().includes(text.value.toLowerCase()))
    })]

    currentPlanets = computed(() => {
      return getPaginatedPlanets(resultAll, page.value)
    })

    if (currentPlanets) {
      nItems.value = resultAll.length
      // let nPagesTotal = ref(Math.ceil(nItems.value / nItemsPerPage))
    }
  })



  /**
   * Get a copy of the elements 
   * @param page Page number to get (into the pagination)
   * @param itemsPerPage Nº of elements to show per page
   * @returns 
   */
  const getPaginatedPlanets = (planets:PlanetType[],  cpage: number): PlanetType[] => {
    // Get the planets like array to work with this better
    const mplanets = [...planets]
    // Obtain the end of the range to obtain
    const end = nItemsPerPage * (cpage + 1) < mplanets.length ? nItemsPerPage * (cpage + 1) : mplanets.length
    
    const objPlanetRes: PlanetType[]  = []
    // Get the specified range of planet
    const slicedData = mplanets.slice(nItemsPerPage * cpage, end )
    // Normalize the data result
    // slicedData.forEach(e =>  objPlanetRes = {...objPlanetRes, [e.id]: e})
    slicedData.forEach(e =>  objPlanetRes.push(e))

    return objPlanetRes
  }


</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

input[type="search"] {
  width: 100%; /* Ocupa el 100% del ancho */
  padding: 10px; /* Espacio interno para que no quede pegado a los bordes */
  border: 1px solid #ccc; /* Borde para mayor contraste */
  border-radius: 5px; /* Bordes redondeados */
  background-image: url("@/assets/lupa.svg"); /* Icono de lupa */
  background-repeat: no-repeat;
  background-position: right center; /* Posición del icono */
  background-position-x: calc(100% - 5px);
  background-size: 20px; /* Tamaño del icono */
}

.pagination a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border: 1px solid #ccc;
  margin: 0 5px;
  border-radius: 3px;
  transition: background-color 0.3s;
}

.pagination a:hover {
  background-color: #f0f0f0;
}

</style>