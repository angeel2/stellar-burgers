import { TOrder } from '@utils-types';

export type TFeedUIProps = {
  orders: TOrder[];
  fetchFeedData: () => void;
};
