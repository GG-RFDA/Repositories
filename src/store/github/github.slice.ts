import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// Задаём ключ для localStorage
const LS_FAV_KEY= 'rfk'

interface GithubState {
  /*
   * Создаём поле favourites.
   * Это будет массив строк.
   */
    favourites: string[]
}

const initialState: GithubState = {
  /*
   * favourites будет забираться из localStorage.
   * В случае, если строки вообще нет, то будем парсить пустой массив.
   */
    favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}
// Экспортируем константу githubSlice, которую создаём при помощи метода createSlice
export const githubSlice = createSlice({
    // Указываем имя
    name: 'github',
    // Задаём начальное состояние редьюсера
    initialState,
    // Создаём объект reducers, содержащий функции, предназначенные для обработки определенного типа действий
    reducers: {
      /*
       * Реализуем метод добавления репозитория в избранное.
       * Метод принимает в себя 2 параметра: state и action.
       * state равняется GithubState.
       * задаём типизацию для action.
       */
      addFavourite(state, action: PayloadAction<string>) {
        // Изменяем состояние
        state.favourites.push(action.payload)
        // Добавляем избранный репозиторий в хранилище
        localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
      },
      // Реализуем метод удаления репозитория из избранного почти по тому же принципу, что и метод добавления.
      removeFavourite(state, action: PayloadAction<string>) {
        state.favourites = state.favourites.filter(f => f !== action.payload)
        localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
      }
    }
})
// Экспортируем 2 сущности: actions и reducer
export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer