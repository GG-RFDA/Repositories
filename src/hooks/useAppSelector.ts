import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store";
// Экспортируем кастомный хук, который позволяет забирать данные из store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector