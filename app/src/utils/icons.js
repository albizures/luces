
export const icons = {
  0: {
    checked: require('../assets/categories/generic_active.png'),
    unchecked: require('../assets/categories/generic.png')
  },
  1: {
    checked: require('../assets/categories/eyes_active.png'),
    unchecked: require('../assets/categories/eyes.png')
  },
  2: {
    checked: require('../assets/categories/hair_active.png'),
    unchecked: require('../assets/categories/hair.png')
  },
  3: {
    checked: require('../assets/categories/nail_active.png'),
    unchecked: require('../assets/categories/nail.png')
  },
  4: {
    checked: require('../assets/categories/lips_active.png'),
    unchecked: require('../assets/categories/lips.png')
  },
  5: {
    checked: require('../assets/categories/mask_active.png'),
    unchecked: require('../assets/categories/mask.png')
  },
  6: {
    checked: require('../assets/categories/contour_active.png'),
    unchecked: require('../assets/categories/contour.png')
  }
}

export const getIcon = (id) => {
  const icon = icons[id]
  if (!icon) {
    console.warn(`${id} is a invalid icon`)
    return icons[0]
  }
  return icon
}

export default icons
