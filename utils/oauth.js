const base64urlencode = (byteArray) => {
  const stringCode = String.fromCharCode.apply(null, byteArray);
  const base64Encoded = btoa(stringCode);
  const base64urlEncoded = base64Encoded
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return base64urlEncoded;
};

const randomString = (len) => {
  var arr = new Uint8Array(len);
  window.crypto.getRandomValues(arr);
  var str = base64urlencode(arr);
  return str.substring(0, len);
};

export const generateState = () => {
  return randomString(48);
};

export const generateCodeVerifier = () => {
  let randomByteArray = new Uint8Array(32);
  window.crypto.getRandomValues(randomByteArray);
  return base64urlencode(randomByteArray);
};

export const generateCodeChallenge = async (codeVerifier) => {
  const strBuffer = new TextEncoder('utf-8').encode(codeVerifier);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', strBuffer);
  const hashedByteArray = Array.from(new Uint8Array(hashBuffer));
  return base64urlencode(hashedByteArray);
};
