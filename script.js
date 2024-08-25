document.getElementById('radioCol').addEventListener('change', (event)=>{
    if(event.target.checked){
        document.getElementById('col').style.backgroundColor = "hsl(196, 76%, 46%)";
        document.getElementById('row').style.backgroundColor = "hsl(233, 6%, 27%)";
    }
})
document.getElementById('radioRow').addEventListener('change', (event)=>{
    if(event.target.checked){
        document.getElementById('row').style.backgroundColor = "hsl(196, 76%, 46%)";
        document.getElementById('col').style.backgroundColor = "hsl(233, 6%, 27%)";
    }
})

// async function fetchData() {
//     const url = 'https://chrono24.p.rapidapi.com/scraper/chrono24/product?query=https%3A%2F%2Fwww.chrono24.com%2Frolex%2Frolex-submariner-date-ceramic-41mm-126610ln-unworn-2022--id16516741.htm';
//     const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '7c86d04e2cmsh308f9037c038276p106460jsn191d593ba5c3',
// 		'x-rapidapi-host': 'chrono24.p.rapidapi.com'
// 	}
// };
//     try{
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result);
//     }
//     catch(err){
//         console.log(err);
//     }
// }
// fetchData();