import { NativeModules, Alert } from 'react-native';

const Locations = NativeModules.Locations;

export const getCurrentLocations = async () => {
  console.log('vao day roi ==> ', Locations);
  let result = null;
  try {
    const hasPermisions = await Locations.checkPermision(); // boolean
    const enableLocations = await Locations.areProvidersAvailable(); // boolean
    console.log('hasPermisions ==> ', hasPermisions);
    console.log('enableLocations ==> ', enableLocations);
    if (!hasPermisions) {
      Alert.alert(
        'Please invoke location permission',
        'Open setting of app, and turn on locations',
        [
          { text: 'ok', onPress: () => Locations.openSettingPermision() },
          { text: 'cancel' }
        ]
      );
      return;
    }
    if (!enableLocations) {
      Alert.alert(
        'Please turn on gps seting',
        'Open locations setting, and turn on locations',
        [
          { text: 'ok', onPress: () => Locations.openLocationSetting() },
          { text: 'cancel' }
        ]
      );
      return;
    }
    // navigator.geolocation.getCurrentPosition(
    //   position => console.log('done ==> ', position),
    //   error => console.log('err ==> ', error),
    //   { enableHighAccuracy: false, timeout: 50000, maximumAge: 10000 }
    // );
    const resultRes = await Locations.getFusedLocation(false);
    return (result = resultRes);
  } catch (error) {
    console.log('error ==> ', error);
    return result;
  }
  // const
};
