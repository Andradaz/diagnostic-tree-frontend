import axios from 'axios'

var instance = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
});

function promiseGetRuleVariableForNode(data){
    return new Promise((resolve, reject) => {
        try{
            let response = instance.post('/diagnostic/getRuleVariableForNode', data)
            resolve(response)
            console.log(response)
        }
        catch(e){
            console.log(`Axios request failed: ${e}`)
        }
    })
}

export default promiseGetRuleVariableForNode