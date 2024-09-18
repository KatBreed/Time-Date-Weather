document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('location');
    const dateTime = document.getElementById('dateTime');
    const weatherDescription = document.getElementById('weatherDescription');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const uvIndex = document.getElementById('uvIndex');
    const weatherIcon = document.getElementById('weatherIcon');
    const toggleTempUnit = document.getElementById('toggleTempUnit');
    let isCelsius = true;

    const timeZoneMap = {
        'New_York': 'America/New_York',
        'Los_Angeles': 'America/Los_Angeles',
        'London': 'Europe/London',
        'Auckland': 'Pacific/Auckland',
        'Tokyo': 'Asia/Tokyo'
    };

    function updateTime() {
        const location = select.value;
        const timezone = timeZoneMap[location];
        const now = new Date().toLocaleString('en-US', { timeZone: timezone });
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(now));
        dateTime.textContent = `${formattedDate}`;
    }

    async function fetchWeather(location) {
        const apiKey = 'feab3ba4706440918f315034241009';
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            weatherDescription.textContent = data.current.condition.text;
            temperature.textContent = `${data.current.temp_c}°C`;
            humidity.textContent = `Humidity: ${data.current.humidity}%`;
            windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} kph`;
            uvIndex.textContent = `UV Index: ${data.current.uv}`;

            // Check if the icon URL is valid
            const iconUrl = data.current.condition.icon;
            if (iconUrl) {
                weatherIcon.src = `https:${iconUrl}`;
                weatherIcon.alt = data.current.condition.text;
            } else {
                weatherIcon.src = '';
                weatherIcon.alt = 'No icon available';
            }            
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function toggleTemperatureUnit() {
        const tempValue = parseFloat(temperature.textContent);
        if (isCelsius) {
            temperature.textContent = `${(tempValue * 9/5 + 32).toFixed(1)}°F`;
        } else {
            temperature.textContent = `${((tempValue - 32) * 5/9).toFixed(1)}°C`;
        }
        isCelsius = !isCelsius;
    }

    select.addEventListener('change', () => {
        updateTime();
        fetchWeather(select.value);
    });
    toggleTempUnit.addEventListener('click', toggleTemperatureUnit);

    updateTime();
    fetchWeather(select.value);
    setInterval(updateTime, 1000);
});
