import { describe, it, expect, beforeEach, vitest, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import PlanetPreview from '../PlanetPreview.vue'
import { setActivePinia, createPinia } from 'pinia'
import type { PlanetType } from '@/types/planet'



const planetExample: PlanetType = {
  "id": "cGxhbmV0czox",
  "name": "Tatooine",
  "orbitalPeriod": 304,
  "gravity": "1 standard",
  "diameter": 10465,
  "climates": [
      "arid"
  ],
  "population": 200000,
  "terrains": [
      "desert"
  ],
  "surfaceWater": 1,
  "rotationPeriod": 23,
  "residentConnection": {
      "residents": [
          {
              "id": "cGVvcGxlOjE=",
              "name": "Luke Skywalker",
              "mass": 77,
              "skinColor": "fair",
              "height": 172,
              "eyeColor": "blue",
          },
          {
              "id": "cGVvcGxlOjI=",
              "name": "C-3PO",
              "mass": 75,
              "skinColor": "gold",
              "height": 167,
              "eyeColor": "yellow",
          },
          {
              "id": "cGVvcGxlOjQ=",
              "name": "Darth Vader",
              "mass": 136,
              "skinColor": "white",
              "height": 202,
              "eyeColor": "yellow",
          },
          {
              "id": "cGVvcGxlOjY=",
              "name": "Owen Lars",
              "mass": 120,
              "skinColor": "light",
              "height": 178,
              "eyeColor": "blue",
          },
          {
              "id": "cGVvcGxlOjc=",
              "name": "Beru Whitesun lars",
              "mass": 75,
              "skinColor": "light",
              "height": 165,
              "eyeColor": "blue",
          },
          {
              "id": "cGVvcGxlOjg=",
              "name": "R5-D4",
              "mass": 32,
              "skinColor": "white, red",
              "height": 97,
              "eyeColor": "red",
          },
          {
              "id": "cGVvcGxlOjk=",
              "name": "Biggs Darklighter",
              "mass": 84,
              "skinColor": "light",
              "height": 183,
              "eyeColor": "brown",
          },
          {
              "id": "cGVvcGxlOjEx",
              "name": "Anakin Skywalker",
              "mass": 84,
              "skinColor": "fair",
              "height": 188,
              "eyeColor": "blue",
          },
          {
              "id": "cGVvcGxlOjQz",
              "name": "Shmi Skywalker",
              "mass": 0,
              "skinColor": "fair",
              "height": 163,
              "eyeColor": "brown",
          },
          {
              "id": "cGVvcGxlOjYy",
              "name": "Cliegg Lars",
              "mass": 0,
              "skinColor": "fair",
              "height": 183,
              "eyeColor": "blue",
          }
      ]
  }
}


// you need to mock router
vi.mock('vue-router')
// vi.mock('vue-router');

describe('PlanetPreview', () => {
    
    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useStore() call
        // without having to pass it to it: `useStore(pinia)`
        setActivePinia(createPinia())
    })
  
    it('rendering-planet', async () => {
        
        
        const mockRouter = {
            push: vitest.fn()
        }
        const mockRoute = {
            params: {
                id: "cGxhbmV0czox"
            }
        }

        const wrapper = shallowMount(PlanetPreview, { 
            props: { planet: planetExample, key: planetExample.id, id: planetExample.id },
            global: {
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            },
            slots: {
                name: planetExample.name,
                climate: (planetExample.climates && planetExample.climates?.length > 0) ? planetExample.climates[0] : "",
                terrain: (planetExample.terrains && planetExample.terrains?.length > 0) ? planetExample.terrains[0] : "",
                population: (planetExample.population != undefined) ? planetExample.population?.toString() : '',
            }
        })
        
        expect(wrapper.text()).toContain(planetExample.name)
        expect(wrapper.text()).toContain((planetExample.climates && planetExample.climates?.length > 0) ? planetExample.climates[0] : "")
        expect(wrapper.text()).toContain((planetExample.terrains && planetExample.terrains?.length > 0) ? planetExample.terrains[0] : "")
        expect(wrapper.text()).toContain((planetExample.population != undefined) ? planetExample.population?.toString() : '')
    })


})
