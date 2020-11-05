/**
 * Extracts query string from an url
 * @example
 * getParams('https://example.com/?foo=true&baz=false')
 * // returns {foo: "true", baz: "false"}
 */
export default function getParams(url: string): { [key: string]: string } {
  const normalizedUrl = /\?/.test(url) ? url.replace(/^[^?]*./, '') : url;
  return normalizedUrl
    .split('&')
    .filter(Boolean)
    .map((el) => el.split('='))
    .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});
}
