//Get Time and Date for selected location
document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('location');
    const dateTime = document.getElementById('dateTime');

    //Timezone Identifiers
    const timeZoneMap = {
        'New York': 'America/New_York',
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

    // Trigger change event on page load to show initial time
    select.addEventListener('change', updateTime);
    updateTime();

    //Update time every second
    setInterval(updateTime, 1000);
});