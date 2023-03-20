function RichTextPublic({ value }) {
  return (
    <div
      className="prose prose-xl"
      dangerouslySetInnerHTML={{
        __html: value
      }}
    ></div>
  )
}

export default RichTextPublic
