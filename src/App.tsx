import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import {FavouritesPage} from './pages/FavouritesPage'
import {Navigation} from './components/Navigation'

function App() {
  return (
    /*
     * Добавляем компонент Navigation в компоненте App.
     * Чтобы не создавать дополнительный тег, используем фрагмент.
     * Используем компонент Routes.
     * Для каждой страницы указываем компонент Route. У них д.б. параметры path и загружаемый компонент в параметре element.
     */
  <>
    <Navigation />
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/favourites" element={ <FavouritesPage /> } />
    </Routes> 
  </>
  )
}

export default App;
