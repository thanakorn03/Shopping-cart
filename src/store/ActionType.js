// Action Types for Redux Store

// Product Actions
export const PRODUCT_ACTIONS = {
  SET_PRODUCTS: 'product/setProducts',
  ADD_PRODUCT: 'product/addProduct',
  UPDATE_PRODUCT: 'product/updateProduct',
  DELETE_PRODUCT: 'product/deleteProduct',
  REDUCE_QUANTITY: 'product/reduceQuantity',
  RESTORE_QUANTITY: 'product/restoreQuantity',
  SET_LOADING: 'product/setLoading',
  SET_ERROR: 'product/setError'
};

// Cart Actions
export const CART_ACTIONS = {
  ADD_TO_CART: 'cart/addToCart',
  REMOVE_FROM_CART: 'cart/removeFromCart',
  UPDATE_QUANTITY: 'cart/updateQuantity',
  CLEAR_CART: 'cart/clearCart',
  SET_CART_ITEMS: 'cart/setCartItems',
  PROCESS_ORDER: 'cart/processOrder'
};

// UI Actions
export const UI_ACTIONS = {
  SET_SEARCH_QUERY: 'ui/setSearchQuery',
  SET_CATEGORY_FILTER: 'ui/setCategoryFilter',
  SET_SORT_OPTION: 'ui/setSortOption'
};