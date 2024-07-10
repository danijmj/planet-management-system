import { defineStore } from 'pinia'
import { store } from '@/stores';
import type { PlanetType } from '@/types/planet'

export interface ListPlanets {
    planets: PlanetType[]
}

const planets:PlanetType[] = []


export const usePlanetStore = defineStore({
    id: 'app-planet',
    state: (): ListPlanets => ({
        planets
    }),
    getters: {
        getAllPlanets(): PlanetType[] {
            return this.planets;
        }
    },
    actions: {
        getSpecifiedPlanet(i: number): PlanetType {
            return this.planets[i];
        },
        getPaginatedPlanets(page: number, itemsPerPage: number): PlanetType[] {
            // Check the length of the array
            const end = itemsPerPage * (page + 1) < this.planets.length ? itemsPerPage * (page + 1) : this.planets.length
            return this.planets.slice(itemsPerPage * page, end )
        },

        setAllPlanets(planets: any) {
            return this.planets = planets;
        }
  }
});

// Need to be used outside
export function usePlanet() {
    return usePlanetStore(store);
}
