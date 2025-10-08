import React, { useEffect, useState } from 'react';
import { Meal } from '../types';
import { searchMeals } from '../api';
import { Link } from 'react-router-dom';

const ListView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [sortKey, setSortKey] = useState<'strMeal' | 'idMeal'>('strMeal');
  const [ascending, setAscending] = useState(true);

  // Search API call
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== '') {
        searchMeals(query).then(setMeals);
      } else {
        setMeals([]);
      }
    }, 300); // debounce input
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Sort meals
  const sortedMeals = [...meals].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue < bValue) return ascending ? -1 : 1;
    if (aValue > bValue) return ascending ? 1 : -1;
    return 0;
  });

  return (
    <>
      <h2>Search Meals</h2>
  
      <div className="controls">
        <input
          className="input"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Type to search (e.g., chicken, beef, pie)"
        />
  
        <button className="btn" onClick={() => setAscending(!ascending)}>
          {ascending ? 'Asc' : 'Desc'}
        </button>
  
        <select
          className="select"
          onChange={e => setSortKey(e.target.value as 'strMeal' | 'idMeal')}
          value={sortKey}
        >
          <option value="strMeal">Name</option>
          <option value="idMeal">ID</option>
        </select>
      </div>
  
      {/* card grid instead of bullet list */}
      <div className="grid">
        {sortedMeals.map(meal => (
          <article className="card" key={meal.idMeal}>
            <a href={`/mp2/detail/${meal.idMeal}`}>
              <img className="thumb" src={meal.strMealThumb} alt={meal.strMeal} />
            </a>
            <div className="card-body">
              <h3 className="card-title">
                <a href={`/mp2/detail/${meal.idMeal}`}>{meal.strMeal}</a>
              </h3>
              <div className="meta">ID: {meal.idMeal}</div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default ListView;
