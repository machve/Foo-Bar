"use strict"
//not repeating data
window.addEventListener("load", getJson());

//repeating data 
let dataRepeat;
let jsonRepeat;
let orderTemplate;
let orderParent;
let serveTemplate;
let serveParent;
let time;

//storage variables
let storageArray = [];
let storageNumbers;
let storage;
let mapStorage;

//taps variables
let taps;
let tapLevel = [];
let tapName = [];
let tapEl;
let tapInUse;
let emptyTaps = document.querySelector(".nothing-on-taps");

//tap bar chart
let myBarChart;

// doughnut storage chart
let myDoughnutChart;


//queue variables
let queue;
let order;
let queueArray = [];
let queueLength;
let queueDate = [];
let queueAmount;
let emptyQueue = document.querySelector(".empty-queue");
let queueNumber = document.querySelector(".number-queue");


//bartenders variables
let bartenders;
let bartenderString;


//------------------------------LINE CHART FOR QUEUE-------------------------------------------

let myLineChart = new Chart(myChart3, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'People waiting in the queue',
            data: queueArray,
            fill: false,
            borderColor: "#00cec6",
            backgroundColor: "#00e0cb",

        }],
        labels: queueDate
    },
    options: {

        showLines: true,
        legend: {
            labels: {
                // This more specific font property overrides the global property
                fontColor: '#1e3264'
            }
        },
        scales: {
            xAxes: [{
                display: true,
                ticks: {
                    fontSize: 10,
                    padding: 10,

                }
            }],
            yAxes: [{
                display: true,
                ticks: {
                    fontSize: 10,
                    padding: 10,
                    beginAtZero: true,
                    stepSize: 1,
                    fontColor: '#1e3264'
                }
            }],
            xAxes: [{
                display: true,
                ticks: {
                    fontSize: 10,
                    fontColor: '#1e3264'
                }
            }]
        }
    },

})



//updating data
function getUpdatingData() {

    dataRepeat = FooBar.getData(true);
    jsonRepeat = JSON.parse(dataRepeat);
    console.log(jsonRepeat);

    //------------------------------QUEUEU-------------------------------------------
    queue = jsonRepeat.queue;


    // checking amount of people in queue and displaying message accordingly
    if (queue.length === 0) {
        console.log("empty")
        queueNumber.textContent = `There is nobody in queue`;
        emptyQueue.classList.remove("hidden");

    } else if (queue.length === 1) {
        queueNumber.textContent = `Right now we have ${queue.length} person in the queue`;
        emptyQueue.classList.add("hidden");
    } else if (queue.length > 1) {
        queueNumber.textContent = `Right now we have ${queue.length} persons in the queue.`;
        emptyQueue.classList.add("hidden")
    }

    // getting length of queue array for line graph
    queueLength = queue.length;
    queueArray.push(queueLength);


    // getting date and time for when the queue is for line chart
    time = new Date();
    queueDate.push(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());


    // updating line chart
    myLineChart.update();


    // getting orders and orders being served
    function displayOrders() {

        let data = FooBar.getData();
        let json = JSON.parse(data);

        //------------------------------ORDERS IN QUEUE-------------------------------------------
        // queue template
        orderTemplate = document.querySelector("#queue-template").content;
        orderParent = document.querySelector(".orders-waiting-in-queue");

        // clearing the space in template for necht items
        orderParent.innerHTML = '';

        // order id for each order and order items for each order
        json.queue.forEach(orderNumber => {
            let clone = orderTemplate.cloneNode(true);
            clone.querySelector('.order').textContent = `Order n. ${(orderNumber.id + 1)} - ${orderNumber.order.join(", ")} `;
            orderParent.appendChild(clone);
        });
        //------------------------------SERVED ORDERS-------------------------------------------
        // serve template
        serveTemplate = document.querySelector("#orders-served").content;
        serveParent = document.querySelector(".in-serve");

        // clearing space for served items
        serveParent.innerHTML = '';

        // served id for each order and served items for each order
        json.serving.forEach(servedOrder => {
            let clone = serveTemplate.cloneNode(true);
            clone.querySelector('.order-being-served').textContent = `Order nr. ${(servedOrder.id + 1)} -  ${servedOrder.order.join(', ')}`;
            serveParent.appendChild(clone);

        })
    }
    displayOrders();

    //------------------------------BARTENDERS-------------------------------------------
    bartenders = jsonRepeat.bartenders;

    // checking status and displaying message accordingly
    bartenders.forEach((bartender, i) => {
        console.log(bartenders[i].status)
        bartenderString = document.querySelector(".bartender" + (i + 1))
        if (bartender.status === "WORKING" && bartender.servingCustomer === 1) {

            bartenderString.textContent = `Bartender ${bartenders[i].name} is serving ${bartenders[i].servingCustomer} customer.`;

        } else if (bartender.status === "WORKING" && bartender.servingCustomer > 1) {

            bartenderString.textContent = `Bartender ${bartenders[i].name} is serving ${bartenders[i].servingCustomer} customers.`;

        } else if (bartender.status === "READY") {

            bartenderString.textContent = `Bartender ${bartenders[i].name} is ready for another customer.`
        }

    })

    //------------------------------STORAGE-------------------------------------------

    storage = jsonRepeat.storage;
    // getting amount of beers in storage into an array
    storageArray = storage.map(x => x.amount)


    //------------------------------STORAGE CHART-------------------------------------------

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
                fontColor: '#1e3264',
                fontSize: 25
            },
            legend: {
                position: 'right',
                labels: {
                    // This more specific font property overrides the global property
                    fontSize: 20,
                    fontColor: '#1e3264'
                }
            }

        }
    });

    //------------------------------TAPS-------------------------------------------
    taps = jsonRepeat.taps;
    // getting level of beer and beer names into an array for graph
    tapLevel = taps.map(x => x.level);
    tapName = taps.map(x => x.beer);
    // checking if all taps are not in use
    tapInUse = taps.every(x => x.inUse === false);
    console.log(tapInUse);




    // checking what taps are in use and displaying accordingly
    if (tapInUse === false) {
        emptyTaps.classList.add("hidden");
    } else {
        emptyTaps.classList.remove("hidden");
    }

    taps.forEach((tap, i) => {
        tapEl = document.querySelector(".tap" + (i + 1));

        if (tap.inUse === true) {
            tapEl.classList.remove("hidden");

        } else {
            tapEl.classList.add("hidden");

        }
        tapEl.textContent = `Right now you can get ${taps[i].beer} on tap n.${(taps[i].id+1)}`;

    })

    //-----------------------------LEVEL OF BEERS ON TAP CHART-------------------------------------------

    myBarChart = new Chart(myChart2, {
        type: 'bar',
        data: {

            labels: ['0', '250', '500', '750', '1000', '1250', '1500', '1750', '2000', '2250', '2500'],
            datasets: [{
                label: 'level of beer',

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
                fontColor: '#1e3264'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#1e3264'
                    }
                }],
                xAxes: [{
                    ticks: {

                        fontColor: '#1e3264'
                    }
                }]
            },

            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontSize: 20,
                    fontColor: '#1e3264'

                }
            }

        }
    });

}

getUpdatingData();
setInterval(getUpdatingData, 10000);

//-----------------------------NOT REPEATING DATA-------------------------------------------

function getJson() {
    let data = FooBar.getData();
    let json = JSON.parse(data)
    console.log(json)

    // closing time
    let closingTime = json.bar.closingTime;
    document.querySelector(".closing-time").textContent = `The bar is closing at ${closingTime}`;


    //------------------------------BEERS-------------------------------------------

    let beertypes = json.beertypes;
    let beerLabel = beertypes.name;
    //template
    let template = document.querySelector(".bar-template").content;
    let section = document.querySelector(".beer-section");

    // showing beers
    beertypes.forEach(beer => {
        let clone = template.cloneNode(true);
        let extraBeerInfo = clone.querySelector(".extra-beer-info");
        let beerInfo = clone.querySelector(".beer-info")

        // beer title
        clone.querySelector(".beer-name").textContent = `${beer.name} (${beer.category}, ${beer.alc}%)`;

        // img
        beerLabel = clone.querySelector(".beer-label").setAttribute("src", "images/" + beer.label);

        // hidden beer info
        clone.querySelector(".beer-name-extra").textContent = `${beer.name} (${beer.category}, ${beer.alc}%)`;
        clone.querySelector(".appearance").textContent = beer.description.appearance;
        clone.querySelector(".aroma").textContent = beer.description.aroma;
        clone.querySelector(".mouthfeel").textContent = beer.description.mouthfeel;
        clone.querySelector(".overall-impression").textContent = beer.description.overallImpression;

        clone.querySelector(".view-more").addEventListener("click", () => {
            extraBeerInfo.classList.toggle("hidden");
            beerInfo.classList.toggle("add-padding");
        })

        extraBeerInfo.addEventListener("click", () => {
            extraBeerInfo.classList.add("hidden");
        })

        section.appendChild(clone);

    });
}