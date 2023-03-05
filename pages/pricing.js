import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import React from "react"
import PaddleScript from "../components/PaddleScript"

function Pricing() {
  const user = useUser()

  console.log(user)

  const onUpgradeClick = () => {
    // if (!isLoggedIn) {
    //   router.push("#login?pricing")
    //   return
    // }

    // setButtonLoading.on()

    const passthrough = {
      userId: user.id
    }

    // window.onPaddleSuccess = function () {
    //   window.location.href = "/purchase"
    // }
    // window.onPaddleClose = function () {
    //   // setButtonLoading.off()
    // }

    Paddle.Checkout.open({
      product: 44837,
      email: user.email,
      disableLogout: true,
      passthrough: JSON.stringify(passthrough)
      // closeCallback: "onPaddleClose",
      // successCallback: "onPaddleSuccess"
    })
  }

  return (
    <>
      <PaddleScript />

      <h1 className="text-6xl font-bold text-center text-primary mt-16 mb-8">
        Pricing
      </h1>
      <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-primary bg-white">
          <p className="uppercase text-sm font-medium text-gray-500">Starter</p>

          <p className="mt-4 text-3xl text-gray-700 font-medium">Free</p>

          {/* <p className="mt-4 font-medium text-gray-700">
            Up to 5 listing monthly
          </p> */}

          <div className="mt-8">
            <ul className="grid grid-cols-1 gap-4">
              <li className="inline-flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2 fill-current text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                </svg>
                End-to-end encryption
              </li>

              <li className="inline-flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2 fill-current text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                </svg>
                Plan Text Notes
              </li>

              <li className="inline-flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2 fill-current text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                </svg>
                Password protected notes
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button className="bg-primary hover:bg-gray-800 active:bg-primary px-3 py-2 rounded-lg w-full text-white">
              Get Started
            </button>
          </div>
        </div>

        <div className="shadow-lg p-5 rounded-lg border-t-4 border-primary bg-white">
          <p className="uppercase text-sm font-medium text-gray-500">Pro</p>

          <p className="mt-4 text-3xl text-gray-700 font-medium">
            $5 <span className="text-base font-normal">/month</span>
          </p>

          <p className="mt-4 font-medium text-gray-700">
            Everything in starter including:
          </p>

          <div className="mt-8">
            <ul className="grid grid-cols-1 gap-4">
              <li className="inline-flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2 fill-current text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                </svg>
                Shareable Notes
              </li>

              <li className="inline-flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2 fill-current text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                </svg>
                All Types of Notes (Plan Text, Rich Text, Todos, etc.)
              </li>

              <li className="inline-flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2 fill-current text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                </svg>
                Folders and Sub Folders
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button
              onClick={onUpgradeClick}
              className="bg-primary hover:bg-gray-800 active:bg-primary px-3 py-2 rounded-lg w-full text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false
      }
    }
  }

  return {
    props: {
      initialSession: session
    }
  }
}

export default Pricing
