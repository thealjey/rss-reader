/* @flow */

export default (state: any, payload: string) => state.withMutations(map => {
  map.deleteIn(['data', payload]).delete('selectedType').delete('selectedItem');
});
