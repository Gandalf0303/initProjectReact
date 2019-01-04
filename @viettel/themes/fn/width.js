export default {
  width: value => {
    if (value && value.indexOf('%') > -1) {
      return {
        width: value
      };
    }
    return {
      width: Number(value)
    };
  },
  maxWidth: value => {
    if (value && value.indexOf('%') > -1) {
      return {
        maxWidth: value
      };
    }
    return {
      maxWidth: Number(value)
    };
  }
};
