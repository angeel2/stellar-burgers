import ingredientsReducer, {
  fetchIngredients,
  clearError
} from '../ingredientsSlice';

const mockIngredients = [
  {
    _id: '1',
    name: 'Test Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 200,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url'
  },
  {
    _id: '2',
    name: 'Test Ingredient',
    type: 'main',
    proteins: 15,
    fat: 10,
    carbohydrates: 5,
    calories: 150,
    price: 100,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url'
  }
];

describe('ingredientsSlice reducer', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  it('should return initial state', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('fetchIngredients', () => {
    it('should handle fetchIngredients.pending - isLoading becomes true', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchIngredients.fulfilled - isLoading becomes false, data is set', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredients);
      expect(state.error).toBeNull();
    });

    it('should handle fetchIngredients.rejected - isLoading becomes false, error is set', () => {
      const errorMessage = 'Failed to fetch ingredients';
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: errorMessage }
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage); // Исправлено - используем реальное сообщение
      expect(state.ingredients).toEqual([]);
    });

    it('should handle fetchIngredients.rejected with payload - custom error message', () => {
      const errorMessage = 'Custom error message';
      const action = {
        type: fetchIngredients.rejected.type,
        payload: errorMessage
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      const stateWithError = {
        ...initialState,
        error: 'Some error message'
      };

      const action = clearError();
      const state = ingredientsReducer(stateWithError, action);

      expect(state.error).toBeNull();
    });

    it('should not affect other state properties when clearing error', () => {
      const stateWithData = {
        ingredients: mockIngredients,
        isLoading: false,
        error: 'Some error'
      };

      const action = clearError();
      const state = ingredientsReducer(stateWithData, action);

      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual(mockIngredients);
      expect(state.isLoading).toBe(false);
    });
  });
});
