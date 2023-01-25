import { selector } from "recoil";
import { todoState } from "../atom";

export const todoCounter = selector({
  key: 'todoCounter',
  get: ({ get }) => {
    const todos = get(todoState)
    return todos.length
  }
})