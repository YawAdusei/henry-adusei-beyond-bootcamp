// Pseudo Code for weather application

        // User enters name of a city into the search bar
            // When the user clicks on submit button, make a call to weather api to retrieve:
                // current weather description ie "sunny"
                // Icon to match weather condition
                // current temperature value ie 20 degrees celcius
            
            // place the results on the DOM dynamically
                // current weather description
                // icon to match weather condition 
                // current temperature value
                
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
        // The switch statement will display a different background image based on the result from the search.
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
            
            const iconResult = `http://openweathermap.org/img/wn/${query.weather[0].icon}.png`;
            console.log(iconResult);
            iconElement.innerHTML = `<img src='${iconResult}' alt='weather icon'>`;

            // Displaying the weather description 
                // created a variable to get the weather description
            const resultDescription = query.weather[0].description;
            console.log(resultDescription);
                // dynamically place result in the weather description div
            weatherDescriptionElement.innerHTML = `<p>${resultDescription.charAt(0).toUpperCase()}${resultDescription.slice(1)}</p>`;

            // Displaying the name of the city
                // created a variable to get the city
            const resultCity = query.name + ', ' + query.sys.country
            console.log(resultCity);
                //  dynamically place result in the location div
            locationElement.innerHTML = `<h2>${resultCity}</h2>`;

            // Displaying the temperature 
                // created a variable to get the temperature
            const resultTemperature = query.main.temp
            console.log(resultTemperature);
                // dynamically place result in the temperature value div
            temperatureElement.innerHTML = `<h3>${Math.floor(
              resultTemperature)}&#176</h3>`;

            // calling the function to set the position of the weather container 
            setPositionforWeatherInfo();
        }

        const setPositionforWeatherInfo = () => {
            let weatherContainer = document.querySelector('.weatherContainer');
            let weatherContainerHeight = weatherContainer.clientHeight;
            let weatherContainerWidth = weatherContainer.clientWidth;

            weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
            weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
            weatherContainer.style.visibility = 'visible';
        }

    // Select the search button and the search box
    document.querySelector(".searchBtn").addEventListener("click", (e) => {
        // get the value inputted in the search box
        e.preventDefault();
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

