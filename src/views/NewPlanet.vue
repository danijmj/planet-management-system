<template>
    <div class="item" v-if="planet">
        <div class="head">
            <i class="mainicon">
                <component v-bind:is="planetComponent"></component>
            </i>
            <h2 v-if="id && planet">
                Edit the planet {{ planet.name }}
            </h2>
            <h2 v-else>
                Add your new planet
            </h2>
        </div>
        
        <div class="actions" v-if="id && planet">
            <div class="edit">
                <RouterLink :to="{ name: 'planet' , params: { id: id }}" title="Volver">
                    <i><IconSee/></i>
                </RouterLink>
            </div>
        </div>
        <div class="details">
            <div>
                <div class="form-action">
                    <label for="name">Name</label>
                    <input v-model.number="planet.name" id="name"/>
                </div>

                <div class="form-action">
                    <label for="population">Population</label>
                    <input v-model.number="planet.population" id="population"/>
                </div>

                <div class="form-action">
                    <label for="diameter">Diameter</label>
                    <input v-model.number="planet.diameter" id="diameter"/>
                </div>

                <div class="form-action" v-if="planet.climates">
                    <label>Climate</label>
                    <div v-for="n in nclimates" v-bind:key="n"> 
                        <input v-model.trim="planet.climates[n-1]" /> <button @click="deleteClimate(n-1)" class="fbtn remove"> - </button>
                    </div>
                    <button @click="nclimates++" class="fbtn add">Add more</button>
                </div>
                
                <div class="form-action"  v-if="planet.terrains">
                    <label>Terrain</label>
                    <div v-for="n in nterrains" v-bind:key="n"> 
                        <input v-model.trim="planet.terrains[n-1]" /> <button @click="deleteTerrain(n-1)" class="fbtn remove"> - </button>
                    </div>
                    <button @click="nterrains++" class="fbtn add">Add more</button>

                    
                </div>

                <div v-if="residents" class="residents form-action">
                    <label>Residents:</label>
                    <div v-for="n in nresidents" v-bind:key="n" class="resident"> 
                        <input placeholder="Name" v-model.trim="residents[n-1].name" />
                        <input placeholder="Height" v-model.number="residents[n-1].height" />
                        <input placeholder="Mass" v-model.number="residents[n-1].mass" />
                        <input placeholder="Hair color" v-model.trim="residents[n-1].hairColor" />
                        <input placeholder="Skin color" v-model.trim="residents[n-1].skinColor" />
                        <input placeholder="Brith year" v-model.trim="residents[n-1].birthYear" />
                        <button @click="deleteResident(n-1)" class="fbtn remove"> - </button>
                    </div>
                    <button @click="newResident" class="fbtn add">Add more</button>
                </div>

                <div class="form-action form-action-btn">
                    <button class="btn primary" v-if="id" v-on:click="savePlanet" >Save planet</button>
                    <button class="btn primary" v-else v-on:click="createPlanet">Create planet</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
    import IconEdit from '@/components/icons/IconEdit.vue'
    import IconDelete from '@/components/icons/IconDelete.vue'
    import IconSee from '@/components/icons/IconSee.vue'
    import { RouterLink, useRouter } from 'vue-router'
    import { RouteNames } from '@/router'
    import { ref, computed, type Ref } from 'vue'
    import IconPlanet from '@/components/icons/IconPlanet.vue'
    import IconPlanetTwo from '@/components/icons/IconPlanetTwo.vue'
    import PlanetDeletePopup from '@/components/planet/PlanetDeletepopup.vue'
    import { usePlanet } from '@/stores/planets'
    import type { PlanetType, Habitant } from '@/types/planet'
    import ResidentComponent from '@/components/residents/ResidentComponent.vue'
    import { createRandomString } from '@/utils/strings'

    export default {
        name: 'editnew-planet',
        components: {
            RouterLink,
            ResidentComponent,
            IconEdit,
            IconDelete,
            PlanetDeletePopup,
            IconSee
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


            // Set the storage
            const useP = usePlanet();

            let showPopup = ref(false);

            // Get a specified planet
            let planet: PlanetType = {
                name: "",
                id: "",
                population: 0,
                diameter: 0,
                terrains: [],
                residentConnection: {
                    residents: []
                },
                climates: []
            }
            if (props.id) {
                planet = useP.getSpecifiedPlanet(props.id)
            }

            const res: Habitant[] = []
            // We set the habitants
            let residents = ref(res)
            if (planet.residentConnection)
            {
                residents.value = planet.residentConnection.residents
            }
            
            // Seet the nItems of the inputs array
            let nclimates = ref(0)
            let nterrains = ref(0)
            let nresidents = ref(0)
            
            // Load the nItems if whe have content (edit mode)
            if (props.id) {
                if (planet.climates) { nclimates.value = planet.climates?.length }
                if (planet.terrains) { nterrains.value = planet.terrains?.length }
                if (residents.value) { nresidents.value = residents.value?.length }
            }

            // Start the router
            const router = useRouter()

            /**
             * Method called to create a planet
             */
            const createPlanet = () => {
                
                let id = createRandomString(9)
                // Setting the residents into the 
                setHabitants(planet, residents)

                useP.newPlanet(planet, id)

                // Navegate to the home
                router.push({
                    name: RouteNames.PLANET,
                    params: {
                        id: id
                    }
                })
            }

            /**
             * Method to create a new resident into the array
             */
            const newResident = () => {
                residents.value.push({name: '', id: ''})
                nresidents.value ++
            }


            /**
             * Save the planet
             */
            const savePlanet = () => {
                // Check the planet id and the current (prop) id is equal
                if (planet.id != props.id) return;
                
                // Setting the residents into the 
                setHabitants(planet, residents)

                // Edit the planet
                useP.editPlanet(planet, props.id)

                // Navegate to the home
                router.push({
                    name: RouteNames.PLANET,
                    params: {
                        id: props.id
                    }
                })
            }
            
            /**
             * Delete a propety of the list
             * @param n pos to delete
             */
            const deleteClimate = (n:number) => {
                if (!planet.climates) return;
                planet.climates = planet.climates.filter((e, i) => i != n)
                nclimates.value --
            }
  
            /**
             * Delete a propety of the list
             * @param n pos to delete
             */
            const deleteTerrain = (n:number) => {
                if (!planet.terrains) return;
                planet.terrains = planet.terrains.filter((e, i) => i != n)
                nterrains.value --
            }
  
            /**
             * Delete a propety of the list
             * @param n pos to delete
             */
             const deleteResident = (n:number) => {
                if (!residents.value) return;
                residents.value = residents.value.filter((e, i) => i != n)
                nresidents.value --
            }

            /**
             * Save the habitants into the planet residents
             * @param thePlanet The planet 
             * @param theHabitants The list of habitants
             */
            const setHabitants = (thePlanet: PlanetType, theHabitants: Ref<Habitant[]>) => {
                if (thePlanet.residentConnection && theHabitants) 
                {
                    theHabitants.value.forEach(e => {
                        if (!e.id) {
                            e.id = createRandomString(9)
                        }
                    });
                    // thePlanet.residentConnection.residents = habitants.filter(e => e.name != "")
                    thePlanet.residentConnection.residents = theHabitants.value
                }
            }

            return{
                planetComponent,
                deleteClimate,
                deleteResident,
                deleteTerrain,
                newResident,
                savePlanet,
                createPlanet,
                planet,
                showPopup,
                nclimates,
                residents,
                nresidents,
                nterrains
            } 
        }
    }
</script>
  
<style scoped>
    .item {
        margin-top: 2rem;
        display: block;
        width: 100%;
        position: relative;
    }

    .form-action{
        display: block;
        width: 100%;
        margin-bottom: 15px;

        label {
            display: block;
            width: 100%;
        }

        input {
            clear: both;
            height: 30px;
            min-width: 60px;
            margin: 5px 15px 5px 0;
            padding: 5px 8px;
            border-radius: 2px;
            border: 1px solid #dcdcdc;
            transition: all ease .3s;

            &:focus-visible {
                outline: var(--vt-c-ok) auto 1px;
            }
            &:hover, &:focus {
                border: 1px solid var(--color-border);
            }
        }
    }

    .form-action-btn {
        padding-top: 40px;
    }
    
    .details {
        flex: 1;
        margin-left: 1rem;
        position: relative;
    }
    
    .residents {
        padding-top: 20px;
        .text {
            font-weight: 600;
        }

        .resident {
            margin-bottom: 30px;
            &::after {
                top: 15px;
                position: relative;
                content: ' ';
                display: block;
                height: 1px;
                width: 54%;
                background-color: var(--color-border);
            }

            &:last-child {
                &::after {
                    content: none;
                }
            }
        }
    }

    .fbtn {
        padding: 6px 11px 7px;
        background: #fff;
        border: 1px solid #dcdcdc;
        border-radius: 2px;
        min-width: 30px;
        transition: all ease .3s;
        cursor: pointer;

        &:hover {
            background: #d9d9d9;
            border: 1px solid var(--color-border);
        }
    }

    .remove {
        padding: 6px 11px 7px;
    }
    
    .add {
        padding: 7px 11px 7px;
        margin-top: 10px;
    }
    
    .actions {
        position: relative;
        right: -12px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 5px 0px 20px;
    
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
    
    h2 {
        font-size: 1.8rem;
        font-weight: 500;
        margin-bottom: 0.4rem;
        color: var(--color-heading);
    }
    p {
        padding-bottom: 5px;
    }
    
    @media (min-width: 1024px) {
        .item {
        margin-top: 0;
        padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
        margin-bottom: 1rem;
        }
        .head {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            -ms-flex-align: end;
            align-items: flex-end;
            width: 100%;
        }
    
        .mainicon {
        position: relative;
        width: 80px;
        height: 80px;
        }
        h2 {
            margin-left: 20px;
        }
    
        .item:first-of-type:before {
        display: none;
        }
    
        .item:last-of-type:after {
        display: none;
        }
    }
</style>
  