import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthorized } from '../../services/slices/authSlice';
import { getConstructorState } from '../../services/slices/burgerConstructorSlice';
import {
  createOrder,
  getCurrentOrder,
  getOrdersLoading,
  clearCurrentOrder
} from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuth = useSelector(isAuthorized);
  const constructorItems = useSelector(getConstructorState);
  const orderRequest = useSelector(getOrdersLoading);
  const orderModalData = useSelector(getCurrentOrder);

  const createNewOrder = () => {
    if (!isAuth) {
      navigate('/login', { state: { from: location } });
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const bunId = constructorItems.bun._id;
    const ingredientsIds =
      constructorItems.ingredients?.map((ingredient) => ingredient._id) || [];
    const order = [bunId, ...ingredientsIds, bunId];

    dispatch(createOrder(order));
  };

  const closeOrderModal = () => {
    if (orderModalData) {
      dispatch(clearConstructor());
    }
    dispatch(clearCurrentOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients?.reduce(
        (sum: number, ingredient: TIngredient) => sum + ingredient.price,
        0
      ) || 0),
    [constructorItems]
  );

  const constructorItemsForUI = useMemo(
    () => ({
      ...constructorItems,
      ingredients: constructorItems.ingredients.map((ingredient, index) => ({
        ...ingredient,
        id: `${ingredient._id}-${index}`
      }))
    }),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItemsForUI}
      orderModalData={orderModalData}
      onOrderClick={createNewOrder}
      closeOrderModal={closeOrderModal}
    />
  );
};
