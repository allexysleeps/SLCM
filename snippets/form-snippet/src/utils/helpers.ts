import * as R from 'ramda'

function evolveFromAllObjectImpl<T,O,S>(transformations: T, object: O): S {
  return R.converge(R.mergeRight, [R.identity, R.applySpec(transformations)])(object)
}

export const evolveFromAllObject = R.curry(evolveFromAllObjectImpl)