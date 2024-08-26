const colBtn = document.getElementById('radioCol');
const rowBtn = document.getElementById('radioRow');

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

async function fetchData() {
    const url = 'https://chrono24.p.rapidapi.com/scraper/chrono24/product?query=https%3A%2F%2Fwww.chrono24.com%2Frolex%2Frolex-submariner-date-ceramic-41mm-126610ln-unworn-2022--id16516741.htm';
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '7c86d04e2cmsh308f9037c038276p106460jsn191d593ba5c3',
		'x-rapidapi-host': 'chrono24.p.rapidapi.com'
	}
};
    try{
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
fetchData();

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("add");

modal.onload = function() {
    // Access the iframe's document
    var modalDocument = modal.contentWindow.document;

    // Find the element by ID inside the iframe
    var modalElement = modalDocument.getElementById("closeBtn");

    // Do something with the iframe element
    // When the user clicks on <span> (x), close the modal
    modalElement.onclick = function() {
        modal.style.display = "none";
    }
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
 
};

btn.onclick = function() {
  modal.style.display = "block";
}

