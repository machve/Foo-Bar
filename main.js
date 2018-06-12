"use strict"
//not repeating data
window.addEventListener("load", getJson());

//repeating data
let dataRepeat;
let jsonRepeat;
let data;
let json;
let template;
let parent;
let serveTemplate;
let serveParent;
let clone;


//storage 
let storageArray = [];
let storageNumbers;
let storage;
let mapStorage;

//variables taps

let taps;
let tapLevel = [];
let tapName = [];
let tapEl;


//tap bar chart
let myBarChart;

// doughnut storage chart
let myDoughnutChart;

//queue
let queue;
let order;
let queueAmount;
let queueNumber = document.querySelector(".number-queue");
let queueDiv = document.querySelector(".animate-div");

//bartenders
let bartenders;
let bartenderString;


//updating data
function getUpdatingData() {

    dataRepeat = FooBar.getData(true);
    jsonRepeat = JSON.parse(dataRepeat);
    console.log(jsonRepeat);


    //queue
    queue = jsonRepeat.queue;
if (queue.length === 0){
    ç
}
else if (queue.length === 1){
    queueNumber.textContent = `Right now we have ${queue.length} person in the queue`;
}
    queueNumber.textContent = `Right now we have ${queue.length} persons in the queue.`;
    queueDiv.style.width = (queue.length * 30 + "px")
    
   
    //bartenders
    bartenders = jsonRepeat.bartenders;
    bartenders.forEach((bartender, i) => {
        bartenderString = document.querySelector(".bartender" + (i + 1))
        if (bartender.status === "WORKING" && bartender.servingCustomer > 1) {

            bartenderString.textContent = `Bartender ${bartenders[i].name} is serving ${bartenders[i].servingCustomer} customers.`;
        } else if (bartender.status === "WORKING" && bartender.servingCustomer === 1) {

            bartenderString.textContent = `Bartender ${bartenders[i].name} is serving ${bartenders[i].servingCustomer} customer.`;
        } else if (bartender.status === "READY") {

            bartenderString.textContent = `Bartender ${bartenders[i].name} is getting ready for his shift.`
        }

    })

    //storage

    storage = jsonRepeat.storage;
    console.log(storage)

    storageArray = storage.map(x => x.amount)
    console.log(storageArray);


    //taps 
    taps = jsonRepeat.taps;
    console.log(taps)
    tapLevel = taps.map(x => x.level)
    tapName = taps.map(x => x.beer);
    console.log(tapLevel)

    taps.forEach((tap, i) => {
        tapEl = document.querySelector(".tap" + (i + 1));
        if (tap.inUse === true) {
            tapEl.classList.remove("hidden");
        } else {
            tapEl.classList.add("hidden");
        }
        tapEl.textContent = `Right now you can get ${taps[i].beer} on tap n.${(taps[i].id+1)}`;

    })

    // amount of beers in storage

    myDoughnutChart = new Chart(myChart, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: storageArray,
                backgroundColor: [
                    '#7AFFAE',
                    '#51A2E8',
                    '#FF87C6',
                    '#E8A496',
                    '#7b4aef',
                    '#D891FF',
                    '#fff577',
                    '#246de2',
                    '#EFFF84',
                    '#FF6384'
                ],
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'El Heffe',
                'Fairy Tale Ale',
                'GitHop',
                'Hollaback Lager',
                'Hoppily Ever After',
                'Mowintime',
                'Row 26',
                'Ruined Childhood',
                'Sleighride',
                'Steampunk'
            ]
        },
        options: {
            cutoutPercentage: 50,
            title: {
                display: true,
                text: 'Beers in storage',
                fontColor: 'black',
                fontSize: 25
            },
            legend: {
                position: 'right',
                labels: {
                    // This more specific font property overrides the global property
                    fontSize: 20,
                    fontColor: 'black'
                }
            }

        }
    });

    // level of beers on tap
    myBarChart = new Chart(myChart2, {
        type: 'bar',
        data: {

            labels: ['0', '250', '500', '750', '1000', '1250', '1500', '1750', '2000', '2250', '2500'],
            datasets: [{
                label: 'I do not know how to disable it',
                data: tapLevel,
                backgroundColor: [
                    '#7AFFAE',
                    '#51A2E8',
                    '#FF87C6',
                    '#E8A496',
                    '#7b4aef',
                    '#D891FF',
                    '#fff577',

                ],

            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: tapName
        },
        options: {


            title: {
                display: true,
                text: 'Level of beer taps',
                fontSize: 25,
                fontColor: 'black'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },

            legend: {
                labels: {
                    // This more specific font property overrides the global property


                    fontSize: 20,
                    fontColor: 'black'

                }
            }

        }
    });



}

getUpdatingData();
setInterval(getUpdatingData, 10000);





function getJson() {
    let data = FooBar.getData();
    let json = JSON.parse(data)
    console.log(json)
    // closing time
    let closingTime = json.bar.closingTime;
    document.querySelector(".closing-time").textContent = closingTime;

    // beers
    let beertypes = json.beertypes;

    let beerLabel = beertypes.name;
    //template
    let template = document.querySelector(".bar-template").content;
    let section = document.querySelector(".beer-section");
    // showing beers
    beertypes.forEach(beer => {
        let clone = template.cloneNode(true);
        let extraBeerInfo = clone.querySelector(".extra-beer-info");
        clone.querySelector(".beer-name").textContent = `${beer.name} (${beer.category}, ${beer.alc}%)`;

        // clone.querySelector(".beer-description-impression").textContent = beer.description.overallImpression;
        beerLabel = clone.querySelector(".beer-label").setAttribute("src", "images/" + beer.label);


        clone.querySelector(".appearance").textContent = beer.description.appearance;
        clone.querySelector(".aroma").textContent = beer.description.aroma;
        clone.querySelector(".flavour").textContent = beer.description.flavour;
        clone.querySelector(".mouthfeel").textContent = beer.description.mouthfeel;
        clone.querySelector(".overall-impression").textContent = beer.description.overallImpression;

        clone.querySelector(".view-more").addEventListener("click", () => {
            extraBeerInfo.classList.toggle("hidden");
        })

        section.appendChild(clone);

    });
}