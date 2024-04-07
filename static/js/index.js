createElements();
pageSetup();

// Create elements to place information:
function createElements() {
    let mainSection = document.getElementById('country-info');

    // Create elements for country name, flag, currencies, capital, languages
    let flag = document.createElement('img')
    flag.setAttribute('width', '300px')
    flag.id = 'country-flag';
    let name = document.createElement('h1')
    name.id = 'country-name';
    let currencies = document.createElement('ul')
    currencies.id = 'country-currencies';
    let capital = document.createElement('h3')
    capital.id = 'country-capital';
    let languages = document.createElement('ul')
    languages.id = 'country-languages';

    let to_show = [name, flag, capital, languages, currencies];
    for (let element of to_show) {
        mainSection.append(element);
    }
}

// Setup the form submission and event listeners
function pageSetup() {
    let GetCountryForm = document.getElementById('queryCountryForm');
    GetCountryForm.addEventListener('submit', e => showCountry(e));
}

// Uses Fetch API to get data from restcountries and display via call to nicelyDisplayData
function showCountry(e) {
    e.preventDefault();
    let countryName = document.getElementById('countryInput').value;
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    fetch(apiUrl)
        .then (response => response.json())
        .then( data => nicelyDisplayData(data))
        .catch( error => console.warn(error))
}

// Helps to display country data after recieving Promise
function nicelyDisplayData(countryData) {
    let targetCountry = countryData[0]
    if (!targetCountry) {
        console.log("Sorry, no country data here")
    }
    // Country Name
    let country_name = targetCountry.name.common
    document.getElementById('country-name').innerHTML = country_name;

    // Flag
    // console.log(targetCountry.flags.svg)
    document.getElementById('country-flag').src = targetCountry.flags.svg;
    
    // Currencies
    let currencyObj = targetCountry.currencies;
    let currencyList = Object.values(currencyObj);
    let currencyTitle = document.createElement('h4')
    currencyTitle.innerHTML = `The currency of ${country_name}:`;
    document.getElementById('country-currencies').before(currencyTitle);
    for (let currency of currencyList){
        let item = document.createElement('li')
        item.innerHTML = `<b>${currency.name} (${currency.symbol})</b>`
        document.getElementById('country-currencies').append(item);
    }
    
    // Capital
    document.getElementById('country-capital').innerHTML = `Capital: ${targetCountry.capital[0]}`;
    
    // Languages
    langList = Object.values(targetCountry.languages);
    let langTitle = document.createElement('h4')
    langTitle.innerHTML = "Official Languages:";
    document.getElementById('country-languages').before(langTitle);
    for (let i = 0; i < langList.length; i++) {
        let lang = document.createElement('li');
        lang.innerHTML = `<b>${langList[i.toString()]}</b>`;
        document.getElementById('country-languages').append(lang);
    }

}
