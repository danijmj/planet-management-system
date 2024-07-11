/** 
  Interface of a planet:
    - Name
    - Diameter (in kilometers)
    - Climate
    - Terrain
    - Number of habitants of the planet
    ---
    - List with the number of habitants
    ...
*/
export interface PlanetType {
    name: string
    id:string
    diameter?: number
    climates?: string[]
    terrains?: string[]
    gravity?: string
    rotationPeriod?: number
    orbitalPeriod?: number
    surfaceWater?: number
    population?: number
    residentConnection?: {
        residents: Habitant[]
    }
    films?: string[]
    created?: Date
    edited?: Date
    url?: string
}


/** 
 * The habitant interface 
 * */
export interface Habitant {
    name: string
    id?: string
    height?: number
    mass?: number
    hairColor?: string
    skinColor?: string
    eyeColor?: string
    birthYear?: string
    gender?: string
    homeworld?: string
    films?: string[]
    starships?: string[]
    created?: Date
    edited?: Date
    url?: string
}