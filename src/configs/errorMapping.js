import I18n from 'react-native-i18n';
import { Alert } from 'react-native';

export default responeFull => {
  const errorCode = responeFull.responseCode;
  // if (__DEV__) {
  //   return console.error(`Error from core: ${I18n.t(errorCode.toString())}`);
  // }
  // Alert.alert('Error!', I18n.t(errorCode.toString()));
  return I18n.t(errorCode.toString());
};
