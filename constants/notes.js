export const NOTE_TYPES = [
  {
    title: "Plain Text",
    plans: ["FREE", "PRO"]
  },

  {
    title: "Rich Text",
    plans: ["PRO"]
  }
]

export const getNoteTypes = (plan) => {
  return NOTE_TYPES.filter((noteType) => noteType.plans.includes(plan)).map(
    (noteType) => noteType.title
  )
}
