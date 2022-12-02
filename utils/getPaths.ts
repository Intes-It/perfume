export function getPaths(...paths: (string | undefined)[]) {
  return `/${paths.filter(Boolean).join('/')}`;
}
