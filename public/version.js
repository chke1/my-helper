var version = '1.9.8';
if (typeof window !== 'undefined') {
  window.version = version;
} else {
  module.exports = version;
}