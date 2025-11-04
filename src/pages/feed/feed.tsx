import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getFeedOrders,
  fetchFeedOrders,
  getOrdersLoading,
  setFeedOrders,
  setFeedStats
} from '../../services/slices/orderSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeedOrders);
  const isLoading = useSelector(getOrdersLoading);
  const wsRef = useRef<WebSocket | null>(null);

  const fetchFeedData = () => {
    dispatch(fetchFeedOrders());
  };

  useEffect(() => {
    fetchFeedData();

    try {
      wsRef.current = new WebSocket(
        'wss://norma.nomoreparties.space/orders/all'
      );

      wsRef.current.onopen = () => {};

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.orders && data.success) {
            dispatch(setFeedOrders(data.orders));
            dispatch(
              setFeedStats({
                total: data.total || 0,
                totalToday: data.totalToday || 0
              })
            );
          }
        } catch (error) {}
      };

      wsRef.current.onerror = () => {};

      wsRef.current.onclose = () => {};
    } catch (error) {}

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [dispatch]);

  if (isLoading && orders.length === 0) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} fetchFeedData={fetchFeedData} />;
};
