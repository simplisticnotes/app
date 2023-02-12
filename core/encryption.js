const publicKey = {
  alg: "RSA-OAEP-256",
  e: "AQAB",
  ext: true,
  key_ops: ["encrypt"],
  kty: "RSA",
  n: "tvGPPhYwb6ip05uw0q9wX8_0PSP8hknyslo8GeF4iebxytTMG7YIC80nv9IWm7qw0ilyWQDvQ_3_uZylxPj_q2WbLq2Tm3XMNCUzekrN4tEq5oJ1iu23iMmzZQ3y3Vi_0ttyXbmv8dmHUhIoOBDzkQ9fAMZx7_jYDvCWcNGVe9vEu65_Pd2rcqxVHwaU-P6CAwPk5_lMI3UkIESbMO7IeyMJzFb3d4KvZmPC8gJKxjZo7MW8s7QUiVnn8LUlBDOnHo0RptGgOkBJiuUdZ14NT6243x4C87Nn2QxnP_kP_JWi38KfCyX-HbzEqvZAsQxjQkAboX--RQ4-MrnznKHnMQ"
}

const privateKey = {
  alg: "RSA-OAEP-256",
  d: "EGDPaWhMpU51B8oOOkp1FcrVC507aB1aMj_0Vf_SzgvENVu4Ozngfgf7qUdqeT4tQt9tiozUHuLwQEKHL7t4DjTuP-9PwfD5m2iCM45bYNVHkTP4SHwQPJmMKz2kss7Ve4_kbQIo_46xN_aCrcRMvf2hjHz3qdt-IlZFLawBxUEIlL1gCcquuj6IJXDYzRlpMnC1eBXnrCwDKbX1t9AqRFijQZiXu5HFXmYFCrynoxNQ3RHhWrqb1B6TIFHGaQcK8KorzzbnOrGYACDPHPv8oIoh_wS3qkrhX0k5dClizXbNY0jHhmU3QSWssjcZveOTYCq-cel8xNoOzgs2Enx4DQ",
  dp: "1DA2Ncsn8hDwhbNT9xmwhe-DwJSuE-rr8Zjc_6SypsmVM-fFzx9DeTLlUEk2CQ-7VrTZa73JrnoJc8TDkepXZu2JsyNsjALbAefrqom3SK-AgG7h9Dusoq-2ahqzPwd5X7UsSUVlUHYVaj_3hdHUzaYAolvhyeATJcwJuiKulI0",
  dq: "HcB7KwJkLIazKrWj0i1ywu2zPnlMlU7iVI2Qih04clAt4qHITORgRTYgTPTyrHeICkPFUtyqp-zDtOMVxU_YWPmzBv-3BQT0xaCZmvumMrKbUTReV0rfXKheNcrQEYVs7kQcOZCgRtuSrwU7vBHVRA-x3T4a61CbenKPAPb_js0",
  e: "AQAB",
  ext: true,
  key_ops: ["decrypt"],
  kty: "RSA",
  n: "tvGPPhYwb6ip05uw0q9wX8_0PSP8hknyslo8GeF4iebxytTMG7YIC80nv9IWm7qw0ilyWQDvQ_3_uZylxPj_q2WbLq2Tm3XMNCUzekrN4tEq5oJ1iu23iMmzZQ3y3Vi_0ttyXbmv8dmHUhIoOBDzkQ9fAMZx7_jYDvCWcNGVe9vEu65_Pd2rcqxVHwaU-P6CAwPk5_lMI3UkIESbMO7IeyMJzFb3d4KvZmPC8gJKxjZo7MW8s7QUiVnn8LUlBDOnHo0RptGgOkBJiuUdZ14NT6243x4C87Nn2QxnP_kP_JWi38KfCyX-HbzEqvZAsQxjQkAboX--RQ4-MrnznKHnMQ",
  p: "4L8XI-4zLzLc-LSHXk0-QwRwKAS6RFygf8gwdYIoqxK2muHqfUadcg53ZJgZdmgSukHPQYMU_45e8ZLpSNRvTPR0hx1esrDRqzALqThc2kQp_F1mD6u7yvGaNAtkQoYPk_V5eJL8nGPmiB32QF_2_rM3NNtp77s1PksGcU7Mm0U",
  q: "0GJMpYLWMWFA6D822aZXnUz3VPcVHE1cpnNSUKX56dsuEVYt-14Qu4fhOSH_U86MZt2LI4oRlK5uoYzj97odhAJoXfjHFen_W_3mU17U-TWm28uRPZ5meYWsZQnDb5WVyH1Dinz49F5Eagq-1rQBXXU7bCZqr1wH2oTXW8pH5P0",
  qi: "ZA-3IkNVQqZwyNas5_iquSz6h1_0xtC6DgVOoQxpN-Ug52_PCkMpMVdbFiToy7rgDCBogG7sRBF3D6QSTza9lxVJthG0o5sDS3s7z9FzIT7P_bKbwdZ38TXG8DAkiTFsnln53aRKuXrvCgkc89DaCNA_NWkQ8AfhUckM-f_3JXs"
}

export async function generateKeyPair() {
  const crypto = window.crypto || window.msCrypto // for Internet Explorer 11
  const subtle = crypto.subtle || crypto.webkitSubtle

  const algorithm = {
    name: "RSA-OAEP",
    modulusLength: 2048,
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: { name: "SHA-256" }
  }
  const keyPair = await subtle.generateKey(algorithm, true, [
    "encrypt",
    "decrypt"
  ])

  const publicKey = await subtle.exportKey("jwk", keyPair.publicKey)
  const privateKey = await subtle.exportKey("jwk", keyPair.privateKey)

  return { publicKey, privateKey }
}

export async function encrypt(plaintext) {
  const crypto = window.crypto || window.msCrypto // for Internet Explorer 11
  const subtle = crypto.subtle || crypto.webkitSubtle
  console.log(subtle)

  const enc = new TextEncoder()
  const data = enc.encode(plaintext)

  const algorithm = {
    name: "RSA-OAEP",
    hash: { name: "SHA-256" }
  }
  const encryptKey = await subtle.importKey(
    "jwk",
    publicKey,
    algorithm,
    false,
    ["encrypt"]
  )

  var encrypted = await subtle.encrypt(algorithm, encryptKey, data)

  console.log("WORK")

  return btoa(String.fromCharCode.apply(null, new Uint8Array(encrypted)))
}

export async function decrypt(ciphertext) {
  const crypto = window.crypto || window.msCrypto // for Internet Explorer 11
  const subtle = crypto.subtle || crypto.webkitSubtle

  const algorithm = {
    name: "RSA-OAEP",
    hash: { name: "SHA-256" }
  }
  const decryptKey = await subtle.importKey(
    "jwk",
    privateKey,
    algorithm,
    false,
    ["decrypt"]
  )
  const decrypted = await subtle.decrypt(
    algorithm,
    decryptKey,
    new Uint8Array(
      atob(ciphertext)
        .split("")
        .map((c) => c.charCodeAt(0))
    )
  )

  const dec = new TextDecoder()
  return dec.decode(new Uint8Array(decrypted))
}

async function testEncryptionDecryption() {
  const keyPair = await generateKeyPair()
  const publicKey = keyPair.publicKey
  const privateKey = keyPair.privateKey

  const plaintext = "Hello, World!"
  const ciphertext = await encrypt(plaintext, publicKey)
  const decrypted = await decrypt(ciphertext, privateKey)

  console.assert(plaintext === decrypted, "Encryption and decryption failed")
  console.log("Encryption and decryption succeeded")
}
