// 21521901 - Mai Quốc Cường
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 5000,
});

export const getAllProducts = async () => {
  try {
    const response = await instance.get('/products');
    return response;
  } catch (error) {
    console.error('Error fetching all products with Axios:', error.message);
    throw error;
  }
};

export const getProductById = async (id) => {
  if (!id) throw new Error('Product ID is required.');
  try {
    const response = await instance.get(`/products/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error.message);
    throw new Error(`Failed to fetch product with ID ${id}. Please try again later.`);
  }
};

export const getCategories = async () => {
  try {
    const response = await instance.get('/products/categories');
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    throw new Error('Failed to fetch categories. Please try again later.');
  }
};

export const getProductsByCategory = async (category) => {
  if (!category) throw new Error('Category is required.');
  try {
    const response = await instance.get(`/products/category/${category}`);
    return response;
  } catch (error) {
    console.error(`Error fetching products in category "${category}":`, error.message);
    throw new Error(`Failed to fetch products in category "${category}". Please try again later.`);
  }
};

export const loginApi = async (username, password) => {
  if (!username || !password) throw new Error('Username and password are required.');
  try {
    const response = await instance.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw new Error('Failed to login. Please check your credentials and try again.');
  }
};