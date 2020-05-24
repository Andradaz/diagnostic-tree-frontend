import axios from 'axios'

var instance = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
});

function getNodeType(data){
    return new Promise((resolve, reject) => {
        try{
            let result = resolve(instance.post('/diagnostic/getNodeType', data))
            console.log("RESULT")
            console.log(result)
        }
        catch(e){
            console.log(`Axios request failed: ${e}`)
        }
    })
}

export default getNodeType