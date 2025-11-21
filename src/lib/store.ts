import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import filterReducer from './features/filterSlice'
import settingsReducer from './features/settingsSlice'
import trackerReducer from './features/trackerSlice'
import uiReducer from './features/uiSlice'
import sortReducer from './features/sortSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      filter: filterReducer,
      settings: settingsReducer,
      tracker: trackerReducer,
      ui: uiReducer,
      sort: sortReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
