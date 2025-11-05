import burgerConstructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../burgerConstructorSlice';

const mockBun = {
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
};

const mockIngredient = {
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
};

const mockIngredient2 = {
  _id: '3',
  name: 'Test Ingredient 2',
  type: 'sauce',
  proteins: 5,
  fat: 2,
  carbohydrates: 8,
  calories: 80,
  price: 50,
  image: 'image-url',
  image_large: 'image-large-url',
  image_mobile: 'image-mobile-url'
};

describe('burgerConstructorSlice reducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('should return initial state', () => {
    expect(burgerConstructorReducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  describe('addBun', () => {
    it('should handle adding a bun', () => {
      const action = addBun(mockBun);
      const state = burgerConstructorReducer(initialState, action);

      expect(state.bun).toEqual(mockBun);
      expect(state.ingredients).toEqual([]);
    });

    it('should replace existing bun when adding new one', () => {
      const firstState = burgerConstructorReducer(
        initialState,
        addBun(mockBun)
      );
      const newBun = { ...mockBun, _id: '4', name: 'New Bun' };
      const state = burgerConstructorReducer(firstState, addBun(newBun));

      expect(state.bun).toEqual(newBun);
    });
  });

  describe('addIngredient', () => {
    it('should handle adding an ingredient', () => {
      const action = addIngredient(mockIngredient);
      const state = burgerConstructorReducer(initialState, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(mockIngredient);
    });

    it('should add multiple ingredients to the end of the list', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      state = burgerConstructorReducer(state, addIngredient(mockIngredient2));

      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients[0]).toEqual(mockIngredient);
      expect(state.ingredients[1]).toEqual(mockIngredient2);
    });
  });

  describe('removeIngredient', () => {
    it('should handle removing an ingredient by index', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      state = burgerConstructorReducer(state, addIngredient(mockIngredient2));

      expect(state.ingredients).toHaveLength(2);

      state = burgerConstructorReducer(state, removeIngredient('0'));

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(mockIngredient2);
    });

    it('should not remove anything if index is out of bounds', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      const originalIngredients = [...state.ingredients];

      state = burgerConstructorReducer(state, removeIngredient('5'));

      expect(state.ingredients).toEqual(originalIngredients);
    });
  });

  describe('moveIngredient', () => {
    it('should move ingredient from one position to another', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      state = burgerConstructorReducer(state, addIngredient(mockIngredient2));

      expect(state.ingredients[0]).toEqual(mockIngredient);
      expect(state.ingredients[1]).toEqual(mockIngredient2);

      state = burgerConstructorReducer(
        state,
        moveIngredient({ from: 0, to: 1 })
      );

      expect(state.ingredients[0]).toEqual(mockIngredient2);
      expect(state.ingredients[1]).toEqual(mockIngredient);
    });

    it('should handle moving ingredient to the same position', () => {
      let state = burgerConstructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      state = burgerConstructorReducer(state, addIngredient(mockIngredient2));
      const originalIngredients = [...state.ingredients];

      state = burgerConstructorReducer(
        state,
        moveIngredient({ from: 0, to: 0 })
      );

      expect(state.ingredients).toEqual(originalIngredients);
    });
  });

  describe('clearConstructor', () => {
    it('should clear all ingredients and bun', () => {
      let state = burgerConstructorReducer(initialState, addBun(mockBun));
      state = burgerConstructorReducer(state, addIngredient(mockIngredient));
      state = burgerConstructorReducer(state, addIngredient(mockIngredient2));

      expect(state.bun).not.toBeNull();
      expect(state.ingredients).toHaveLength(2);

      state = burgerConstructorReducer(state, clearConstructor());

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });
  });
});
