import axios from "axios"

var instance = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
  });

//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("done!"), 1000)
//   });

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

// const getDiagram = function (){
//     try{
//         let diagramData = instance.get('/diagram/5e07afe6dc3e960a7cfd5304', {
//             params: {
//                 results: 1,
//                 inc: 'name, id'
//             }
//         });
//         console.log("diagram data din service" + diagramData)
//         return diagramData;
        
//     }catch(e){
//         console.log(`Axios request failed: ${e}`)
//     }
//     console.log("gata")
// }
export default promiseGetDiagram

