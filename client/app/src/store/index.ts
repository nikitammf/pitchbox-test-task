import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { StoreEnhancer } from 'redux';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const enhancers: StoreEnhancer[] = [];
const middlewares = [
    ...getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
        immutableCheck: { warnAfter: 300 },
    }),
    sagaMiddleware,
];

const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    enhancers,
    preloadedState: initialState,
    devTools: { trace: true },
});

sagaMiddleware.run(rootSaga);

export default store;
