import React, { FC } from 'react';
import { TOrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusTextMap: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

export const OrderStatus: FC<TOrderStatusProps> = ({ status }) => {
  let textColor = '';
  switch (status) {
    case 'pending':
      textColor = '#E52B1A';
      break;
    case 'done':
      textColor = '#00CCCC';
      break;
    default:
      textColor = '#F2F2F3';
  }

  return <OrderStatusUI textStyle={textColor} text={statusTextMap[status]} />;
};
