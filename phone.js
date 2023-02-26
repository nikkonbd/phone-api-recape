const loadPhones = async (searchPhone, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit);

}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';

    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 8) {
        phones = phones.slice(0, 8);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }

    // No phone found
    const noPhones = document.getElementById('noPhones');
    if (phones.length === 0) {
        noPhones.classList.remove('d-none');
    } else {
        noPhones.classList.add('d-none');
    }

    phones.forEach(phone => {
        // console.log(phone);
        const createDiv = document.createElement('div');
        createDiv.classList.add('col');
        createDiv.innerHTML = `
        <div class="card p-3 h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
            </div>
            <button onclick="showDetails('${phone.slug}')" id="details-btn" class="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#showDetailsModal">Details</button>
        </div>
        `
        phoneContainer.appendChild(createDiv);
    });
    // Spinner Remove
    spinnerTo(false);

}

const loadShowAll = (dataLimit) => {
    spinnerTo(true);
    const searchValue = document.getElementById('search-value');
    const value = searchValue.value;
    // searchValue.value = '';
    loadPhones(value, dataLimit)
}

// search Enter press
document.getElementById('search-value').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        loadShowAll(8);
    }
})
// search Function
document.getElementById('search-btn').addEventListener('click', function () {
    loadShowAll(8);
})


// Spinner Function
const spinnerTo = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
}

// Not best way to showAll

document.getElementById('show-all-btn').addEventListener('click', function () {
    loadShowAll();
})


const showDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.data);
}

const displayDetails = (details) => {
    console.log(details);
    const phoneTitle = document.getElementById('showDetailsModalLabel');
    phoneTitle.innerText = details.name;

    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerHTML = `
    <img class="mb-3" src="${details.image}">
    <p>Release Date: ${details.releaseDate ? details.releaseDate : 'No Release Date Found'}</p>
    <p>Memory: ${details.mainFeatures ? details.mainFeatures.memory : 'No Memory Found'} </p>
    <p>Display Size: ${details.mainFeatures ? details.mainFeatures.displaySize : 'No Display Size Found'} </p>
    `
}

// loadPhones('apple');