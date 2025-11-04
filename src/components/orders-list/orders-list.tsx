import { FC, memo, useMemo } from 'react';
import { TOrdersListProps } from './type';
import { OrdersListUI } from '@ui';
import { useSelector } from '../../services/store';
import { getAllIngredients } from '../../services/slices/ingredientsSlice';

export const OrdersList: FC<TOrdersListProps> = memo(({ orders }) => {
  const ingredients = useSelector(getAllIngredients);

  const ordersWithTotals = useMemo(
    () =>
      orders.map((order) => ({
        ...order,
        total: order.ingredients.reduce((sum, ingredientId) => {
          const ingredient = ingredients.find(
            (ing) => ing._id === ingredientId
          );
          return sum + (ingredient?.price || 0);
        }, 0)
      })),
    [orders, ingredients]
  );

  const orderByDate = [...ordersWithTotals].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
