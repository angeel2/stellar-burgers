import { useSelector } from '../../services/store';
import {
  getIngredientsLoading,
  getAllIngredients
} from '../../services/slices/ingredientsSlice';
import styles from './constructor-page.module.css';
import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  const isLoading = useSelector(getIngredientsLoading);
  const ingredients = useSelector(getAllIngredients);

  if (isLoading) {
    return <Preloader />;
  }

  if (ingredients.length === 0) {
    return <div>Не удалось загрузить ингредиенты</div>;
  }

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
