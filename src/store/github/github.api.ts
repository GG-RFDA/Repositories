import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IUser, ServerResponse } from '../../models/models'
import { IRepo } from '../../models/models'
/*
 * Экспортируем константу githubApi.
 * Создаём API при помощи функции createApi.
 */
export const githubApi = createApi({
   /*
    * Передаём параметр reducerPath.
    * reducerPath - это строка, которая будет говорить, по какому адресу в store будут храниться закэшированные данные, когда будем работать с API.
    */
  reducerPath: 'github/api',
  // Инициализируем параметр baseQuery при помощи функции fetchBaseQuery
  baseQuery: fetchBaseQuery({
   /*
    * В функцию передаем объект, у которого д.б. параметр baseUrl.
    * Для всей API прописываем базовый URL, с помощью которого будет конкатенироваться полный эндпоинт, по которому будем делать запрос.
    */
    baseUrl: 'https://api.github.com/'
  }),
  refetchOnFocus: true,
  /*
   * Третий обязательный ключ, который должны передать, это endpoints.
   * Эта функция, которая принимает параметр build.
   * Возвращаем объект, где перечисляем все необходимые эндпоинты.
   */
   endpoints: build => ({
      /*
       * Сначала указываем, как должен называться endpoint.
       * С помощью объекта build сформируем запрос.
       * Используем метод query.
       * query выполняется для запросов и получения данных.
       * Передаём объект, где описываем запрос.
       * Задаём типизацию, а именно два дженерика: массив пользователей и параметр типа string.
       */
      searchUsers: build.query<IUser[], string>({
         /*
          * Создаём стрелочную функцию.
          * Функция возвращает объект.
          * Явно прописываем search типа string.
          */
         query: (search: string) => ({
            /*
             * Настраиваем необходимые данные.
             * Указываем URL.
             * search будем указывать как параметр для запроса.
             * Используем поле params.
             * Внутри params помещаем св-во q, равняющееся search.
             * Лимитируем кол-во элементов, приходящих с сервера, при помощи параметра per_page.
             */
           url: `search/users`,
           params: {
             q: search,
             per_page: 10
           }
         }),
         /*
          * Указываем св-во transformResponse.
          * Передаём callback, с помощью которого можно трансформировать данные из ответа.
          * Передаём response типа ServerResponse<IUser>.
          * Возвращаем response.items.
          * 
          */
        transformResponse: (response: ServerResponse<IUser>) => response.items
      }),
      /*
       * getUserRepos формируется при помощи объекта build.
       * Используем метод query.
       * Задаём типизацию, а именно два дженерика: массив репозитория и параметр типа string
       */
      getUserRepos: build.query<IRepo[], string>({
         /*
          * Создаём стрелочную функцию.
          * Функция возвращает объект.
          * Явно прописываем username типа string.
          */
         query: (username: string) => ({
            /*
             * Указываем URL.
             * Для получения списков репозитория указываем следующую ссылку.
             */
            url: `users/${username}/repos`
         })
      }),
   })
})
/*
 * Достаём специальные хуки useSearchUsersQuery и useLazyGetUserReposQuery.
 * Хук useSearchUsersQuery генерируется автоматически, в зависимости от того, что указано в эндопоинтах.
 * Хук useLazyGetUserReposQuery нужен для того, чтобы сделать запрос, когда захотим.
 */
export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi