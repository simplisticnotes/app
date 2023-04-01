import Image from "next/image"
import React from "react"

const Feature = ({ opposite, title, description, image }) => {
  return (
    <section
      className={`container max-w-6xl flex gap-10 mt-44 items-center justify-between flex-col ${
        opposite ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold text-primary text-center sm:text-left">
          {title}
        </h2>
        <p className="text-xl mt-4 text-center sm:text-left">{description}</p>
      </div>

      <div
        className={`max-w-xl flex ${
          opposite ? "justify-start" : "justify-end"
        }`}
      >
        <Image src={image} width={500} height={500} />
      </div>
    </section>
  )
}

export default Feature
