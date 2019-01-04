import { AsyncStorage } from 'react-native';
import createCompressEncryptor from 'redux-persist-security';
import { persistCombineReducers } from 'redux-persist';
import { reducer as form } from 'redux-form';

import auth from './auth';
import { locale } from './common';

const transformer = createCompressEncryptor({
  secretKey: '!OGnJ^HNi8Hx6WX1uu%YRYrxA7A9%7GIMZ93wI',
  whitelist: ['auth'],
  onError: error => {
    console.log(error);
  }
});

const config = {
  key: 'Root',
  storage: AsyncStorage,
  whitelist: ['auth', 'locale'],
  transforms: [transformer]
};

export default persistCombineReducers(config, {
  auth,
  form,
  locale
});
