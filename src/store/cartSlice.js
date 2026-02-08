import { createSlice } from '@reduxjs/toolkit';
import { CART_ACTIONS } from './ActionType';

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    [CART_ACTIONS.ADD_TO_CART]: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      // Only add if product has stock available
      if (newItem.quantity > 0) {
        if (!existingItem) {
          state.items.push({
            ...newItem,
            quantity: 1,
            totalPrice: newItem.price,
            originalQuantity: newItem.quantity
          });
          state.totalQuantity++;
          state.totalAmount += newItem.price;
        } else {
          // Check if adding another unit would exceed available stock
          if (existingItem.quantity < existingItem.originalQuantity) {
            existingItem.quantity++;
            existingItem.totalPrice += newItem.price;
            state.totalQuantity++;
            state.totalAmount += newItem.price;
          }
        }
      }
    },
    [CART_ACTIONS.REMOVE_FROM_CART]: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    [CART_ACTIONS.UPDATE_QUANTITY]: (state, action) => {
      const { id, type } = action.payload; // type: 'increment' or 'decrement'
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        if (type === 'increment') {
          existingItem.quantity++;
          existingItem.totalPrice += existingItem.price;
          state.totalQuantity++;
          state.totalAmount += existingItem.price;
        } else if (type === 'decrement' && existingItem.quantity > 1) {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
          state.totalQuantity--;
          state.totalAmount -= existingItem.price;
        }
      }
    },
    [CART_ACTIONS.CLEAR_CART]: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    [CART_ACTIONS.PROCESS_ORDER]: (state) => {
      // Clear cart after successful payment
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    [CART_ACTIONS.SET_CART_ITEMS]: (state, action) => {
      state.items = action.payload;
      // Recalculate totals
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    }
  }
});

export const { 
  [CART_ACTIONS.ADD_TO_CART]: addToCart,
  [CART_ACTIONS.REMOVE_FROM_CART]: removeFromCart,
  [CART_ACTIONS.UPDATE_QUANTITY]: updateQuantity,
  [CART_ACTIONS.CLEAR_CART]: clearCart,
  [CART_ACTIONS.PROCESS_ORDER]: processOrder,
  [CART_ACTIONS.SET_CART_ITEMS]: setCartItems
} = cartSlice.actions;
// Export action types for external use
export const CART_ACTION_TYPES = CART_ACTIONS;

export default cartSlice.reducer;
