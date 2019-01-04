export default {
  height: value => {
    if (value && value.indexOf('%') > -1) {
      return {
        height: value
      };
    }
    return {
      height: Number(value)
    };
  },
  maxHeight: value => {
    if (value && value.indexOf('%') > -1) {
      return {
        maxHeight: value
      };
    }
    return {
      maxHeight: Number(value)
    };
  }
};
