<template>
    <div class="wrapper" v-if="planet">
        <div class="head">
            <i class="mainicon">
                <component v-bind:is="planetComponent"></component>
            </i>
            <h2>
                {{planet.name}}
            </h2>
            <div class="actions">
                <div class="edit">
                    <RouterLink :to="urlEdit" title="Edit">
                        <i><IconEdit/></i>
                    </RouterLink>
                </div>
                <div class="remove">
                    <a to="javascript:void(0)" v-on:click="openPopupDeletePlanet" title="Delete">
                        <i><IconDelete/></i>
                    </a>
                </div>
            </div>
        </div>
        
        <div class="details">
            <div class="row" v-if="planet">
                <div class="col">
                    <strong class="legend">Information:</strong>
                    <p class="diameter" v-if="planet.diameter">
                        <strong>Diameter: </strong>{{planet.diameter}}
                    </p>
                    <p class="climate" v-if="planet.climates && planet.climates.length > 0">
                        <b>Climate: </b>{{planet.climates?.join(', ')}}
                    </p>
                    <p class="terrain" v-if="planet.terrains && planet.terrains.length > 0">
                        <b>Terrain: </b>{{planet.terrains?.join(', ')}}
                    </p>
                    <p class="population" v-if="planet.population">
                        <b>Population: </b>{{planet.population}}
                    </p>
                </div>

                <div v-if="planet.residentConnection?.residents && planet.residentConnection?.residents.length > 0" class="col residents">
                    <strong class="legend">Residents:</strong>
                    <ResidentComponent v-for="resident, key in planet.residentConnection?.residents" :resident="resident" :key="key"></ResidentComponent>
                </div>
            </div>
        </div>
    </div>
    <PlanetDeletePopup :msg="'¿Seguro que desea eliminar el planeta '+ planet.name +'?'" v-if="showPopup" @delete="deletePlanet" @no-delete="notDeletePlanet" />
</template>
  
<script lang="ts">
    import IconEdit from '@/components/icons/IconEdit.vue'
    import IconDelete from '@/components/icons/IconDelete.vue'
    import { RouterLink, useRouter } from 'vue-router'
    import { RouteNames } from '@/router'
    import { ref, computed } from 'vue'
    import IconPlanet from '@/components/icons/IconPlanet.vue'
    import IconPlanetTwo from '@/components/icons/IconPlanetTwo.vue'
    import PlanetDeletePopup from '@/components/planet/PlanetDeletepopup.vue'
    import { usePlanet } from '@/stores/planets'
    import ResidentComponent from '@/components/residents/ResidentComponent.vue'

    export default {
        name: 'view-planet',
        components: {
            RouterLink,
            useRouter,
            ResidentComponent,
            IconEdit,
            IconDelete,
            PlanetDeletePopup
        },
        props: ['id'],

        setup(props) {
            const icoComponents = [
                IconPlanetTwo,
                IconPlanet
            ]

            // We set the planet icon
            const planetComponent = computed(() => {
                return icoComponents[Math.floor(Math.random() * icoComponents.length)]
            })

            // Set the edit url
            const urlEdit = { name: RouteNames.EDITPLANET, params: { id: props.id }};

            // Set the storage
            const useP = usePlanet();

            let showPopup = ref(false);

            // Get a specified planet
            const planet = useP.getSpecifiedPlanet(props.id)

            // Open the popup to delete
            const openPopupDeletePlanet = () => {
                showPopup.value = true;
            }

            const router = useRouter()

            // Method to delete a planet
            const deletePlanet = () => {
                // To add some security
                showPopup.value = false;
                useP.deleteItem(props.id)

                // Navegate to the home
                router.push({
                    name: RouteNames.HOME
                })
            }

            // Method to cancel de deletion
            const notDeletePlanet = () => {
                showPopup.value = false;
            }

            return{
                planetComponent,
                deletePlanet,
                notDeletePlanet,
                openPopupDeletePlanet,
                planet,
                showPopup,
                urlEdit
            } 
        }
    }
</script>
  
<style>
    .head {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        -ms-flex-align: end;
        align-items: flex-end;
        width: 100%;
        margin-bottom: 30px;
    }

    h2 {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
    }

    .actions {
        position: relative;
        /* right: -12px; */
        display: flex;
        /* flex-direction: row; */
        flex-wrap: nowrap;
        padding: 5px 0px 8px;
        align-self: flex-end;
        margin-left: auto;

        div {
            a {
                display: block;
                padding: 3px;
            }
            i {
                cursor: pointer;
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

    @media (min-width: 1024px) {
        .actions {
            padding: 5px 0px 11px;
            div {
                i {
                    width: 50px;
                    height: 50px;
                }
            }
        }
    }

    .mainicon {
        display: flex;
        place-items: center;
        place-content: center;
        width: 50px;
        height: 50px;
    }

    @media (min-width: 1024px) {
        
        h2 {
            margin-left: 20px;
            font-size: 1.8rem;
        }
        .mainicon {
            position: relative;
            width: 80px;
            height: 80px;
        }
    }
</style>

<style scoped>
  

    p {
        padding-bottom: 5px;
    }
    
  
    .details {
        flex: 1;
        margin-left: 1rem;
        position: relative;
    }
    
    .legend {
        font-weight: 600;
        font-size: 1.2rem;
        margin-bottom: 10px;
        margin-top: 15px;
        display: block;
    }

    @media (min-width: 1024px) {
        .legend {
            margin-top: 0;
        }
    }

    @media (min-width: 1024px) {
        
        .wrapper {
            padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
        }

        .mainicon {
            position: relative;
            width: 80px;
            height: 80px;
        }

        .item:first-of-type:before {
            display: none;
        }

        .item:last-of-type:after {
            display: none;
        }
    }
</style>
  