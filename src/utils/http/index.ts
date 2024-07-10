import axiosCall from "./Axios";



export type ApiOptions = {
    url: string,
    contentType: string,
}
export type Query = {
    query: string
}

/**
 * object focus in create the http calls
 * abstracting from the lower layers
 */
export const http = {

    /**
     * Make get calls
     * @param opts {url, contentType} arguments
     */
    async get(opts: ApiOptions) {
        throw new Error("undefined method")
    },

    /**
     * Make post calls
     * @param opts {url, contentType} arguments
     */
    async post(opts: ApiOptions) {
        throw new Error("undefined method")
    },

    /**
     * Call a external graphql service and return the data
     * @param query Query object for the graphql call
     * @param opts {url, contentType} arguments
     * @returns return a promise with a result object data
     */
    async graphqlCall(query: Query, opts: ApiOptions) : Promise<any> {
        
        const { url, contentType } = opts
        
        return await axiosCall.graphqlCall(query.query, url, contentType)

    }
}