import axios from "axios"

var instance = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
  });

let promiseGetDiagram = new Promise((resolve, reject) => {
    try{
        let diagramData = instance.get('/diagram/5e07afe6dc3e960a7cfd5304', {
            params: {
                results: 1,
                inc: 'name, id'
            }
        });
        resolve(diagramData)
    }
    catch(e){
        console.log(`Axios request failed: ${e}`)
    }
})

export default promiseGetDiagram

