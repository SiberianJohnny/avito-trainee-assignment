import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { gamesApi } from './api/gamesApi'
import { gamesFilters } from './reducers/filtersSlice'

const rootReducer = combineReducers({
  [gamesApi.reducerPath]: gamesApi.reducer,
  gamesFilters: gamesFilters.reducer,
})

const additionalMiddlewares: any = [];

const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(gamesApi.middleware, additionalMiddlewares),
    preloadedState,
  });

const store = setupStore();

setupListeners(store.dispatch);

export default setupStore;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];