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
    diameter: number
    climate?: string
    terrain?: string
    gravity?: string
    rotation_period?: number
    orbital_period?: number
    surface_water?: number
    population?: number
    residents?: Habitant[]
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
    height: number
    mass?: number
    hair_color?: string
    skin_color?: string
    eye_color?: string
    birth_year?: string
    gender?: string
    homeworld?: string
    films?: string[]
    species?: string[]
    vehicles?: string[]
    starships?: string[]
    created?: Date
    edited?: Date
    url?: string
}