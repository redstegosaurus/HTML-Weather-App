function getWeather(){
    //api key from weather service
    const apiKey ='d9da0b15a0aaf4e2725d4b450984daf8';
    const city = document.getElementById('city').value;

    if(!city){
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

 // Make a request to the specified URL to get current weather data
    fetch(currentWeatherUrl)
    // Once the response is received, convert it from JSON to a JavaScript object
        .then(Response => Response.json())
    // Once the data is parsed, do something with it—in this case, display it on the page
        .then(data => {
            displayWeather(data); 
        })
        .catch(error => {
            console.error('Error fetching current weather data', error); 
            alert('Error fetching current weather data. Please try again.');
        });
        //all this^^^^ is called promise chaining

}

function displayWeather(data){
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon')


    //clear prev content
    weatherInfoDiv.innerHTML='';
    tempDivInfo.innerHTML='';

    if (data.cod === '404'){
        weatherInfoDiv.innerHTML =`<p>${data.message}</p>`
    }else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        //these are back ticks not quotes
       const temperatureHtml = `
            <p>${temperature} C</p>
        `;
             //feed the prgm html like this
            const weatherHtml = `
                <p>${cityName}</p>
                <p>${description}</p>
            
            `;

            tempDivInfo.innerHTML = temperatureHtml;
            weatherInfoDiv.innerHTML = weatherHtml;
            weatherIcon.src = iconUrl;
            weatherIcon.alt = description;

            showImage();
    }

    function showImage(){
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block';
    }

}