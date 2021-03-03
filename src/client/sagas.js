import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
  login, logout, addUser, removeUser, newMessage, sendMessage
} from './actions';

function connect() {
    console.log('in the connection method')
  const socket = io('http://localhost:3000');
  return new Promise(resolve => {
    socket.on('connect', () => {
        console.log("connecteddd !!!!!");
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('users.login', ({ username }) => {
      emit(addUser({ username }));
    });
    socket.on('users.logout', ({ username }) => {
      emit(removeUser({ username }));
    });
    socket.on('messages.new', ({ message }) => {
      emit(newMessage({ message }));
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
    console.log('payload in the write message ', socket)

  while (true) {
    const { payload } = yield take(`${sendMessage}`);
    console.log('payload in the write message ', payload)
    socket.emit('message', payload);
  }
}

function* handleIO(socket) {
    console.log('in the handleIO@@@@@@')
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  console.log("in the flow")
  while (true) {
    let { payload } = yield take(`${login}`);
    const socket = yield call(connect);
    socket.emit('login', { username: payload.username });

    const task = yield fork(handleIO, socket);
    console.log("taks", task);

    let action = yield take(`${logout}`);
    yield cancel(task);
    socket.emit('logout');
  }
}

export default function* rootSaga() {
  yield fork(flow);
}
