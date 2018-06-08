"use strict"

let data = FooBar.getData();
let json = JSON.parse(data)
console.log(json)
let beertypes = json.beertypes;
let closingTime = json.bar.closingTime;
let beerLabel = beertypes.name;


console.log(beertypes);
let template = document.querySelector(".bar-template").content;
let section = document.querySelector(".foo-bar-dashboard");



// closing time 
document.querySelector(".closing-time").textContent = closingTime;

// showing beers
beertypes.forEach(beer => {
    let clone = template.cloneNode(true);
    clone.querySelector(".beer-name").textContent = `${beer.name} (${beer.category}, ${beer.alc}%)`;
    clone.querySelector(".beer-description-aroma").textContent = beer.description.aroma;
    clone.querySelector(".beer-description-flavor").textContent = beer.description.flavor;
    beerLabel = clone.querySelector(".beer-label").setAttribute("src", beer.label);
    console.log(beer.label)
    section.appendChild(clone);

});


// function fetchData(){


// }



// function displayData(json){
//     const closingTime = json.bar.closingTime;
//     document.querySelector(".closing-time").textContent = closingTime;
// beertypes = json.beertypes;


// beertypes.forEach(beer => {
//     let clone = template.cloneNode(true);
// clone.querySelector(".beer-name").textContent=beer.name;
// section.appendChild(clone);

// });


//     console.log(json)
// }

// setInterval(fetchData, 1000);


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