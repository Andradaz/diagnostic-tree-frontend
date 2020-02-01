import axios from 'axios'

var instance = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
});

function promiseDeleteVariable(data){
    return new Promise((resolve, reject) => {
        try{
            let response = instance.post('/diagnostic/deleteVariable', data)
            resolve(response)
            console.log(response)
        }
        catch(e){
            console.log(`Axios request failed: ${e}`)
        }
    })
}

export default promiseDeleteVariable