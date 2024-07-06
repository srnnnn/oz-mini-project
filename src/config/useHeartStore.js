// src/config/useHeartStore.js
import create from "zustand";

const useHeartStore = create((set) => ({
  heartList: [],
  addHeartList: (id) =>
    set((state) => ({ heartList: [...state.heartList, id] })),
  removeHeartList: (id) =>
    set((state) => ({
      heartList: state.heartList.filter((movieId) => movieId !== id),
    })),
}));

export default useHeartStore;
