import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getAllIngredients } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredientId = useParams().id;

  const ingredients = useSelector(getAllIngredients);
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === ingredientId
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
