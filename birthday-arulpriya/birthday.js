//Side Nav Bar

let menubar = document.getElementById("menubar")
let sidenavbar = document.getElementById("sidenavbar")
let closeicon = document.getElementById("closeicon")

menubar.addEventListener("click", function(){
    sidenavbar.classList.remove("translate-x-full")

})

closeicon.addEventListener("click", function(){
    sidenavbar.classList.add("translate-x-full")
})


// price Filter expand collapse button
var expandbtn = document.getElementById("expandbtn")
var collapsebtn = document.getElementById("collapsebtn")
var priceFilterContainer = document.getElementById("priceFilterContainer")

expandbtn.addEventListener("click", function(){
    expandbtn.classList.add("hidden")
    collapsebtn.classList.remove("hidden")
    priceFilterContainer.classList.remove("hidden")
})

collapsebtn.addEventListener("click", function(){
    collapsebtn.classList.add("hidden")
    expandbtn.classList.remove("hidden")
    priceFilterContainer.classList.add("hidden")
})

//Relationship filter expand & Close functionality

var relationExpand = document.getElementById("relationExpand")
var relationCollapse = document.getElementById("relationCollapse")
var relationFilterContainer = document.getElementById("relationFilterContainer")

relationExpand.addEventListener("click", function(){
    relationExpand.classList.add("hidden")
    relationCollapse.classList.remove("hidden")
    relationFilterContainer.classList.remove("hidden")
})

relationCollapse.addEventListener("click", function(){
    relationExpand.classList.remove("hidden")
    relationCollapse.classList.add("hidden")
    relationFilterContainer.classList.add("hidden")
})


//Search functionality of serch bar in large screen
let searchbox1 = document.getElementById("searchbox1")
let birthdaySurpriseContainer = document.getElementById("birthdaySurpriseContainer")
let birthdaySurpriseContainerList = birthdaySurpriseContainer.querySelectorAll(".suprise-card")
let bannerImageContainer = document.getElementById("bannerImageContainer")

searchbox1.addEventListener("keyup", function(event){
    let searchedvalue = event.target.value.toUpperCase();

    for(var count=0;count<birthdaySurpriseContainerList.length;count++){
        var surpriseName = birthdaySurpriseContainerList[count].querySelector("h1").textContent.toUpperCase()
        var price = birthdaySurpriseContainerList[count].querySelector("p").textContent.toUpperCase()

        if(surpriseName.includes(searchedvalue) || price.includes(searchedvalue)){
            birthdaySurpriseContainerList[count].style.display ="block"
        }else
        {
            birthdaySurpriseContainerList[count].style.display ="none"
        }
    }

})

//Hide banner Image when searching in higher screen
function removeSearchFocus1() {
    if (searchbox1.value.trim() === "") {
        
        bannerImageContainer.style.display="block"
    }else{
         bannerImageContainer.style.display="none"
    }
}

searchbox1.addEventListener("keyup", function(){
    removeSearchFocus1()
})


//Search functionality of serch bar in smaller screen

let searchbox2 = document.getElementById("searchbox2")
searchbox2.addEventListener("keyup", function(event){
    let searchedvalue = event.target.value.toUpperCase();

    for(var count=0;count<birthdaySurpriseContainerList.length;count++){
        var surpriseName = birthdaySurpriseContainerList[count].querySelector("h1").textContent.toUpperCase()
        var price = birthdaySurpriseContainerList[count].querySelector("p").textContent.toUpperCase()

        if(surpriseName.includes(searchedvalue) || price.includes(searchedvalue)){
            birthdaySurpriseContainerList[count].style.display ="block"
        }else
        {
            birthdaySurpriseContainerList[count].style.display ="none"
        }
    }

})

//Hide banner Image when searching in lower screen

function removeSearchFocus2() {
    if (searchbox2.value.trim() === "") {
        
        bannerImageContainer.style.display="block"
    }else{
         bannerImageContainer.style.display="none"
    }
}

searchbox2.addEventListener("keyup", function(){
    removeSearchFocus2()
})


//Filter Functionality combination of both filters

let price = document.getElementsByName("price");
let relationship = document.getElementsByName("relationship");
let cards = document.querySelectorAll(".suprise-card");
let cardCount = document.getElementById("cardCount")

// Add event listeners
for (let i = 0; i < price.length; i++) {
    price[i].addEventListener("change", filterCards);
}

for (let i = 0; i < relationship.length; i++) {
    relationship[i].addEventListener("change", filterCards);
}

// Main filter function
function filterCards() {

    // STEP 1: get selected price values
    let selectedPrice = [];
    for (let i = 0; i < price.length; i++) {
        if (price[i].checked) {
            selectedPrice.push(price[i].value);
        }
    }

    // STEP 2: get selected relationship values
    let selectedRelation = [];
    for (let i = 0; i < relationship.length; i++) {
        if (relationship[i].checked) {
            selectedRelation.push(relationship[i].value);
        }
    }
    let initialCount = 0;
    // STEP 3: loop all cards
    for (let i = 0; i < cards.length; i++) {

        let cardPrice = cards[i].getAttribute("data-price");
        let cardRelation = cards[i].getAttribute("data-relation");

        // STEP 4: check price match
        let priceMatch = false;
        if (selectedPrice.length === 0 || selectedPrice.includes(cardPrice)) {
            priceMatch = true;
        }

        // STEP 5: check relation match
        let relationMatch = false;
        if (selectedRelation.length === 0 || selectedRelation.includes(cardRelation)) {
            relationMatch = true;
        }

        // STEP 6: final decision
        if (priceMatch && relationMatch) {
            cards[i].style.display = "block"; 
            initialCount++;  // show card
        } else {
            cards[i].style.display = "none";    // hide card
        }
    }
    // show result
    if (initialCount === 0) {
        cardCount.innerText = "No results found";
    } else {
        cardCount.innerText = `${initialCount} Surprises`;
    }
}


//Sort Functionality:

let sortOption = document.getElementById("sortOption");
let container = document.getElementById("birthdaySurpriseContainer");

let originalCards = Array.from(container.querySelectorAll(".suprise-card"));

sortOption.addEventListener("change", sortCards);

function sortCards() {

    let value = sortOption.value;

    let cards = Array.from(container.querySelectorAll(".suprise-card"));

    // RESET ORDER if default
    if (value === "default") {
        container.innerHTML = "";
        originalCards.forEach(card => container.appendChild(card));
        return;
    }

    // BEST SELLING SORT
    if (value === "best") {

        cards.sort((a, b) => {

            let aBest = a.dataset.tag === "best" ? 1 : 0;
            let bBest = b.dataset.tag === "best" ? 1 : 0;

            return bBest - aBest;
        });
    }

    container.innerHTML = "";
    cards.forEach(card => container.appendChild(card));
}