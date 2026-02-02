import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    {
      id: 1,
      name: "High-End Laptop",
      description: "Latest generation high-performance laptop for professionals.",
      category: "Electronics",
      price: 1200,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
      quantity: 10
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      description: "Tactile mechanical keyboard with RGB backlighting.",
      category: "Accessories",
      price: 150,
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80",
      quantity: 25
    },
    {
      id: 3,
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse with high-precision sensor.",
      category: "Accessories",
      price: 80,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
      quantity: 30
    },
    {
      id: 4,
      name: "Gaming Headphones",
      description: "High-quality gaming headphones with noise cancellation.",
      category: "Electronics",
      price: 200,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      quantity: 15
    },
    {
      id: 5,
      name: "Wireless Earbuds",
      description: "Comfortable wireless earbuds with long battery life.",
      category: "Electronics",
      price: 100,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
      quantity: 20
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      description: "Portable Bluetooth speaker with high-quality sound and deep bass.",
      category: "Electronics",
      price: 120,
      image: "https://th.bing.com/th/id/OIP.sJhOvSGxp1Fv_5VTX_ZYgAHaDt?w=308&h=150&c=6&o=7&dpr=1.3&pid=1.7&rm=3",
      quantity: 18
    },
    {
      id: 7,
      name: "Smart Watch",
      description: "Fitness tracker with heart rate monitor and GPS.",
      category: "Electronics",
      price: 250,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      quantity: 12
    },
    {
      id: 8,
      name: "4K Monitor",
      description: "Ultra HD monitor with vibrant colors for creative work.",
      category: "Electronics",
      price: 450,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
      quantity: 8
    },
    {
      id: 9,
      name: "External SSD",
      description: "High-speed portable storage for large data transfers.",
      category: "Accessories",
      price: 130,
      image: "https://th.bing.com/th/id/OIP.azf8R_lWZ_-hnyX9JcovVQHaEo?w=267&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      quantity: 22
    },
    {
      id: 10,
      name: "Web Camera",
      description: "1080p Full HD camera for high-quality video calls.",
      category: "Accessories",
      price: 90,
      image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&q=80",
      quantity: 14
    }
  ]
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const maxId = state.products.length > 0 
        ? Math.max(...state.products.map(p => p.id)) 
        : 0;
      state.products.push({
        id: maxId + 1,
        ...action.payload
      });
    }
  }
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
