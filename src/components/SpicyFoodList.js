import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    setFoods([...foods, newFood]);
  }
  function handleLiClick(key) {
    setFoods(() => {
      return foods.filter((food) => food.id !== key);
    });
    setFoods(() =>
      foods.map((food) => {
        if (food.id === key) {
          return {
            ...food,
            heatLevel: food.heatLevel + 1,
          };
        } else {
          return food;
        }
      })
    );
  }
  const [filterBy, setFilterBy] = useState("All");
  function handleFilter(event) {
    setFilterBy(event.target.value);
    setFoods(() =>
      filterBy === "All"
        ? foods
        : foods.filter((food) => food.cuisine === filterBy)
    );
  }
  const foodList = foods.map((food) => (
    <li
      onClick={() => {
        handleLiClick(food.id);
      }}
      key={food.id}
    >
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <select onChange={handleFilter} name="filter">
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
