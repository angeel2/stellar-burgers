import orderReducer, {
  fetchFeedOrders,
  createOrder,
  clearCurrentOrder,
  clearError
} from '../orderSlice';

const mockOrder = {
  _id: '1',
  status: 'done',
  name: 'Test Order',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['ingredient1', 'ingredient2']
};

const mockFeedResponse = {
  orders: [mockOrder],
  total: 100,
  totalToday: 10
};

describe('orderSlice reducer', () => {
  const initialState = {
    orders: [],
    feedOrders: [],
    currentOrder: null,
    isLoading: false,
    error: null,
    total: 0,
    totalToday: 0
  };

  it('should return initial state', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('fetchFeedOrders', () => {
    it('should handle fetchFeedOrders.pending - isLoading becomes true', () => {
      const action = { type: fetchFeedOrders.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchFeedOrders.fulfilled - isLoading becomes false, feed data is set', () => {
      const action = {
        type: fetchFeedOrders.fulfilled.type,
        payload: mockFeedResponse
      };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.feedOrders).toEqual(mockFeedResponse.orders);
      expect(state.total).toBe(mockFeedResponse.total);
      expect(state.totalToday).toBe(mockFeedResponse.totalToday);
      expect(state.error).toBeNull();
    });

    it('should handle fetchFeedOrders.rejected - isLoading becomes false, error is set', () => {
      const errorMessage = 'Failed to fetch feed';
      const action = {
        type: fetchFeedOrders.rejected.type,
        payload: errorMessage
      };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('createOrder', () => {
    it('should handle createOrder.pending - isLoading becomes true, currentOrder becomes null', () => {
      const action = { type: createOrder.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.currentOrder).toBeNull();
    });

    it('should handle createOrder.fulfilled - isLoading becomes false, currentOrder is set', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.currentOrder).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });

    it('should handle createOrder.rejected - isLoading becomes false, error is set', () => {
      const errorMessage = 'Failed to create order';
      const action = {
        type: createOrder.rejected.type,
        payload: errorMessage
      };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.currentOrder).toBeNull();
    });
  });

  describe('clearCurrentOrder', () => {
    it('should clear current order and error', () => {
      const stateWithOrder = {
        ...initialState,
        currentOrder: mockOrder,
        error: 'Some error'
      };

      const action = clearCurrentOrder();
      const state = orderReducer(stateWithOrder, action);

      expect(state.currentOrder).toBeNull();
      expect(state.error).toBeNull();
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      const stateWithError = {
        ...initialState,
        error: 'Some error'
      };

      const action = clearError();
      const state = orderReducer(stateWithError, action);

      expect(state.error).toBeNull();
    });
  });
});
