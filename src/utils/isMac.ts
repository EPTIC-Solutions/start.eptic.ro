const isMac = () => {
  if (navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)) {
    return true
  }
  return false
}

export default isMac
