import axios from 'axios'

var instance = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
});

function promiseSetStatus(data){
    return new Promise((resolve,reject)=>{
        try{
            console.log("data in service function")
            console.log(data)
            resolve(instance.post('/diagram/setStatus', data))
        }
        catch(e){
            console.log(`Axios request failed: ${e}`)
        }
    })
}

export default promiseSetStatus