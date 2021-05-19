import React from 'react';
import './App.css';
import { Route, Link, Switch } from "react-router-dom"
import Display from "./Display";
import Form from "./Form"

function App() {

// const url = "http://localhost:4000"
const url = "https://mern-backend-nb.herokuapp.com"

const [foods, setFoods] = React.useState([])


const emptyFood = {

  name: "",
  origin: "",
  img: "",
  
}

const [selectedFood, setSelectedFood] = React.useState(emptyFood)

const getFood = () => {
  
  fetch(url + "/foods/")
  .then((response) => response.json())
  .then((data) => {
    setFoods(data);
  });

};

React.useEffect(() => {
  getFood();
}, [])

          
const handleCreate = (newFood) => {
  fetch(url + "/foods/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFood),
  }).then(() => getFood());
};

const handleUpdate = (food) => {
  fetch(url + "/foods/" + food._id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(food),
  }).then(() => getFood());
};

const selectFood = (food) => {
  setSelectedFood(food)
}

const deleteFood = (food) => {
  fetch(url + "/foods/" + food._id, {
    method: "delete"
  })
  .then(() => {
    getFood()
  })
}

  return (
    <div className="App">
      <header><h1>Favorite Foods site</h1>
      <h6>A website for displaying some of your favorite foods, Click the buttons below!</h6>
      </header>
      
      <hr />
      <Link to="/create">
        <button>Add Food</button>
      </Link>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display 
              {...rp} 
              foods={foods} 
              selectFood={selectFood}
              deleteFood={deleteFood} />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                food={emptyFood}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form 
              {...rp} 
              label="update" 
              food={selectedFood} 
              handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
      <footer>
        <h3>Test site by Nikolaus Brodfuehrer, 2021</h3>
      </footer>
    </div>
  );
}

export default App;
