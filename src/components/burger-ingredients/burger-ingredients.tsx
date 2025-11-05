import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector, useDispatch } from '../../services/store';
import {
  fetchIngredients,
  getBuns,
  getMains,
  getSauces,
  getIngredientsLoading,
  getAllIngredients
} from '../../services/slices/ingredientsSlice';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { Preloader } from '../ui/preloader';

export const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getIngredientsLoading);
  const ingredients = useSelector(getAllIngredients);
  const buns = useSelector(getBuns);
  const mains = useSelector(getMains);
  const sauces = useSelector(getSauces);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) setCurrentTab('bun');
    else if (inViewSauces) setCurrentTab('sauce');
    else if (inViewFilling) setCurrentTab('main');
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const switchTab = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    const refs = {
      bun: titleBunRef,
      main: titleMainRef,
      sauce: titleSaucesRef
    };
    refs[tab as TTabMode].current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={switchTab}
    />
  );
};
