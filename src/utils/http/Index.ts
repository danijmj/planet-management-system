import axiosCall from "./Axios";


type ApiOptions = {
    url: string,
    contentType: string,
}

type Query = {
    query: string
}



/**
 * object focus in create the http calls
 * abstracting from the lower layers
 */
export const http = {

    /**
     * Method to make get calls
     * @param opts {url, contentType} arguments
     */
    get(opts: ApiOptions) {
        throw new Error("undefined method")
    },

    /**
     * Method to make post calls
     * @param opts {url, contentType} arguments
     */
    post(opts: ApiOptions) {
        throw new Error("undefined method")
    },

    /**
     * 
     * @param query Query object for the graphql call
     * @param opts {url, contentType} arguments
     * @returns return a promise with a result object data
     */
    graphqlCall(query: Query, opts: ApiOptions) : Promise<object> {
        
        const { url, contentType } = opts

        return axiosCall.graphqlCall(query.query, url, contentType)

    }
}