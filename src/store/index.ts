import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { githubApi } from './github/github.api'
import { githubReducer } from './github/github.slice'
// Экспортируем константу store через функцию configureStore
export const store = configureStore({
  // Используем св-во reducer
  reducer: {
    /*
     * В качестве ключа указываем githubApi.reducerPath.
     * В этом ключе будут храниться все необходимые данные в redux, которые будут связаны с API.
     * В качестве значения githubApi указываем reducer.
     */
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReducer
  },
  /*
   * Указываем параметр middleware.
   * middleware получает в себя метод getDefaultMiddleware.
   * Возвращаем вызов метода.
   * Здесь получаем массив.
   * Конкатенируем массив с middleware, который предоставляет githubApi.
   */
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githubApi.middleware)
})
// Вызываем метод setupListeners и передаём store.dispatch
setupListeners(store.dispatch)
/*
 * Для корректной настройки типизации экспортируем специальный тип.
 * Создаём кастомные типы для того, чтобы понимать, с какими типами работаем в store.
 */
export type RootState = ReturnType<typeof store.getState>