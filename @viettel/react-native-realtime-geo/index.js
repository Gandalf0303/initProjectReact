import { NativeModules, Platform, NativeEventEmitter } from 'react-native';

const { RNRealtimeGeo } = NativeModules;

export default RNRealtimeGeo;

type OptionInit = {};
type PermissionStatus =
  | 'authorizedAlways'
  | 'authorizedWhenInUse'
  | 'denied'
  | 'notDetermined'
  | 'restricted';

type SupportEvent = 'permissionChange' | 'locationChange';

const isIOS = Platform.OS === 'ios';

//export constants
export const isEnable: boolean = RNRealtimeGeo.isEnable;
export const hasPermission: boolean = RNRealtimeGeo.hasPermission;
export const permissionStatus: PermissionStatus =
  RNRealtimeGeo.permissionStatus;

//export method
export const startTracking = (): void => {
  return RNRealtimeGeo.startTracking();
};
export const stopTracking = (): Promise<boolean> => {
  return RNRealtimeGeo.stopTracking();
};

export const checkPermissions = (callBack: () => boolean): void => {
  return RNRealtimeGeo.checkPermissions(callBack);
};

export const checkEnableLocationService = (callBack: () => boolean): void => {
  return RNRealtimeGeo.checkEnableLocationService(callBack);
};

export const requestPermissions = (type: 'alway' | 'whenUse'): void => {
  if (isIOS) {
    if (type && type === 'alway') {
      return RNRealtimeGeo.requestAlwaysAuth();
    }
    return RNRealtimeGeo.requestWhenInUseAuth();
  }
  return RNRealtimeGeo.openLocationServiceActivity();
};

export const requestCurrentLocation = (): void =>
  RNRealtimeGeo.requestCurrentLocation();

// event
const RealtimeGeoEvent = new NativeEventEmitter(RNRealtimeGeo);

export const addEventListener = (eventName: SupportEvent, callBack): void => {
  if (eventName !== 'locationChange' && eventName !== 'permissionChange') {
    return console.error(`Event ${eventName} not support!`);
  }
  RealtimeGeoEvent.addListener(eventName, data => callBack(data));
};

export const removeEventListener = (
  eventName: SupportEvent,
  callBack
): void => {
  if (eventName !== 'locationChange' && eventName !== 'permissionChange') {
    return console.error(`Event ${eventName} not support!`);
  }
  RealtimeGeoEvent.removeListener(eventName, () => callBack && callBack());
};
