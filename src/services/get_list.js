import axios from 'axios'

var instance = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
});

  let promiseGetList = new Promise((resolve, reject) => {
    try{
        let diagramList = instance.get('/diagram/list');
        resolve(diagramList)
    }
    catch(e){
        console.log(`Axios request failed: ${e}`)
    }
})

export default promiseGetList
