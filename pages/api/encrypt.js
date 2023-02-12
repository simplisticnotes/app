import Cryptr from "cryptr"
const cryptr = new Cryptr(process.env.NEXT_PUBLIC_ENCRYPTION_SECRET)

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { text } = req.body
  const encryptedText = cryptr.encrypt(text)
  res.status(200).json({ encryptedText })
}
