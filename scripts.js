//define the part of the website it will act
const app = document.getElementById('root');

//just a logo
const logo = document.createElement('img');
logo.src = 'logo.png';

//create the DIV element where we will populate with the objects of the json
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

let request = new XMLHttpRequest();
//the url to consult api
request.open('GET', 'http://127.0.0.1:8080/people', true);
//the http function running after get response from server
request.onload = function () {

  // Parse JSON data and store in data object
  let data = JSON.parse(this.response);
  //Test the success of the request
  if (request.status >= 200 && request.status < 400) {
      //This part is where we read the individual items of the JSON.
      //ForEach needs an array[] to run and a variable(can be anything, but in this case refers to a list of people).
      //Spring API returns the array inside the {_embedded{person[array]}}, look for the [] array inside your JSON.
      //In the following lines we create a Card(a box) and populate it with the JSON info. At the end we insert it on the main DIV.
      //Note that the attribute must match the name of the attribute in your JSON. person.firstName for instance.
      data._embedded.people.forEach(person => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = person.firstName + " " + person.lastName;

      const p = document.createElement('p');
      p.textContent = `Last Name: ${person.lastName}...`;
      const p2 = document.createElement('p');
      p2.textContent = 'City: ' + person.city;


      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(p2);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();
