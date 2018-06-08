"use strict"
let json;
let data;
// let data = FooBar.getData();
// let jsonData = JSON.parse(data);
// let bartenders = jsonData.bartenders;
// let beers = jsonData.beertypes;
// let queue = jsonData.queue;
// let taps = jsonData.taps;
// let serving = jsonData.serving;
// let storage = jsonData.storage;
// const closingTime = jsonData.bar.closingTime;
// // console.log(closingTime);


// document.querySelector(".closing-time").textContent = closingTime;


function fetchData(){
    data = FooBar.getData();
    json = JSON.parse(data)
  displayData(json);


}
function showNotChanging(json){
const closingTime = json.bar.closingTime;
document.querySelector(".closing-time").textContent = closingTime;
}

function displayData(json){

    console.log(json)
}

setInterval(fetchData, 1000);


// bartenders.forEach(element => {
//     console.log(element);
// });


// beers.forEach(e => {
//     console.log(e
//     );
// })
// serving.forEach(e => {
//     console.log(e)
// })
// storage.forEach(e => {console.log(e)
    
// });
// queue.forEach(e => {
//     console.log(e.startTime)
//     console.log(Date(e.startTime))
// })

// taps.forEach(e => {
//     console.log(e.beer);
//     console.log(e.level);
// })