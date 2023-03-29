import {useEffect, useState} from 'react'
/*
 * Экспортируем хук seDebounce.
 * Хук принимает в себя параметр value типа string и delay со значением 300.
 */
export function useDebounce(value: string, delay = 300): string {
  // Создаём локальный state, который будет принимать value по умолчанию
  const [debounced, setDebounced] = useState(value)
  // Используем хук useEffect, который будет зависеть от value и delay
  useEffect(() => {
    /*
     * Вызываем метод setTimeout, где будем изменять state setDebounced со значением value.
     * timeout будет находиться с задержкой в delay.
     */
    const handler = setTimeout(() => setDebounced(value), delay)
    // Чтобы timeout каждый раз не отрабатывал в случае изменений, нужно его очищать путем того, что handler будем возвращать из useEffect
    return () => clearTimeout(handler)
  }, [value, delay])
  // Возвращаем св-во debounced как локальный state
  return debounced
}