import React, { useState, useEffect } from 'react'
import { RepoCard } from '../components/RepoCard'
import { useDebounce } from '../hooks/useDebounce'
import {useLazyGetUserReposQuery, useSearchUsersQuery} from '../store/github/github.api'

export function HomePage() {
  // Создаём state поиска, который будет принимать пустую строку по умолчанию
  const [search, setSearch] = useState('')
  // Создаём state для видимости выпадающего списка
  const [dropdown, setDropdown] = useState(false)
  /*
   * Создаём параметр debounced и вызываем хук useDebounce.
   * В качестве зависимости для хука передаём search.
   */
  const debounced = useDebounce(search)
  /*
   * Используем хук useSearchUsersQuery.
   * Здесь получаем какой-то набор данных.
   * Используем индикатор загрузки и ошибки, а также данные, которые получаем.
   * В качестве зависимости передаём debounced.
   * Вторым параметром передаём объект.
   */
  const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
    /*
     * При помощи св-ва skip указываем, при каких условиях не нужно делать запросы.
     * Если длина строки меньше 3 символов, то запрос осуществлен не будет.
     */
    skip: debounced.length <3,
    /*
     * Передаём параметр refetchOnFocus и задаём знач-е true.
     * Данный параметр нужен для быстро меняющихся данных.
     * В случае, если польз-ль ушёл со страницы, а потом вернулся, нужно обновлять данные.
     */
    refetchOnFocus: true
  })
  /*
   * Используем хук useLazyGetUserReposQuery.
   * Первым элементом массива получаем функцию, которая позволит загружать по запросу необходимые данные.
   * Вторым элементом массива получаем объект, где есть isLoading и data.
   */
  const [fetchRepos, { isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()
  // Используем хук useEffect
  useEffect(() => {
    /*
     * Создаём условие, по которому будем менять видимость выпадающего списка.
     * Если в поле debounced есть строчка, где больше 3-х символов, и в data что-то есть,
     */
    setDropdown(debounced.length > 3 && data?.length! > 0)
  }, [debounced, data])
  /*
   * Создаём clickHandler.
   * Он будет принимать в себя username типа string, по которому кликнули.
   */
  const clickHandler = (username: string) => {
    // Загружаем данные
     fetchRepos(username)
     // Если клик по пользователю произошёл, то выпадающий список исчезает
     setDropdown(false)
  }
  return (
    /*
     * Создаём базовую стилистику для страницы.
     * Создаём сообщение с ошибкой и задаём для него стилистику.
     * Создаём input.
     * Воспользуемся флагом isLoading, который сообщает о загрузке с сервера.
     * Если dropdown равно true, то отображаем содержимое тега ul.
     * Если загрузка происходит, то выводим содержимое тега p.
     * В обратном случае выводим список данных.
     * Если есть объект data, то делаем итерацию с помощью метода map.
     * На каждой итерации получаем польз-ля.
     */
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      { isError && <p className="text-center text-red-600">Something went wrong...</p> }  
      <div className="relative w-[560px]">
        <input 
          type="text"
          // Задаём стилистику
          className="border py-2 px-4 w-full h-[42px] mb-2"
          // Указываем placeholder
          placeholder="Search for Github username..."
          // В качестве value указываем search из состояния
          value={search}
          // Вызываем изменения состояния setSearch, куда передаём e.target.value
          onChange={e => setSearch(e.target.value)}
        />
      
        {dropdown && <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
          { isLoading && <p className="text-center">Loading...</p> }
          { data?.map(user => (
            // Возвращаем элемент li
            <li 
            /*
             * key будет соответствовать с user.
             * Каждый id д.б. уникальным.
             */
            key={user.id}
            /*
             * Создаём слушатель события, где вызываем метод clickHandler.
             * Передаём в clickHandler user.login.
             */
            onClick={() => clickHandler(user.login)}
            // Для каждого элемента li задаем класс со стилями
            className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
            // В качестве текста выводим логин польз-ля
            >{ user.login }</li>
          )) }
        </ul>}

        <div className="container">
        { areReposLoading && <p className="text-center">Repos are loading</p>}
        { repos?.map(repo => <RepoCard repo={repo} key={repo.id}/>)}
        </div>
      </div>
    </div>
    )
}