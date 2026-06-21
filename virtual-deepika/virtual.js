function openMenu() {
    alert("Mobile menu clicked");
}

function filterCards() {
    let category = document.getElementById("category").value;
    let occasion = document.getElementById("occasion").value;
    let price = document.getElementById("price").value;
    let cards = document.querySelectorAll(".card");
    let count = 0;

    for (let i = 0; i < cards.length; i++) {
        let c = cards[i];
        let cCat = c.getAttribute("data-category");
        let cOcc = c.getAttribute("data-occasion");
        let cPrice = parseInt(c.getAttribute("data-price"));

        let okCat = (category == "all" || cCat == category);
        let okOcc = (occasion == "all" || cOcc == occasion);
        let okPrice = true;

        if (price == "low") {
            okPrice = cPrice < 500;
        } else if (price == "mid") {
            okPrice = cPrice >= 500 && cPrice <= 1500;
        } else if (price == "high") {
            okPrice = cPrice > 1500;
        }

        if (okCat && okOcc && okPrice) {
            c.style.display = "block";
            count++;
        } else {
            c.style.display = "none";
        }
    }

    if (count == 0) {
        document.getElementById("empty").classList.remove("hidden");
    } else {
        document.getElementById("empty").classList.add("hidden");
    }
}