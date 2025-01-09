import FingerprintJS from '@fingerprintjs/fingerprintjs';

const getVisitorId = async () => {
  const fp = await FingerprintJS.load();
  const res = await fp.get();

  return res.visitorId;
};

export default getVisitorId;
