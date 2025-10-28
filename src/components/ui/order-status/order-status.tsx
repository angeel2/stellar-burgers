import React, { FC } from 'react';
import { TOrderStatusUIProps } from './type';

export const OrderStatusUI: FC<TOrderStatusUIProps> = ({ textStyle, text }) => (
  <span
    className='text text_type_main-default pt-2'
    style={{ color: textStyle }}
  >
    {text}
  </span>
);
