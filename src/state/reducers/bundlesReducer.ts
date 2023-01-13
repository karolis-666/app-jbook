import produce from 'immer';
import { ActionType } from '../actionsTypes';
import { Action } from '../actions';

interface BundlesState {
  [key: string]:
    | {
        isLoading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const reducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          isLoading: true,
          code: '',
          err: '',
        };
        return state;

      case ActionType.BUNDLE_COMPELTE:
        state[action.payload.cellId] = {
          isLoading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
