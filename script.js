const colBtn = document.getElementById('radioCol');
const rowBtn = document.getElementById('radioRow');
var modal = document.getElementById("myModal");
var btn = document.getElementById("add");
let modalDocument;


colBtn.addEventListener('click', (event)=>{
    if(event.target.checked){
        document.getElementById('col').style.backgroundColor = "hsl(196, 76%, 46%)";
        document.getElementById('row').style.backgroundColor = "hsl(233, 6%, 27%)";
    }
})
rowBtn.addEventListener('click', (event)=>{
    if(event.target.checked){
        document.getElementById('row').style.backgroundColor = "hsl(196, 76%, 46%)";
        document.getElementById('col').style.backgroundColor = "hsl(233, 6%, 27%)";
    }
})

modal.onload = function() {
    // Access the iframe's document
    modalDocument = modal.contentWindow.document;
    let container = modalDocument.body.querySelector('.results');

    // Find the element by ID inside the iframe
    var modalElement = modalDocument.getElementById("closeBtn");

    // Do something with the iframe element
    // When the user clicks on <span> (x), close the modal
    modalElement.onclick = function() {
        modal.style.display = "none";
        container.innerHTML = '';
    }
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
    modalDocument.getElementById('findBtn').onclick = async function() {
        container.innerHTML = '';
        let results = await fetchQuery(modalDocument.getElementById('find').value);
        console.log(results);
        for(let result of results){
            let itemContainer = modalDocument.createElement('div');
            let image = modalDocument.createElement('img');
            let text = modalDocument.createElement('p');
            itemContainer.classList = 'item';
            itemContainer.id = result.refId;
            image.src = result.watchImageUrl;
            itemContainer.name = result.manufacturerName;
            text.textContent = result.manufacturerName +' '+ result.name +' ('+result.caseDiameter +') '+ result.caseMaterial;
            itemContainer.appendChild(image);
            itemContainer.appendChild(text);
            container.appendChild(itemContainer);
        }
        let items = modalDocument.getElementsByClassName('item');
        for(let item of items){
            item.addEventListener('click', async function(){
                let price = await fetchData(item.id);
                console.log(price);
                if (price.price === "Product not found"||price.price === "Price on request"){
                    
                }
                let WatchContainer = document.createElement('div');
                let WatchImg = document.createElement('img');
                let WatchName = document.createElement('h3');
                let WatchPrice = document.createElement('h1');
                let ApproximationTag = document.createElement('p');

                WatchContainer.classList = 'watchItem';
                WatchImg.src = item.querySelector('img').src;
                WatchName.textContent = item.querySelector('p').textContent;
                WatchPrice.textContent = price.price;
                ApproximationTag.textContent = 'Approx.';

                WatchContainer.appendChild(WatchImg);
                WatchContainer.appendChild(WatchName);
                WatchContainer.appendChild(ApproximationTag);
                WatchContainer.appendChild(WatchPrice);
                document.getElementById('watchList').appendChild(WatchContainer);
                modalElement.click();
            })
        }
    
    }
 
};

async function fetchData(ref) {
    try{
        const response = await fetch(`https://serverchrono.onrender.com/api/scrape-price?query=${ref}`);
        const result = await response.json();
        return result;
    }
    catch(err){
        console.log(err);
    }
}

async function fetchQuery(query){
    const url = `https://serverchrono.onrender.com/api/products?query=${query}`

    try {
        const response = await fetch(url);
        const result = await response.json();
        return result.productSuggestions
    } catch (error) {
        console.error(error);
    }
}

async function fetchBackup(query){
        let result;
        const url = `https://chrono24.p.rapidapi.com/scraper/chrono24/search?query=${query}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '7c86d04e2cmsh308f9037c038276p106460jsn191d593ba5c3',
                'x-rapidapi-host': 'chrono24.p.rapidapi.com'
            }
        };
    
        try {
            const response = await fetch(url, options);
            result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    
        const url1 = `https://chrono24.p.rapidapi.com/scraper/chrono24/product?query=https%3A%2F%2Fwww.chrono24.com%2Frolex%2F${result[0].slug}`;
        const options1 = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '7c86d04e2cmsh308f9037c038276p106460jsn191d593ba5c3',
                'x-rapidapi-host': 'chrono24.p.rapidapi.com'
            }
        };

        try {
            const response1 = await fetch(url1, options1);
            const result1 = await response1.json();
            console.log(result1);
        } catch (error) {
            console.error(error);
        }
    }

btn.onclick = function() {
    modal.style.display = "block";
}






