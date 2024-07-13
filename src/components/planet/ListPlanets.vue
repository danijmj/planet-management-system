
<template>
  <div class="form-layer">
    <input v-model="text" type="search" name="Search" placeholder="Search..." />
    <div class="order">
      <span>Order: </span>
      <select v-model="typeOrder" @change="order">
      <option value="">Order By</option>
      <option value="name">Name</option>
      <option value="diameter">Diameter</option>
      <option value="climate">Climate</option>
      <option value="terrain">Terrain</option>
      <option value="population">Population</option>
    </select>
    <select v-model="senseOrder" @change="order">
      <option value="asc">Up</option>
      <option value="desc">Down</option>
    </select>
  </div>
</div>
  <template v-if="currentPlanets != null">
    <PlanetPreview v-for="plan, key in currentPlanets" :planet="plan" :key="key" :id="plan.id">
      <template #name>{{plan.name}}</template>
      <template #diameter>{{plan.diameter}}</template>
      <template #climate>{{(plan.climates && plan.climates?.length > 0) ? plan.climates.join(', ') : undefined}}</template>
      <template #terrain>{{(plan.terrains && plan.terrains?.length > 0) ? plan.terrains.join(', ') : undefined}}</template>
      <template #population>{{plan.population}}</template>
    </PlanetPreview>
    <nav class="pagination">
      <a v-for="n in Math.ceil(nItems / nItemsPerPage)" :key="n" :class="{'page': true, 'active': (page == (n - 1))}" @click="page = (n-1)" :href="'#'+n ">{{ n }}</a>
    </nav>
  </template>
</template>


<script setup lang="ts">
  
  import PlanetPreview from './PlanetPreview.vue'
  import { usePlanet } from '@/stores/planets'
  import type { PlanetType } from '@/types/planet';
  import { ref, computed, watch, type Ref } from 'vue'


  const useP = usePlanet();
  const nItemsPerPage = 10
  // Get all planets
  const allPlanets = computed(() => {
    return Object.values(useP.getAllPlanets)
  })
  
  let nItems = ref(allPlanets.value.length)


  // We paginate the first time
  const page = ref(0)

  let currentPlanets = computed(() => {
    return getPaginatedPlanets(Object.values(useP.getAllPlanets), page.value)
  })

  // Field with current filer data (without pagination)
  let resultAll: Ref<PlanetType[]>;
  if (allPlanets.value) {
    resultAll = ref(allPlanets.value);
  }

  // Search field
  const text = ref('')

  // watch works directly on a ref
  watch(text, async () => {

    resultAll.value = await [...allPlanets.value.filter(planet => 
    {
      return planet.name.toLowerCase().includes(text.value.toLowerCase()) || 
      planet.climates?.find(clim => clim.toLowerCase().includes(text.value.toLowerCase())) || 
      planet.terrains?.find(terr => terr.toLowerCase().includes(text.value.toLowerCase()))
    })]

    order()

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


  /**
   * Order section
   */
  const typeOrder = ref('')
  const senseOrder = ref('asc') 
  const order = () => {

    const orderAscStringSimple = (ca:string, cb:string) => {return ca < cb ? -1 : 1}
    const orderDescStringSimple = (ca:string, cb:string) => {return ca > cb ? -1 : 1}

    console.log("entrado en order")
    if (typeOrder.value) {
      
      console.log("typeOrder.value", typeOrder.value)
      console.log("senseOrder.value", senseOrder.value)
      switch(typeOrder.value) {

        // Ordering the names
        case 'name':
          resultAll.value.sort((a: PlanetType, b: PlanetType) => {
            if (senseOrder.value == 'asc'){
              return (a.name < b.name) ? -1 : 1
            } else if (senseOrder.value == 'desc') {
              return (a.name > b.name) ? -1 : 1
            } else {
              return 0
            }
          })
          break;

        case 'diameter':
          resultAll.value.sort((a: PlanetType, b: PlanetType) => {
            const va = a.diameter ? a.diameter : 0
            const vb = b.diameter ? b.diameter : 0
            if (senseOrder.value == 'asc'){
              return va - vb
            } else if (senseOrder.value == 'desc') {
              return vb - va
            } else {
              return 0
            }
          })
          break;

        case 'climate':
          resultAll.value.sort((a: PlanetType, b: PlanetType) => {
            if (senseOrder.value == 'asc' && a.climates && b.climates){
              return (a.climates.sort(orderAscStringSimple)[0] < b.climates.sort(orderAscStringSimple)[0]) ? -1 : 1
            } else if (senseOrder.value == 'desc' && a.climates && b.climates) {
              return (a.climates.sort(orderDescStringSimple)[0] > b.climates.sort(orderDescStringSimple)[0]) ? -1 : 1
            } else {
              return 0
            }
          })
          break;

        case 'terrain':
          resultAll.value.sort((a: PlanetType, b: PlanetType) => {
            if (senseOrder.value == 'asc' && a.terrains && b.terrains){
              return (a.terrains.sort(orderAscStringSimple)[0] < b.terrains.sort(orderAscStringSimple)[0]) ? -1 : 1
            } else if (senseOrder.value == 'desc' && a.terrains && b.terrains) {
              return (a.terrains.sort(orderDescStringSimple)[0] > b.terrains.sort(orderDescStringSimple)[0]) ? -1 : 1
            } else {
              return 0
            }
          })
          break;

        case 'population':
          resultAll.value.sort((a: PlanetType, b: PlanetType) => {
            const va = a.population ? a.population : 0
            const vb = b.population ? b.population : 0
            if (senseOrder.value == 'asc'){
              return va - vb
            } else if (senseOrder.value == 'desc') {
              return vb - va
            } else {
              return 0
            }
          })
          break;
      }

      
    }
    
    page.value = 0
    computedVarsPlanets()
  }

  const computedVarsPlanets = () => {
    
    currentPlanets = computed(() => {
      return getPaginatedPlanets(resultAll.value, page.value)
    })

    if (currentPlanets) {
      nItems.value = resultAll.value.length
      // let nPagesTotal = ref(Math.ceil(nItems.value / nItemsPerPage))
    }
  }


</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

input[type="search"] {
  width: 100%; 
  padding: 10px; 
  border: 1px solid var(--color-border); 
  border-radius: 5px; 
  background-image: url("@/assets/lupa.svg"); 
  background-repeat: no-repeat;
  background-position: right center; 
  background-position-x: calc(100% - 5px);
  background-size: 20px;
}

.form-layer {
  margin-top: 15px;
  margin-bottom: 30px;

  display: flex;
  flex-direction: column;
}

.order {
  align-self: flex-end;
  flex-direction: column-reverse;
  margin-top: 15px;
}

select {
  border: 1px solid var(--color-border); 
  border-radius: 5px; 
  background-repeat: no-repeat;
  background-position: right center;
  height: 30px;
  min-width: 50px;
  padding-right: 15px;
  padding-left: 15px;
  margin-left: 20px;
}

.pagination a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border: 1px solid #ccc;
  margin: 0 5px;
  border-radius: 3px;
  transition: background-color 0.3s;

  &.active{
    background-color: #f0f0f0;
  }

}

.pagination a:hover {
  background-color: #f0f0f0;
}



</style>