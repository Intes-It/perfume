import mergeWith from 'lodash-es/mergeWith';

export default function mergeFormState<TSource, TInit>(
  initFunc: () => TInit,
  source: TSource,
): TSource & TInit {
  return mergeWith(initFunc(), source, (init, src) => src ?? init);
}
