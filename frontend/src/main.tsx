import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { rootReducer } from './services/reducers/rootreducer.ts'
import { configureStore } from "@reduxjs/toolkit"



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




export const store = configureStore({
  reducer: rootReducer,
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

