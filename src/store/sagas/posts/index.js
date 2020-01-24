import { all, fork } from 'redux-saga/effects'
import watchCategoriesSaga from './categories';
import watchPostsSaga from './posts';
import watchTagsSaga from './tags';

export default function* postsRoot() {
  yield all([
    fork(watchCategoriesSaga),
    fork(watchPostsSaga),
    fork(watchTagsSaga),
  ])
}