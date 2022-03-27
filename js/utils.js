export function sizeComparator(a, b) {
  const aSize = Constant.SIZE_VALUES[a.data.data.attributes.size.value];
  const bSize = Constant.SIZE_VALUES[b.data.data.attributes.size.value];
  if ( aSize < bSize ) return -1;
  if ( aSize > bSize ) return 1;
  if ( aSize === bSize ) return 0;
}