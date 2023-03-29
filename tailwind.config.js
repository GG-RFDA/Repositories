module.exports = {
  content: [
  /*
   * Важно, чтобы в массиве content был прописан правильный паттерн.
   * Т.е. данная строка говорит о том, что в папке src нас интересуют файлы с прописанными расширениями, где tailwind будет использоваться.
   */
    './src/**/**.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
