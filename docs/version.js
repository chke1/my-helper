var version = '2.0.0';
if (typeof window !== 'undefined') {
  window.version = version;
} else {
  module.exports = version;
}