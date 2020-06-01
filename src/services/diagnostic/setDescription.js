import axios from 'axios'

var instance = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
});

function promiseSetDescription(data){
    return new Promise((resolve, reject) => {
        try{
            let response = instance.post('/diagnostic/setDescription', data)
            resolve(response)
        }
        catch(e){
            console.log(`Axios request failed: ${e}`)
        }
    })
}

export default promiseSetDescription