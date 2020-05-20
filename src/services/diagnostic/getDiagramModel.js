import axios from 'axios'

var instance = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
});

function promiseGetDiagramModel(data){
    return new Promise((resolve, reject) => {
        try{
            resolve(instance.post('/diagnostic/getDiagramModel', data))
        }
        catch(e){
            console.log(`Axios request failed: ${e}`)
        }
    })
}

export default promiseGetDiagramModel