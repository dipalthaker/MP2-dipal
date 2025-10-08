import React, { useEffect, useState } from 'react';
import { getMealsByCategory } from '../api';
import { Meal } from '../types';
import { Link } from 'react-router-dom';

const categories = ['Beef', 'Chicken', 'Dessert', 'Seafood', 'Vegan', 'Vegetarian'];

const GalleryView: React.FC = () => {
  const [category, setCategory] = useState('Seafood');
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    getMealsByCategory(category).then(setMeals);
  }, [category]);

  return (
    <div className="container">
      <h2>Gallery View</h2>

      <div className="controls">
        <select
          className="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {meals.map((meal) => (
          <article className="card" key={meal.idMeal}>
            <Link to={`/detail/${meal.idMeal}`}>
              <img className="thumb" src={meal.strMealThumb} alt={meal.strMeal} />
              <div className="card-body">
                <h3 className="card-title">{meal.strMeal}</h3>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default GalleryView;
