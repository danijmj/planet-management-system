import { defineStore } from 'pinia'
import { store } from '@/stores';
import type { PlanetType } from '@/types/planet'
import { computed, type ComputedRef } from 'vue';

export interface ListPlanets {
    planets: { [key: string]: PlanetType }
}

const planets: { [key: string]: PlanetType } = {}


export const usePlanetStore = defineStore({
    id: 'app-planet',
    state: (): ListPlanets => ({
        planets
    }),
    getters: {
        /**
         * Get all planets
         * @returns the planet array
         */
        getAllPlanets(): { [key: string]: PlanetType } {
            return this.planets;
        },

        /**
         * Obtain the total number of the planets
         */
        getNumberPlanets(): number {
            return Object.values(this.planets).length
        }
    },
    actions: {
        /**
         * Get a specified planet by their id param
         * @param id Id of the planet to get
         * @returns a planet 
         */
        getSpecifiedPlanet(id: string): PlanetType {
            return this.planets[id];
        },

        /**
         * Delete a specified planet
         * @param id id 
         */
        deleteItem(id: string) {
            delete this.planets[id];
        },

        /**
         * Edit the planet
         * @param planet Datos del planeta a modificar
         */
        editPlanet(planet: PlanetType, id: string) {
            this.planets[id] = planet;
        },

        /**
         * Edit the planet
         * @param planet Datos del planeta a modificar
         */
        newPlanet(planet: PlanetType, id: string) {
            this.planets[id] = planet;
        },

        /**
         * Get a copy of the elements 
         * @param page Page number to get (into the pagination)
         * @param itemsPerPage Nº of elements to show per page
         * @returns 
         */
        getPaginatedPlanets(page: number, itemsPerPage: number): { [key: string]: PlanetType } {
            // Get the planets like array to work with this better
            const mplanets = Object.values(this.planets)
            // Obtain the end of the range to obtain
            const end = itemsPerPage * (page + 1) < mplanets.length ? itemsPerPage * (page + 1) : mplanets.length
            
            const objPlanetRes: { [key: string]: PlanetType } = {}
            // Get the specified range of planet
            const slicedData = mplanets.slice(itemsPerPage * page, end )
            // Normalize the data result
            // slicedData.forEach(e =>  objPlanetRes = {...objPlanetRes, [e.id]: e})
            slicedData.forEach(e =>  objPlanetRes[e.id] = e)

            return objPlanetRes
        },

        /**
         * We nomalize the array of planets that we receive into an 'array' of 'key => value' 
         * objects and assign them to planets.
         * @param planets Object that we presume like a PlanetType[]
         */
        setAllPlanets(planets: any) {
            const objPlanetRes: { [key: string]: PlanetType } = {}
            // planets.forEach((e: PlanetType) =>  objPlanetRes = {...objPlanetRes, [e.id]: e})
            planets.forEach((e: PlanetType) =>  objPlanetRes[e.id] = e)

            this.planets = objPlanetRes;
        }
  }
});

// Need to be used outside
export function usePlanet() {
    return usePlanetStore(store);
}
