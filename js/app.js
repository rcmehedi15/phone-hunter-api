    // phones api loaded 
    const loadPhones = async(searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
    // display phones 
    const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    // search value empty like this indevisual value show
    phonesContainer.textContent = '';

    // display 6 phone only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 6){
        phones = phones.slice(0,6);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }

    // display no result 

    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }

    phones.forEach((phone, index) => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-3">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${index + 1}. ${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        `;
        // element inside the card 
        phonesContainer.appendChild(phoneDiv);
    });
    
    // stop loader 
    toggleSpinner(false)
}
// show data function first and then show all 
    const processSearch = (dataLimit) => {
        toggleSpinner(true);
        const searchField = document.getElementById("search-field");
        const searchText = searchField.value;
        loadPhones(searchText,  dataLimit );
    }

    // handle search button click
    document.getElementById('btn-search').addEventListener('click',function(){
    // start loader 
    processSearch(6)
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
})

// loadPhones();