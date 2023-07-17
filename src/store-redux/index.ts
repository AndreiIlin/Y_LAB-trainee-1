import { ReduxConfig } from '@src/store-redux/types';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import Services from '../services';
import * as reducers from './exports';

export default function createStoreRedux(services: Services, config: ReduxConfig = {}){
  return createStore(combineReducers(reducers), applyMiddleware(
    thunk.withExtraArgument(services)
  ));
}
