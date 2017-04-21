/* @flow */

export default (state: any, error: Error) => state.withMutations(map => {
  map.set('isLoading', false).set('error', error.toString());
});
