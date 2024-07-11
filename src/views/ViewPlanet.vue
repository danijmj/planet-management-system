<template>
    <div class="item" v-if="planet">
        <i class="mainicon">
            <component v-bind:is="components[Math.floor(Math.random() * components.length)]"></component>
        </i>
        <div class="details">
            <h3>
                {{planet.name}}
            </h3>
            <div class="actions">
                <div class="view">
                    <RouterLink :to="viewUrl" title="See">
                        <i><ToolingIcon/></i>
                    </RouterLink>
                </div>
                <div class="edit">
                    <RouterLink :to="viewEdit" title="Edit">
                        <i><EcosystemIcon/></i>
                    </RouterLink>
                </div>
                <div class="remove">
                    <a to="javascript:void(0)" v-on:click="openPopupDeletePlanet" title="Delete">
                        <i><SupportIcon/></i>
                    </a>
                </div>
            </div>
            <div v-if="planet">
                <p class="diameter">
                    <strong>Diameter: </strong>{{planet.diameter}}
                </p>
                <p class="climate">
                    <b>Climate: </b>{{planet.climates?.join(', ')}}
                </p>
                <p class="terrain">
                    <b>Terrain: </b>{{planet.terrains?.join(', ')}}
                </p>
                <p class="population">
                    <b>Population: </b>{{planet.population}}
                </p>
            </div>
        </div>
    </div>
    <PlanetDeletePopup :msg="'¿Seguro que desea eliminar el planeta '+ planet.name +'?'" v-if="showPopup">
        <template #yes><a :on-click="deletePlanet">yes</a></template>
        <template #no><a :on-click="notDeletePlanet">no</a></template>
    </PlanetDeletePopup>
</template>
  
<script lang="ts">
    import ToolingIcon from '@/components/icons/IconTooling.vue'
    import EcosystemIcon from '@/components/icons/IconEcosystem.vue'
    import SupportIcon from '@/components/icons/IconSupport.vue'
    import { RouterLink } from 'vue-router'
    import { ref } from 'vue'
    import IconPlanet from '@/components/icons/IconPlanet.vue'
    import IconPlanetTwo from '@/components/icons/IconPlanetTwo.vue'
    import PlanetDeletePopup from '@/components/PlanetDeletepopup.vue'
    import { usePlanet } from '@/stores/planets'

    export default {
        name: 'planet-preview',
        components: {
            RouterLink,
            EcosystemIcon,
            SupportIcon,
            PlanetDeletePopup,
            ToolingIcon
        },
        props: ['id', 'viewUrl', 'viewEdit', 'viewDelete'],

        setup(props) {
            const components = [
                IconPlanetTwo,
                IconPlanet
            ]

            // Set the storage
            const useP = usePlanet();

            let showPopup = ref(false);

            // Get a specified planet
            const planet = useP.getSpecifiedPlanet(props.id)

            // Method to delete a planet
            const openPopupDeletePlanet = () => {
                // To add some security
                if (props.id == planet.id)
                {
                    showPopup.value = true;
                }
            }

            // Method to delete a planet
            const deletePlanet = () => {
                // To add some security
                if (props.id == planet.id)
                {
                    showPopup.value = false;
                    useP.deleteItem(props.id)
                    
                }
            }

            
            // Method to delete a planet
            const notDeletePlanet = () => {
                // To add some security
                showPopup.value = false;
            }

            return{
                components,
                deletePlanet,
                notDeletePlanet,
                openPopupDeletePlanet,
                planet,
                showPopup
            } 
        }
    }
</script>
  
  <style scoped>
  .item {
    margin-top: 2rem;
    display: flex;
    position: relative;
  }
  
  .details {
    flex: 1;
    margin-left: 1rem;
    position: relative;
  }
  
  .actions {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  
    div {
        a {
            display: block;
            padding: 3px;
        }
        i {
            display: block;
            background: none;
            width: 25px;
            height: 25px;
            border: 1px solid var(--color-border);
            background: var(--color-background);
            position: relative;
            svg {
                text-align: center;
                top: calc(50% - 10px);
                left: calc(50% - 9px);
                position: absolute;
            }
        }
    }
  }
  
  .mainicon {
    display: flex;
    place-items: center;
    place-content: center;
    width: 25px;
    height: 25px;
  }
  
  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
  }
  p {
    padding: auto;
  }
  span {
    padding-right: 20px;
  }
  
  @media (min-width: 1024px) {
    .item {
      margin-top: 0;
      padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
      margin-bottom: 1rem;
    }
  
    .mainicon {
      top: calc(50% - 25px);
      left: -26px;
      position: absolute;
      border: 1px solid var(--color-border);
      background: var(--color-background);
      border-radius: 8px;
      width: 50px;
      height: 50px;
    }
  
    .item:first-of-type:before {
      display: none;
    }
  
    .item:last-of-type:after {
      display: none;
    }
  }
  </style>
  