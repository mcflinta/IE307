import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenManager {
  static instance = null;

  constructor() {
    if (TokenManager.instance) {
      return TokenManager.instance;
    }

    this.token = null; // Dùng để lưu token trong bộ nhớ tạm thời
    TokenManager.instance = this;
  }

  // Lưu token vào AsyncStorage và bộ nhớ tạm
  async setToken(token) {
    this.token = token;
    await AsyncStorage.setItem('userToken', token);
  }

  // Lấy token từ bộ nhớ tạm hoặc AsyncStorage
  async getToken() {
    if (this.token) {
      return this.token;
    }
    const storedToken = await AsyncStorage.getItem('userToken');
    this.token = storedToken;
    return storedToken;
  }

  // Xóa token khi logout
  async clearToken() {
    this.token = null;
    await AsyncStorage.removeItem('userToken');
  }
}

const tokenManager = new TokenManager();
Object.freeze(tokenManager); // Đảm bảo không thể thay đổi instance
export default tokenManager;
