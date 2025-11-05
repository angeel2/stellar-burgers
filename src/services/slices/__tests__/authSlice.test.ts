import authReducer, { getUser, clearError, setAuth } from '../authSlice';

const mockUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('authSlice reducer', () => {
  const initialState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null
  };

  it('should return initial state', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('getUser', () => {
    it('should handle getUser.pending - isLoading becomes true', () => {
      const action = { type: getUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    it('should handle getUser.fulfilled - isLoading becomes false, user data is set, isAuth becomes true', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
    });

    it('should handle getUser.rejected - isLoading becomes false, isAuth becomes false, user becomes null', () => {
      const action = { type: getUser.rejected.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isAuth).toBe(false);
      expect(state.user).toBeNull();
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      const stateWithError = {
        ...initialState,
        error: 'Some error'
      };

      const action = clearError();
      const state = authReducer(stateWithError, action);

      expect(state.error).toBeNull();
    });
  });

  describe('setAuth', () => {
    it('should set auth state to true', () => {
      const action = setAuth(true);
      const state = authReducer(initialState, action);

      expect(state.isAuth).toBe(true);
    });

    it('should set auth state to false', () => {
      const stateWithAuth = {
        ...initialState,
        isAuth: true
      };

      const action = setAuth(false);
      const state = authReducer(stateWithAuth, action);

      expect(state.isAuth).toBe(false);
    });
  });
});
