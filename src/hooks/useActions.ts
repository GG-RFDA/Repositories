import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { githubActions } from "../store/github/github.slice"
// actions - это просто объект
const actions = {
  // Разворачиваем githubActions
  ...githubActions
}

export const useActions = () => {
  // Получаем объект dispatch с помощью хука useDispatch
  const dispatch = useDispatch()
  /*
   * Возвращаем метод bindActionCreators.
   * Передаём в метод объекты actions и dispatch.
   */
  return bindActionCreators(actions, dispatch)
}