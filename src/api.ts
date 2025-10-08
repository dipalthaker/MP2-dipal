import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMeals = async (query: string) => {
    const res = await axios.get(`${BASE_URL}/search.php?s=${query}`);
    return res.data.meals || [];
  };
  

export const getMealById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
  return res.data.meals[0];
};

export const getMealsByCategory = async (category: string) => {
  const res = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
  return res.data.meals || [];
};
