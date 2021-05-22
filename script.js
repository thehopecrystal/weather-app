console.log("Welcome to my weather app v1.2")


const api = {
    key: "8897bbf6d8947fae44c273dbe0e41ed7",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery)

function setQuery(evt) {
    if (evt.keyCode === 13) {
        getResults(searchBox.value)
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date()
    let date = document.querySelector('.location .date')
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hiLow = document.querySelector('.hi-low')
    hiLow.innerHTML = `Temp Min: ${Math.round(weather.main.temp_min)}<span>&deg;c</span> <br>
                        Temp Max: ${Math.round(weather.main.temp_max)}<span>&deg;c</span> <br>
                        Humidity: ${Math.round(weather.main.humidity)}<span>&deg;c</span> <br>
                        Pressure: ${Math.round(weather.main.pressure)}<span>&deg;c</span> <br>
                        Feels Like: ${Math.round(weather.main.feels_like)}<span>&deg;c</span>`;

    function weatherImg() {
        if (weather_el.innerText == "Rain") {
            document.getElementById("body").style.backgroundImage = 'url("images/rain.gif")'
        }
        if (weather_el.innerText == "Clouds") {
            document.getElementById("body").style.backgroundImage = 'url("images/clouds.jpg")'
        }
        if (weather_el.innerText == "Clear") {
            document.getElementById("body").style.backgroundImage = 'url("images/sunny.gif")'
        }

    }
    weatherImg()
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July",
        "July", "August", "September", "October", "November", "December"
    ];

    let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate()
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}