export default {
  bdWidth: value => ({
    borderWidth: Number(value)
  }),
  bdbWidth: value => ({
    borderBottomWidth: Number(value)
  }),
  bdtWidth: value => ({
    borderTopWidth: Number(value)
  }),
  bdfWidth: value => ({
    borderLeftWidth: Number(value)
  }),
  bdrWidth: value => ({
    borderRightWidth: Number(value)
  }),
  // / Border Radius
  bdRadius: value => ({
    borderRadius: Number(value)
  }),
  bdtlRadius: value => ({
    borderTopLeftRadius: Number(value)
  }),
  bdtrRadius: value => ({
    borderTopRightRadius: Number(value)
  }),
  bdblRadius: value => ({
    borderBottomLeftRadius: Number(value)
  }),
  bdbrRadius: value => ({
    borderBottomRightRadius: Number(value)
  })
};
