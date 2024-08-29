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
            text.textContent = result.name;
            itemContainer.appendChild(image);
            itemContainer.appendChild(text);
            container.appendChild(itemContainer);
        }
        let items = modalDocument.getElementsByClassName('item');
        for(let item of items){
            item.addEventListener('click', function(){
                console.log(item, fetchData(item.id));
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


btn.onclick = function() {
  modal.style.display = "block";
}





