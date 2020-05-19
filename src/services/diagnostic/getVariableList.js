import axios from 'axios'

var instance = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
});

function promiseGetVariableList(data){
    return new Promise((resolve, reject) => {
        try{
            let response = instance.post('/diagnostic/getVariableList', data)
            resolve(response)
        }
        catch(e){
            console.log(`Axios request failed: ${e}`)
        }
    })
}

export default promiseGetVariableList