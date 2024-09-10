//Get Time and Date for selected location
document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('location');
    const dateTime = document.getElementById('dateTime');
    const weatherDescription = document.getElementById('weatherDescription');
    const temperature = document.getElementById('temperature');

    //Timezone Identifiers
    const timeZoneMap = {
        'New_York': 'America/New_York',
        'Los_Angeles': 'America/Los_Angeles',
        'London': 'Europe/London',
        'Auckland': 'Pacific/Auckland',
        'Tokyo': 'Asia/Tokyo'
    };

    //Get Time and Date
    function updateTime() {
        const location = select.value;
        const timezone = timeZoneMap[location];
        const now = new Date().toLocaleString('en-US', { timeZone: timezone });
    
        //Format the display of the date
        const options = {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(now));
        dateTime.textContent = `${formattedDate}`;
    }

    //Fetch Weather Data
    async function fetchWeather(location) {
        const apiKey = 'feab3ba4706440918f315034241009';
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

            try {
                const response = await
        fetch(url);
                const data = await
        response.json();
                weatherDescription.textContent = data.current.condition.text;
                temperature.textContent = `${data.current.temp_c}°C`;
            } catch (error) {
                console.error('Error fetching weather data:', error);
        }
    }

    //Trigger change event on page load to show initial time and weather
    select.addEventListener('change', () =>
{
        updateTime();
        fetchWeather(select.value);
    });
    updateTime();
    fetchWeather(select.value);

    //Update time every second
    setInterval(updateTime, 1000);
});