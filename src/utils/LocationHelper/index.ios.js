import { NativeModules, Alert } from 'react-native';

const Locations = NativeModules.Locations;
// const { isEnable, hasPermission } = Locations

export const getCurrentLocations = async () => {
  let result = null;
  try {
    const permisionResult = await Locations.checkPermissions();
    const enableLocations: boolean = await Locations.checkEnableLocationService(); // bool
    if (permisionResult.permission && enableLocations) {
      // navigator.geolocation.getCurrentPosition(
      //   position => console.log('done ==> ', position),
      //   error => console.log('err ==> ', error),
      //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
      // );
      const resultRes: {
        lat: string,
        long: string
      } = await Locations.getCurrentPosition();
      console.log('result ==> ', resultRes);
      return (result = resultRes);
    }

    Alert.alert(
      'Locations services has been turn off',
      'Please turn on it in Setting -> Mytel Pay -> Locations'
    );
    return result;
  } catch (err) {
    console.log('err ==> ', err);
    Alert.alert(
      'Locations services has been turn off or handware error',
      'Please check your device'
    );
    return result;
  }
};
