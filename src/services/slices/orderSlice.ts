import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { clearConstructor } from './burgerConstructorSlice';

type TOrderError = {
  message: string;
};

interface OrderState {
  orders: TOrder[];
  feedOrders: TOrder[];
  currentOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  totalToday: number;
}

const initialState: OrderState = {
  orders: [],
  feedOrders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
  total: 0,
  totalToday: 0
};

export const fetchFeedOrders = createAsyncThunk(
  'orders/fetchFeed',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error) {
      const orderError = error as TOrderError;
      return rejectWithValue(
        orderError.message || 'Ошибка загрузки ленты заказов'
      );
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      const orderError = error as TOrderError;
      return rejectWithValue(
        orderError.message || 'Ошибка загрузки истории заказов'
      );
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/create',
  async (ingredients: string[], { dispatch, rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);

      dispatch(clearConstructor());

      return response.order;
    } catch (error) {
      const orderError = error as TOrderError;
      return rejectWithValue(orderError.message || 'Ошибка создания заказа');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.error = null;
    },
    setOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    },
    setFeedOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.feedOrders = action.payload;
    },
    setFeedStats: (
      state,
      action: PayloadAction<{ total: number; totalToday: number }>
    ) => {
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedOrders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeedOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || 'Ошибка загрузки ленты заказов';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || 'Ошибка загрузки истории заказов';
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentOrder = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Ошибка создания заказа';
      });
  }
});

export const {
  clearCurrentOrder,
  setOrders,
  setFeedOrders,
  setFeedStats,
  clearError
} = orderSlice.actions;
export default orderSlice.reducer;

export const getOrdersState = (state: { orders: OrderState }) => state.orders;
export const getAllOrders = (state: { orders: OrderState }) =>
  state.orders.orders;
export const getFeedOrders = (state: { orders: OrderState }) =>
  state.orders.feedOrders;
export const getCurrentOrder = (state: { orders: OrderState }) =>
  state.orders.currentOrder;
export const getOrdersLoading = (state: { orders: OrderState }) =>
  state.orders.isLoading;
export const getOrdersError = (state: { orders: OrderState }) =>
  state.orders.error;
export const getFeedStateSelector = (state: { orders: OrderState }) => ({
  orders: state.orders.feedOrders,
  total: state.orders.total,
  totalToday: state.orders.totalToday
});
