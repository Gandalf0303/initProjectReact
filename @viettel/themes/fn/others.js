export default {
  circle: size => {
    const height = Number(size);
    const width = height;
    const borderRadius = height / 2;
    return {
      height,
      width,
      borderRadius
    };
  },
  square: size => {
    const height = Number(size);
    const width = height;
    return {
      height,
      width
    };
  },
  zIndex: zIndex => ({
    zIndex: Number(zIndex)
  }),
  elevation: elevation => ({
    elevation: Number(elevation)
  })
};
