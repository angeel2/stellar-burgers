import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect, useRef } from 'react';
import { Preloader } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  getAllOrders,
  fetchUserOrders,
  getOrdersLoading,
  setOrders
} from '../../services/slices/orderSlice';
import { getAccessToken } from '../../utils/cookie';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getAllOrders);
  const isLoading = useSelector(getOrdersLoading);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    dispatch(fetchUserOrders());

    const token = getAccessToken();
    if (token) {
      try {
        wsRef.current = new WebSocket(
          `wss://norma.nomoreparties.space/orders?token=${token.replace('Bearer ', '')}`
        );

        wsRef.current.onopen = () => {};

        wsRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.orders && data.success) {
              dispatch(setOrders(data.orders));
            }
          } catch (error) {}
        };

        wsRef.current.onerror = () => {};

        wsRef.current.onclose = () => {};
      } catch (error) {}
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [dispatch]);

  if (isLoading && orders.length === 0) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
