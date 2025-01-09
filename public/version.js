var version = '1.9.6';
if (typeof window !== 'undefined') {
  window.version = version;
} else {
  module.exports = version;
}