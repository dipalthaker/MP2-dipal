import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMealById } from '../api';
import { Meal } from '../types';

const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getMealById(id).then(setMeal);
    }
  }, [id]);

  if (!meal) return <p>Loading...</p>;

  const nextId = (parseInt(meal.idMeal) + 1).toString();
  const prevId = (parseInt(meal.idMeal) - 1).toString();

  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <h2>{meal.strMeal}</h2>
      <img className="thumb" style={{ height: 320, objectFit: 'cover', borderRadius: 14 }} 
           src={meal.strMealThumb} alt={meal.strMeal} />
      <p className="meta"><strong>Category:</strong> {meal.strCategory}</p>
      <p style={{ lineHeight: 1.6, fontSize: 16 }}>{meal.strInstructions}</p>
  
      <div className="controls" style={{ marginTop: 16 }}>
        <button className="btn" onClick={() => navigate(`/detail/${prevId}`)}>⬅ Previous</button>
        <button className="btn" onClick={() => navigate(`/detail/${nextId}`)}>Next ➡</button>
      </div>
    </div>
  );
  
  
};

export default DetailView;
