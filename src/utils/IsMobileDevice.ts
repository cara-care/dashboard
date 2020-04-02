export default function isMobileDevice() {
  return window.navigator.userAgent.toLowerCase().indexOf('mobi') !== -1;
}
