import useAuthStore from '@/store/loginStore';
import React, { useEffect, useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout, error, isAuth, user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 기본 동작 방지
    const result = await login(email, password);
    console.log('로그인 결과:', result);

    if (result?.success) {
      // 로그인 성공 시 처리
      setEmail('');
      setPassword('');
    }
  };

  // 로그인 상태가 변경될 때마다 실행
  useEffect(() => {
    if (isAuth) {
      console.log('로그인 상태:', isAuth);
      console.log('사용자 정보:', user);
      console.log('로컬 스토리지:', {
        user: localStorage.getItem('user'),
        token: localStorage.getItem('token')
      });
    }
  }, [isAuth, user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-300 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">로그인</h1>
          <p className="mt-2 text-gray-600">계정에 로그인하세요</p>
        </div>

        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="text"
                placeholder="아이디를 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                비밀번호를 잊으셨나요?
              </a>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => logout()}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              로그아웃
            </button>
          </div>
        </form>

        {isAuth && (
          <div className="mt-6 p-4 bg-green-600 text-white rounded-lg">
            <h3 className="text-lg font-medium">로그인 성공!</h3>
            <p>사용자 이름: {user?.name}</p>
            <p>이메일: {user?.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
