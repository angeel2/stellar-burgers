import { FC } from 'react';

import styles from './orders-list.module.css';

import { TOrdersListUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI: FC<TOrdersListUIProps> = ({ orderByDate }) => (
  <div className={`${styles.content}`}>
    {orderByDate.map((order) => (
      <OrderCard order={order} key={order._id} />
    ))}
  </div>
);
