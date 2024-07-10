import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

const axiosCall = {
    /**
     * Method that make a graphql petition
     * @param query String with the graphql petition
     * @param url url of the petition
     * @param contentType contentype of the petition
     * @returns return the petition data
     */
    async graphqlCall(query: string, url: string, contentType: string) : Promise<object> {
        
        // Set the data
        const data = JSON.stringify({
          query,
          variables: {}
        });
        
        // Set the config
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: url,
          headers: { 
            'Content-Type': contentType
          },
          data : data
        };
        
        return await this.sendPetition(config)
    },

    /**
     * Method that get the data from the call
     * @param config Options for the axios petition
     * @returns the response data
     */
    sendPetition(config:AxiosRequestConfig) : any {
        axios.request(config)
        .then((response: { data: any; }) => {
            return response.data
        })
        .catch((error: any) => {
            console.log(error);
            return {}
        })
        .catch(() => {
            return {}
        })
    }
}


export default axiosCall