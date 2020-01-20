import { all, fork } from 'redux-saga/effects'
import watchPostsSaga from './posts';
import watchCategoriesSaga from './categories';
import watchTagsSaga from './tags';

export default function* postsRoot() {
  yield all([
    fork(watchPostsSaga),
    fork(watchCategoriesSaga),
    fork(watchTagsSaga),
  ])
}