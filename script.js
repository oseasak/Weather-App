const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p");
const dateAndTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

// Add event listener for search form submission
form.addEventListener('submit', searchForLocation);

// Function to fetch weather data from WeatherAPI
const fetchResults = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=06141ad474d34e2b81f213456243110&q=${targetLocation}&aqi=no`;
    console.log(`Fetching data for ${targetLocation} from ${url}`);

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched data:", data);

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Function to update weather details on the page
function updateDetails(temp, locationName, time, condition) {
    let splitDate = time.split(" ")[0];
    let splitTime = time.split(" ")[1];
    let currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateAndTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

// Function to handle location search and fetch new data
function searchForLocation(e) {
    e.preventDefault();
    let targetLocation = searchField.value;
    fetchResults(targetLocation);
}

// Initial call to fetch weather data for default location (Nigeria)
fetchResults('Nigeria');

// Helper function to get day name from day number
function getDayName(dayNumber) {
    switch (dayNumber) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return '';
    }
}
