import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { TBurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  removeIngredient,
  moveIngredient
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<TBurgerConstructorElementProps> =
  memo(({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const moveDown = () => {
      if (index < totalItems - 1) {
        dispatch(moveIngredient({ from: index, to: index + 1 }));
      }
    };

    const moveUp = () => {
      if (index > 0) {
        dispatch(moveIngredient({ from: index, to: index - 1 }));
      }
    };

    const remove = () => {
      dispatch(removeIngredient(index.toString()));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={moveUp}
        handleMoveDown={moveDown}
        handleClose={remove}
      />
    );
  });
