import React from 'react'
import {Link} from 'react-router-dom'

export function Navigation() {
  return (
    /*
     * Создаём базовую навигацию и задаём стилистику.
     * Создаём заголовок для навигационной панели.
     * Перечисляем две ссылки, ведущие на страницы Home и Favourites.
     * Задаём небольшой отступ, чтобы ссылки не сливались.
     */
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
      <h3 className="font-bold">Github Search</h3>
      <span>
        <Link to="/" className="mr-2">Home</Link>
        <Link to="/favourites">Favourites</Link>
      </span>
    </nav>
  )
}