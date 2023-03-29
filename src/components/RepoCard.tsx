import React, { useState } from 'react'
import {IRepo} from '../models/models'
import { useActions } from '../hooks/useActions'
import { useAppSelector } from '../hooks/useAppSelector'
/*
 * Создаём компонент RepoCard.
 * Как параметр получаем repo.
 * Прописываем интерфейс IRepo для параметра repo.
 */
export function RepoCard({ repo }: { repo: IRepo }) {
  // Вызываем хук useActions и вызываем 2 метода
  const {addFavourite, removeFavourite} = useActions()
  // Вызываем хук useAppSelector, чтобы получить данные из store
  const {favourites} = useAppSelector(state => state.github)
  // В качестве начального значения проверям в массиве favourites наличие элемента
  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url))
  /*
   * Реализовываем метод addToFavourite.
   * Прописываем для него типы.
   * Метод принимает в себя event.
   */
  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Отменяем действие браузера по умолчанию
    event.preventDefault()
    // Вызываем метод addFavourite и передаём параметр, который будет являться уникальным
    addFavourite(repo.html_url)
    // Меняем состояние флага, если репозиторий добавлен в избранное
    setIsFav(true)
  }
  // Реализуем метод removeFromFavourite по такому же принципу, что и addToFavourite
  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    removeFavourite(repo.html_url)
    // Меняем состояние флага, если репозиторий удален из избранного
    setIsFav(false)
  }
    /*
     * Задаём стилистику для карточки.
     * Задаём заголовок карточки.
     * Задаём ссылку репозитория.
     * Прописываем поля Forks и Watchers, а также задаём для них стилистику.
     * Выводим описание в случае, если оно есть.
     * Создаём кнопки добавления и удаления.
     * Кнопки будут отображаться по условию.
     */
    return (
        <div className="border py-3 px-5 rounded mb-2 hover: shadow-md hover:bg-gray-100 transition-all">
          <a href={repo.html_url} target="_blank">
          <h2 className="text-lg font-bold">{repo.full_name}</h2>
          <p className="text-sm">
            Forks: <span className="font-bold mr-2">{repo.forks}</span>
            Watchers: <span className="font-bold">{repo.watchers}</span>
          </p>
          <p className="text-sm font-thin">{repo?.description}</p>

          {!isFav && <button 
          // Задаём стилистику
            className="py-2 px-4 bg-yellow-400 mr-2 rounded hover:shadow-md transition-all"
          // Вешаем слушатель событий, где прописываем метод addToFavourite
            onClick={addToFavourite}
          >Add</button>}

          {isFav && <button 
          // Задаём стилистику
            className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
          // Вешаем слушатель событий, где прописываем метод removeFromFavourite
            onClick={removeFromFavourite}
          >Remove</button>}
          </a>
        </div>
    )
}