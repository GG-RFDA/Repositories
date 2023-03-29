import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector'

export function FavouritesPage() {
  // Получаем список всех элементов из store
    const {favourites} = useAppSelector(state => state.github)
  /*
   * Проверяем список на наличие избранных репозиториев.
   * Если ничего нет, то выводим сообщение.
   */
    if (favourites.length === 0) return <p className="text-center">No items.</p>

    return (
      /*
       * Создаём стилистику для страницы.
       * Если в избранном что-то есть, то итерируемся при помощи метода map.
       */
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
         <ul className="list-none">
           { favourites.map(f => (
            /*
             * key будет равняться favourite.
             * Создаём ссылку, которая будет вести на репозиторий.
             */
             <li key = {f}>
               <a href={f} target="_blank">{f}</a>
             </li>
           ))}
         </ul>
        </div>
    )
}