import { createSlice } from '@reduxjs/toolkit';
import { UI_ACTIONS } from './ActionType';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    searchQuery: '',
    categoryFilter: 'All',
    sortOption: 'name'
  },
  reducers: {
    [UI_ACTIONS.SET_SEARCH_QUERY]: (state, action) => {
      state.searchQuery = action.payload;
    },
    [UI_ACTIONS.SET_CATEGORY_FILTER]: (state, action) => {
      state.categoryFilter = action.payload;
    },
    [UI_ACTIONS.SET_SORT_OPTION]: (state, action) => {
      state.sortOption = action.payload;
    }
  }
});

export const { 
  [UI_ACTIONS.SET_SEARCH_QUERY]: setSearchQuery,
  [UI_ACTIONS.SET_CATEGORY_FILTER]: setCategoryFilter,
  [UI_ACTIONS.SET_SORT_OPTION]: setSortOption
} = uiSlice.actions;

// Export action types for external use
export const UI_ACTION_TYPES = UI_ACTIONS;

export default uiSlice.reducer;