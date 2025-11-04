import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { getAllIngredients } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { getFeedOrders, getAllOrders } from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const orderNumber = number ? parseInt(number) : 0;

  const ingredients: TIngredient[] = useSelector(getAllIngredients);
  const feedOrders = useSelector(getFeedOrders);
  const userOrders = useSelector(getAllOrders);

  const allOrders = [...feedOrders, ...userOrders];
  const orderData = allOrders.find((order) => order.number === orderNumber);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = (orderData.ingredients || []).reduce(
      (accumulator: TIngredientsWithCount, ingredientId) => {
        if (!accumulator[ingredientId]) {
          const ingredient = ingredients.find(
            (ing) => ing._id === ingredientId
          );
          if (ingredient) {
            accumulator[ingredientId] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          accumulator[ingredientId].count++;
        }

        return accumulator;
      },
      {}
    );

    const totalPrice = Object.values(ingredientsInfo).reduce(
      (sum, ingredient) => sum + ingredient.price * ingredient.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total: totalPrice
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
