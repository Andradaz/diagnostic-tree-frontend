import axios from 'axios'

var instance = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
});

function wekaToJson(data){
    return new Promise((resolve, reject) => {
        try{
            let response = instance.post('/diagnostic/computeWekaOutput', data)
            resolve(response)
        }
        catch(e){
            console.log(`Axios request failed: ${e}`)
        }
    })
}

export default wekaToJson