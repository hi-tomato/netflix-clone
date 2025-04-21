import { create } from 'zustand';

const getInitialState = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isAuth: !!storedToken
  };
};

const useAuthStore = create((set) => ({
  ...getInitialState(),

  login: async (email: string | number, password: string | number) => {
    try {
      await new Promise((res) => setTimeout(res, 500));
      if (email === 'user@example.com' && password === '1234') {
        const userData = { id: 1, name: '홍길동', email };
        const token = 'dummy-jwt-token';

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);

        set({
          user: userData,
          token: token,
          isAuth: true,
          error: null
        });
        alert('로그인이 성공하였습니다.');
        return { success: true };
      }
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    set({ user: null, token: null, isAuth: false });
  },

  error: null
}));

export default useAuthStore;
