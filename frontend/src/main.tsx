import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { ThunkDispatch } from "redux-thunk";
import { rootReducer } from './services/reducers/rootreducer.ts'




declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  /* typeof window === "object" && */ window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    /* ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) */
    ||compose;
const enhancer = composeEnhancers();

import { configureStore } from "@reduxjs/toolkit"


export const store = configureStore({
  reducer: rootReducer,
})



export type RootState = ReturnType<typeof store.getState>;
/* export type AppDispatch = typeof store.dispatch; */
type AppAction = ReturnType<typeof store.dispatch>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppDispatch = ThunkDispatch<RootState, any, AppAction>;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

