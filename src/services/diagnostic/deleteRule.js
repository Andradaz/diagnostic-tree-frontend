import axios from 'axios'

var instance = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
});

function promiseDeleteRule(data){
    return new Promise((resolve, reject) => {
        try{
            resolve(instance.post('/diagnostic/deleteRule', data))
        }
        catch(e){
            console.log(`Axios request failed: ${e}`)
        }
    })
}

export default promiseDeleteRule