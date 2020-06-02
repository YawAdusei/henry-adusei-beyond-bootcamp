// Pseudo Code for weather application

        // User enters name of a city into the search bar
            // When the user clicks on submit button, make a call to weather api to retrieve:
            // current weather description ie "sunny"
            // Icon to match weather condition
            // current temperature value ie 20 degrees celcius
            // forecast for 5 days out

        // place the results on the DOM dynamically
            // current weather description
            // icon to match weather condition 
            // current temperature value
            // day image or night image depending on time of day

        // Give the user the option to start over and search for the weather in another city.

        // Stretch Goals 
            // forecast for 5 days out
            // Give user choice to toggle between celcius and fahrenheit.
            // Give the user ability to save a list of cities to check the forecast for.



  let apiKey = "8a8bf52c6512cb3c2ac1c7d6a41343aa";
  let url =  "https://api.openweathermap.org/data/2.5/";
  let units = "imperial";
  let searchMethod;


// the user can search by city, or by zip-code if they live in the U.S. Default is city
    const getSearchMethod = function(searchTerm) {
        if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
            searchMethod = "zip";
        else 
            searchMethod = "q";
    }

// The function to search for weather information from API
    const searchWeather = function(searchTerm) {
        getSearchMethod(searchTerm);
        fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${apiKey}&units=${units}`).then(result => {
            return result.json();
        }).then(result => {
            init(result);
        })
    }

    const init = function(query) {
        console.log(query);
        switch (query.weather[0].main) {
          case "Clear":
              document.body.style.backgroundImage = 'url("./icons/clear.jpg")';
            break;

          case "Clouds":
              document.body.style.backgroundImage = 'url("./icons/cloudy.jpg")';
            break;

          case "Drizzle":
          case "Rain":
          case "Mist":
              document.body.style.backgroundImage = 'url("./icons/rain.jpg")';
            break;

          case "Thunderstorm":
              document.body.style.backgroundImage = 'url("./icons/storm.jpg")';
            break;

          case "Snow":
              document.body.style.backgroundImage = 'url("./icons/snow.jpg")';
            break;

          case "Sunny":
              document.body.style.backgroundImage = 'url("sunny.jpg")';
            break;

            default:
                break;
            }
            const weatherDescriptionElement = document.querySelector('.currentWeatherDescription');
            const temperatureElement = document.querySelector('.temperatureValue');
            const locationElement = document.querySelector(".cityName");
            const iconElement = document.querySelector(".weatherIcon");
            
            iconElement.src = 'http://openweathermap.org/img/w/' + query.weather[0].icon + '.png';
            
            const resultDescription = query.weather[0].description
            console.log(resultDescription);
            weatherDescriptionElement.innerHTML = `<p>${resultDescription}</p>`;

            const resultCity = query.name + ', ' + query.sys.country
            console.log(resultCity);
            locationElement.innerHTML = `<h2>${resultCity}`;

            const resultTemperature = query.main.temp
            console.log(resultTemperature);
            temperatureElement.innerHTML = `<h3>${resultTemperature}`;
        }

    // Select the search button and the search box
    document.querySelector(".searchBtn").addEventListener("click", () => {
        let searchTerm = document.querySelector(".searchInput").value;
        if (searchTerm)
        searchWeather(searchTerm);
    })
    
// The weather object
    const weather = {
        temperature: {
            value: 18,
            unit: 'celcius'
        },

        description: '',
        iconId: '',
        city: '',
        country: ''
    };

// function to turn celcius to fahrenheit
// celciusToFahrenheit = function(temperature) {
//     return (temperature * 9 / 5) + 32; 
// }

// tempElement.addEventListener("click" , function() {

//     if (weather.temperature.value === undefined) return;
//     if (weather.temperature.unit ===  'celcius') {
//         let fahrenheit = celciusToFahrenheit(weather.temperature.value);
    
//         fahrenheit = Math.floor(fahrenheit);
//         tempElement.innerHTML = `${fahrenheit} &deg; <span>F</span>`;
//         weather.temperature.unit = 'fahrenheit';
    
//     } else {
//         tempElement.innerHTML = `${weather.temperature.value} &deg; <span>C</span>`;
//         weather.temperature.unit = 'celcius';
//     }
// })

