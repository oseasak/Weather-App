const temperatureField = document.querySelector(".temp_value");
const locationField = document.querySelector(".location_name");
const dateAndTimeField = document.querySelector(".date_time");
const conditionField = document.querySelector(".condition_text");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");


form.addEventListener('submit', searchForLocation);

let target = 'Nigeria';

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=06141ad474d34e2b81f213456243110&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        console.log(data);

        const locationName = data.location.name;
        const time = data.location.localtime;
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

function updateDetails(temp, locationName, time, condition) {
    const [splitDate, splitTime] = time.split(" ");
    const date = new Date(`${splitDate}T${splitTime}`); // Ensure correct format

    const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateAndTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    
    target = searchField.value.trim();

    if (target) {
        fetchResults(target);
    } else {
        alert("Please enter a location.");
    }
}

fetchResults(target);

function getDayName(number) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[number] || '';
}
