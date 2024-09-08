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
    modalDocument.getElementById('find').addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
            modalDocument.getElementById('findBtn').click();
        }
    })
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
                    price.price = $0;
                }
                let WatchContainer = document.createElement('div');
                let WatchImg = document.createElement('img');
                let WatchName = document.createElement('h3');
                let WatchPrice = document.createElement('h1');
                let ApproximationTag = document.createElement('p');
                let RemoveBtn = document.createElement('span');

                WatchContainer.classList = 'watchItem';
                WatchContainer.id = item.id;
                WatchImg.src = item.querySelector('img').src;
                WatchName.textContent = item.querySelector('p').textContent;
                WatchPrice.textContent = price.price;
                ApproximationTag.textContent = 'Approx.';
                RemoveBtn.textContent = 'x';

                WatchContainer.appendChild(WatchImg);
                WatchContainer.appendChild(WatchName);
                WatchContainer.appendChild(ApproximationTag);
                WatchContainer.appendChild(WatchPrice);
                WatchContainer.appendChild(RemoveBtn);
                document.getElementById('watchList').appendChild(WatchContainer);
                
                modalElement.click();
                CalculateValue();
                saveData()
                deleteElement();
            })
        }
    
    }
 
};

btn.onclick = function() {
    modal.style.display = "block";
}

async function fetchData(ref) {
    try{
        const response = await fetch(`https://server-chrono-mu.vercel.app/api/scrape-price?query=${ref}`);
        const result = await response.json();
        return result;
    }
    catch(err){
        console.log(err);
    }
}

async function fetchQuery(query){
    const url = `https://server-chrono-mu.vercel.app/api/products?query=${query}`

    try {
        const response = await fetch(url);
        const result = await response.json();
        return result.productSuggestions
    } catch (error) {
        console.error(error);
    }
}

function CalculateValue(){
    let Watches = document.querySelectorAll('.watchItem h1');
    let count = 0;
    let temp;
    Watches.forEach(function(watch){
        temp = num(watch.textContent);
        console.log(temp);
        count += Number(temp);
    })
    const formattedAmountWithDecimals = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(count);
    document.getElementById('totalNum').textContent = formattedAmountWithDecimals;
}

function num(currency){
    let temp = '';
    for(let i = 0; i<currency.length; i++){
        if (!(currency.charAt(i) === '$'|| currency.charAt(i) === ',')){
            temp += currency.charAt(i);
        }
    }
    return temp;
};

function deleteElement() {
    document.querySelectorAll('.watchItem span').forEach(close => {
        close.addEventListener('click', function() {
            // Find the closest parent with the class 'watchItem' and remove it
            const watchItemDiv = close.closest('.watchItem');
            if (watchItemDiv) {
                watchItemDiv.remove();
                CalculateValue();
                saveData();
            }
        });
    });
};

function saveData(){
    localStorage.setItem("data", document.getElementById('watchList').innerHTML);
    console.log("saved");
}
function loadData() {
    // Load saved watch data from localStorage
    document.getElementById('watchList').innerHTML = localStorage.getItem("data");
    
    // Recalculate total value initially
    CalculateValue();

    // Get all watches loaded from localStorage
    let watches = document.querySelectorAll('.watchItem');

    // Loop through each watch and fetch the latest price
    watches.forEach(async function(watchItem) {
        let watchId = watchItem.id; // The reference ID of the watch

        // Fetch the latest price from the API
        let priceData = await fetchData(watchId);
        
        if (priceData.price === "Product not found" || priceData.price === "Price on request") {
            priceData.price = "$0";
        }

        // Update the price in the DOM
        let watchPriceElement = watchItem.querySelector('h1');
        watchPriceElement.textContent = priceData.price;

        // After updating the price, recalculate the total value
        CalculateValue();
    });

    // Ensure the delete functionality is still active
    deleteElement();
}

loadData();
colBtn.click();





