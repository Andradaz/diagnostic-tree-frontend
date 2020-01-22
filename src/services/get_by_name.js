import axios from 'axios'

var instance = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
});

function promiseGetByName(data){
    return new Promise((resolve, reject) => {
    try{
        let representationList = instance.post('/representation/getByName', data);
        resolve(representationList)
        console.log(representationList)
    }
    catch(e){
        console.log(`Axios request failed: ${e}`)
    }
})
}

export default promiseGetByName

