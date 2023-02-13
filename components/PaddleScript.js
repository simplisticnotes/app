import Script from "next/script"

const PaddleScript = () => (
  <Script
    src="https://cdn.paddle.com/paddle/paddle.js"
    onLoad={() => {
      // if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX === "true") {
      Paddle.Environment.set("sandbox")
      // }
      Paddle.Setup({ vendor: 10680 })
    }}
  />
)

export default PaddleScript
