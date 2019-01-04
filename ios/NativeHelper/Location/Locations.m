//
//  Locations.m
//  MytelPayAGENT
//
//  Created by Thanh Pham on 12/27/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

// #import <AVFoundation/AVFoundation.h>
#import <CoreLocation/CoreLocation.h>
#import <React/RCTConvert.h>
#import "Locations.h"

/**
 ** see more about ios corelocation service: https://developer.apple.com/documentation/corelocation/cllocationmanager
 **/
@interface Locations () <CLLocationManagerDelegate>
@property (strong, nonatomic) CLLocationManager *locationManager;

@end

@implementation Locations{
  BOOL hasListeners;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}
@synthesize locationManager;
NSDictionary *locationData;
BOOL startListenLocationChange = false;
BOOL startListenAuthChange = false;
-(instancetype) init {
  if(self = [super init]){
    self.locationManager = [[CLLocationManager alloc] init];
    self.locationManager.delegate = self;
    self.locationManager.desiredAccuracy =kCLLocationAccuracyBest;
    self.locationManager.pausesLocationUpdatesAutomatically = NO;
    [self.locationManager startUpdatingLocation];

  }
  //    [self.locationManager startUpdatingLocation];
  return self;
}
RCT_EXPORT_MODULE(Locations)

/**
 ** Brigde location
 **/
// returm status auth
RCT_EXPORT_METHOD(startTracking){
  NSLog(@"THANHPHAM_START");
  //    self.locationManager.delegate = self;
  //    self.locationManager.desiredAccuracy =kCLLocationAccuracyBest;
  //    self.locationManager.pausesLocationUpdatesAutomatically = YES;
  //  [self.locationManager startUpdatingLocation];
  startListenLocationChange = true;
  startListenAuthChange = true;
}

RCT_EXPORT_METHOD(stopTracking: resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject){
  [self.locationManager stopUpdatingLocation];
  resolve(@{});


}

RCT_EXPORT_METHOD(checkPermissions: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
  NSString *result = [self authStatusToString:[CLLocationManager authorizationStatus]];
  resolve(@{
            @"permission": ([result  isEqual: @"authorizedAlways"] || [result  isEqual: @"authorizedWhenInUse"]) ? @YES : @NO,
            @"status": result
            });
}
RCT_EXPORT_METHOD(getCurrentPosition: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
  if(locationData != nil){
    resolve(locationData);
  }

}

RCT_EXPORT_METHOD(checkEnableLocationService:(RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject){
  BOOL isEnable= [CLLocationManager locationServicesEnabled];
  resolve(isEnable ? @YES: @NO);
}

RCT_EXPORT_METHOD(requestWhenInUseAuth){
  NSLog(@"THANHPHAM_START 1");
  [self.locationManager requestWhenInUseAuthorization];
}

RCT_EXPORT_METHOD(requestAlwaysAuth){
  NSLog(@"THANHPHAM_START 2");
  [self.locationManager requestAlwaysAuthorization];
}

RCT_EXPORT_METHOD(requestCurrentLocation){
  [self.locationManager requestLocation];
}

/***************************/
/****========EVENT ======**/
/***************************/
// override function to do something in case you want to use event emitter
- (void)startObserving {
  hasListeners = YES;
}

// override function to do something in case you want to use event emitter
- (void)stopObserving {
  hasListeners = NO;
}

/**
 * register event name
 * NOTE: Note that using events gives us no guarantees about execution time, as the event is handled on a separate thread
 * Events are powerful, because they allow us to change React Native components without needing a reference to them
 */
- (NSArray<NSString *> *)supportedEvents {
  return @[@"permissionChange", @"locationChange"];
}

//emit khi trạng thái của event thay đổi overrive location core
-(void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
  NSString *statusName = [self authStatusToString:status];
  NSLog(@"THANHPHAM_REALTIME_GEO permissionChange %@",statusName);
  if(startListenAuthChange){
  [self sendEventWithName:@"permissionChange" body:statusName];
  }
}



// emit khi trạng thái của location thay đổi

-(void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations {
  CLLocation *location = [locations lastObject];
  NSDictionary *locationDataRaw = @{
                                    @"latitude": @(location.coordinate.latitude),
                                    @"longitude": @(location.coordinate.longitude)
                                    };
  NSLog(@"THANHPHAM_REALTIME_GEO locationData %@", locationDataRaw);
  if(startListenLocationChange){
    [self sendEventWithName:@"locationChange" body: locationDataRaw];
  } else {
    locationData =locationDataRaw;
  }

}



-(NSString *) authStatusToString:(CLAuthorizationStatus)authStatus
{
  switch (authStatus) {
    case kCLAuthorizationStatusAuthorizedAlways:
      return @"authorizedAlways";

    case kCLAuthorizationStatusAuthorizedWhenInUse:
      return @"authorizedWhenInUse";

    case kCLAuthorizationStatusDenied:
      return @"denied";

    case kCLAuthorizationStatusNotDetermined:
      return @"notDetermined";

    case kCLAuthorizationStatusRestricted:
      return @"restricted";
  }
}
- (NSDictionary *)constantsToExport {
  BOOL isEnable= [CLLocationManager locationServicesEnabled];
  NSString *status = [self authStatusToString:[CLLocationManager authorizationStatus]];
  return @{@"isEnable": isEnable ? @YES : @NO,
           @"permissionStatus": status,
           @"hasPermission" : ([status  isEqual: @"authorizedAlways"] || [status  isEqual: @"authorizedWhenInUse"]) ? @YES : @NO
           };
}



@end



