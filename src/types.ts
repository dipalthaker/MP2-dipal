export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strInstructions?: string;
    [key: string]: any;
  }
  