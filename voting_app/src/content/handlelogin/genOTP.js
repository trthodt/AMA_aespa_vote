
const generateOTP = async (code) => {
    const token = await generateTOTP(code);
    return token;
}

function base32ToBytes(base32) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  let bytes = [];

  base32 = base32.replace(/=+$/, "").toUpperCase();

  for (let char of base32) {
    const val = alphabet.indexOf(char);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, "0");
  }

  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substring(i, i + 8), 2));
  }

  return new Uint8Array(bytes);
}

async function generateTOTP(secret) {
  const key = base32ToBytes(secret);

  const epoch = Math.floor(Date.now() / 1000);
  const time = Math.floor(epoch / 30);

  // convert time to 8-byte buffer
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setUint32(4, time);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );

  const hmac = await crypto.subtle.sign("HMAC", cryptoKey, buffer);
  const bytes = new Uint8Array(hmac);

  const offset = bytes[bytes.length - 1] & 0xf;

  const code =
    ((bytes[offset] & 0x7f) << 24) |
    ((bytes[offset + 1] & 0xff) << 16) |
    ((bytes[offset + 2] & 0xff) << 8) |
    (bytes[offset + 3] & 0xff);

  return (code % 1_000_000).toString().padStart(6, "0");
}

export default generateOTP;
