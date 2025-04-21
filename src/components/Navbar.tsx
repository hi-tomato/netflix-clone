import React, { useEffect, useState } from 'react';
import useThemeStore from '../hook/useTheme';
import { HiMoon, HiSun } from 'react-icons/hi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useTheme from '../hook/useTheme';

const Navbar = () => {
  const navigate = useNavigate();
  const [text, setText] = useState<string>('');
  const { keyword } = useParams();
  useEffect(() => {
    return setText(keyword || '');
  }, [keyword]);

  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    if (theme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
    setText('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between px-4 py-2 md:px-8 md:py-4">
      <h1 className="text-2xl font-bold mb-2 md:mb-0">
        <Link to="/" className="text-red-600">
          NetFlix
        </Link>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 w-full md:w-auto"
      >
        <input
          type="text"
          placeholder="원하는 컨텐츠를 검색하세요"
          value={text}
          onChange={handleChange}
          className="flex-grow md:flex-grow-0 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Add
        </button>

        <button onClick={() => toggleTheme(!theme)}>
          {theme ? <HiSun /> : <HiMoon />}
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
