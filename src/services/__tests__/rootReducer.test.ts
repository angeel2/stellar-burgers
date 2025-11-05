import { rootReducer } from '../rootReducer';
import ingredientsReducer from '../slices/ingredientsSlice';
import authReducer from '../slices/authSlice';
import orderReducer from '../slices/orderSlice';
import burgerConstructorReducer from '../slices/burgerConstructorSlice';

describe('rootReducer', () => {
  it('should properly initialize with all reducers', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('burgerConstructor');
  });

  it('should combine all reducers correctly', () => {
    const initialState = {
      ingredients: ingredientsReducer(undefined, { type: '@@INIT' }),
      auth: authReducer(undefined, { type: '@@INIT' }),
      orders: orderReducer(undefined, { type: '@@INIT' }),
      burgerConstructor: burgerConstructorReducer(undefined, { type: '@@INIT' })
    };

    const rootState = rootReducer(undefined, { type: '@@INIT' });

    expect(rootState).toEqual(initialState);
  });

  it('should return correct initial state structure', () => {
    const state = rootReducer(undefined, { type: '' });

    expect(state.ingredients).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });

    expect(state.auth).toEqual({
      user: null,
      isAuth: false,
      isLoading: false,
      error: null
    });

    expect(state.orders).toEqual({
      orders: [],
      feedOrders: [],
      currentOrder: null,
      isLoading: false,
      error: null,
      total: 0,
      totalToday: 0
    });

    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('should handle actions in respective reducers', () => {
    const action = { type: 'TEST_ACTION' };
    const state = rootReducer(undefined, action);

    expect(state.ingredients).toEqual(ingredientsReducer(undefined, action));
    expect(state.auth).toEqual(authReducer(undefined, action));
    expect(state.orders).toEqual(orderReducer(undefined, action));
    expect(state.burgerConstructor).toEqual(
      burgerConstructorReducer(undefined, action)
    );
  });

  it('should have correct RootState type', () => {
    const state: ReturnType<typeof rootReducer> = rootReducer(undefined, {
      type: ''
    });

    expect(state.ingredients.ingredients).toBeInstanceOf(Array);
    expect(state.ingredients.isLoading).toBe(false);
    expect(state.ingredients.error).toBeNull();

    expect(state.auth.user).toBeNull();
    expect(state.auth.isAuth).toBe(false);
    expect(state.auth.isLoading).toBe(false);
    expect(state.auth.error).toBeNull();

    expect(state.orders.orders).toBeInstanceOf(Array);
    expect(state.orders.feedOrders).toBeInstanceOf(Array);
    expect(state.orders.currentOrder).toBeNull();
    expect(state.orders.isLoading).toBe(false);
    expect(state.orders.error).toBeNull();
    expect(state.orders.total).toBe(0);
    expect(state.orders.totalToday).toBe(0);

    expect(state.burgerConstructor.bun).toBeNull();
    expect(state.burgerConstructor.ingredients).toBeInstanceOf(Array);
  });
});
