document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const location = document.getElementById('location').value;
    getWeather(location);
});

function getWeather(location) {
    const apiKey = 'e12e629551475db72a215c79515b9008';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === '404') {
                document.getElementById('weather-info').innerHTML = '<p>Location not found</p>';
                document.getElementById('forecast-info').innerHTML = '';
            } else {
                displayWeather(data);
                //getForecast(data.coord.lat, data.coord.lon);
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            document.getElementById('weather-info').innerHTML = `<p>${error.message}</p>`;
            document.getElementById('forecast-info').innerHTML = '';
        });
}

function displayWeather(data) {
    const weatherInfo = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    const weatherBox = document.getElementById('weather-info');
    weatherBox.innerHTML = weatherInfo;
    weatherBox.classList.add('visible');
}

// function getForecast(lat, lon) {
//     const apiKey = 'e12e629551475db72a215c79515b9008';
//     const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;

//     fetch(apiUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.daily) {
//                 displayForecast(data.daily);
//             } else {
//                 document.getElementById('forecast-info').innerHTML = '<p>Error fetching the forecast data</p>';
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching the forecast data:', error);
//             document.getElementById('forecast-info').innerHTML = `<p>${error.message}</p>`;
//         });
// }

// function displayForecast(daily) {
//     let forecastInfo = '<h2>5-Day Forecast</h2>';
//     daily.slice(0, 5).forEach(day => {
//         const date = new Date(day.dt * 1000).toLocaleDateString();
//         forecastInfo += `
//             <div class="forecast-day">
//                 <p>${date}</p>
//                 <p>Temp: ${day.temp.day}°C</p>
//                 <p>${day.weather[0].description}</p>
//             </div>
//         `;
//     });
//     const forecastBox = document.getElementById('forecast-info');
//     forecastBox.innerHTML = forecastInfo;
//     forecastBox.classList.add('visible');
// }
