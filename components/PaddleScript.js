import Script from "next/script"

const PaddleScript = () => (
  <Script
    src="https://cdn.paddle.com/paddle/paddle.js"
    onLoad={() => {
      console.log("VENDOR ID", process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID)
      console.log("SANDBOX", process.env.NEXT_PUBLIC_PADDLE_SANDBOX)
      if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX === "true") {
        Paddle.Environment.set("sandbox")
      }
      Paddle.Setup({ vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID) })
    }}
  />
)

export default PaddleScript
