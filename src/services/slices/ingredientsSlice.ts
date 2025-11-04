import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
      });
  }
});

export const { clearError } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

export const getIngredientsState = (state: { ingredients: IngredientsState }) =>
  state.ingredients;

export const getAllIngredients = createSelector(
  getIngredientsState,
  (ingredientsState) => ingredientsState.ingredients
);

export const getIngredientsLoading = createSelector(
  getIngredientsState,
  (ingredientsState) => ingredientsState.isLoading
);

export const getIngredientsError = createSelector(
  getIngredientsState,
  (ingredientsState) => ingredientsState.error
);

export const getBuns = createSelector(getAllIngredients, (ingredients) =>
  ingredients.filter((item) => item.type === 'bun')
);

export const getMains = createSelector(getAllIngredients, (ingredients) =>
  ingredients.filter((item) => item.type === 'main')
);

export const getSauces = createSelector(getAllIngredients, (ingredients) =>
  ingredients.filter((item) => item.type === 'sauce')
);
