let key = "fe9a6b6493b5d9374d904be30443f809";
let city = "vadodara";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

const weatherData = async () => {
  let response = await fetch(url);
  console.log(response);
  let data = await response.json();
  console.log(data);
};
