import { PixelRatio } from 'react-native';

export default {
  f: value => ({
    fontSize: Number(value)
  }),
  // font size with scale
  fs: value => ({
    fontSize: Number(value) * PixelRatio.getFontScale()
  })
};
