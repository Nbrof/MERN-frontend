import React from "react";
const Display = (props) => {
  const {foods, selectFood, history} = props
  const loaded = () => (
    <div className = "image">
      {foods.map((food) => (
        <article key={food._id}>
          <img src={food.img}/>
          <h1>{food.name}</h1>
          <h3>{food.age}</h3>
          <button onClick={() => {
            selectFood(food)
            history.push("/edit")
          }}>
            edit
          </button>
          <button onClick={() => {
            props.deleteFood(food)
          }}>
            Delete
          </button>
        </article>
      ))}
    </div>
  )
  const loading = () => <h1>Loading</h1>
  return foods.length > 0 ? loaded() : loading()
};
export default Display;