import { createStore, applyMiddleware , compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
// Logger with default options
import logger from 'redux-logger'
import reducer from './reducers';
import saga from './sagas';


const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? compose(
              applyMiddleware(sagaMiddleware),
              window.__REDUX_DEVTOOLS_EXTENSION__(),
          )
        : applyMiddleware(sagaMiddleware),
);
  sagaMiddleware.run(saga);
  return store;
}
