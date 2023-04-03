export const refreshPage = (router) => router.replace(router.asPath)

export const routeChangeDialogue = async (msg) => {
  const confirmationValue = window.confirm(msg)

  return confirmationValue
}
