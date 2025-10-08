import React, { useEffect, useState } from 'react';
import { Meal } from '../types';
import { searchMeals } from '../api';
import { Link } from 'react-router-dom';

const ListView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [sortKey, setSortKey] = useState<'strMeal' | 'idMeal'>('strMeal');
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== '') {
        searchMeals(query).then(setMeals);
      } else {
        setMeals([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const sortedMeals = [...meals].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue < bValue) return ascending ? -1 : 1;
    if (aValue > bValue) return ascending ? 1 : -1;
    return 0;
  });

  return (
    <div className="container">
      <h2>Search Meals</h2>

      <div className="controls">
        <input
          className="input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search..."
        />

        <button className="btn" onClick={() => setAscending(!ascending)}>
          {ascending ? 'Asc' : 'Desc'}
        </button>

        <select
          className="select"
          onChange={(e) => setSortKey(e.target.value as 'strMeal' | 'idMeal')}
          value={sortKey}
        >
          <option value="strMeal">Name</option>
          <option value="idMeal">ID</option>
        </select>
      </div>

      <div className="grid">
        {sortedMeals.map((meal) => (
          <article className="card" key={meal.idMeal}>
            <Link to={`/detail/${meal.idMeal}`}>
              <img className="thumb" src={meal.strMealThumb} alt={meal.strMeal} />
              <div className="card-body">
                <h3 className="card-title">{meal.strMeal}</h3>
                <div className="meta">ID: {meal.idMeal}</div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ListView;
