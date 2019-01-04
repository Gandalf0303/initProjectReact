// #import <AVFoundation/AVFoundation.h>
#import <CoreLocation/CoreLocation.h>
#import <React/RCTConvert.h>
#import "RNRealtimeGeo.h"

/**
 ** see more about ios corelocation service: https://developer.apple.com/documentation/corelocation/cllocationmanager
 **/
@interface RNRealtimeGeo () <CLLocationManagerDelegate>
@property (strong, nonatomic) CLLocationManager *locationManager;
@end

@implementation RNRealtimeGeo{
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
-(instancetype) init {
    if(self = [super init]){
        self.locationManager = [[CLLocationManager alloc] init];
//        self.locationManager.desiredAccuracy =kCLLocationAccuracyBest;
//        self.locationManager.pausesLocationUpdatesAutomatically = YES;
    }
    //    [self.locationManager startUpdatingLocation];
    return self;
}
RCT_EXPORT_MODULE()

/**
 ** Brigde location
 **/
// returm status auth
RCT_EXPORT_METHOD(startTracking:(NSDictionary *) options){
    if(self && self.locationManager != nil){
//        self.locationManager = [[CLLocationManager alloc] init];
        self.locationManager.delegate = self;
        self.locationManager.desiredAccuracy =kCLLocationAccuracyBest;
        self.locationManager.pausesLocationUpdatesAutomatically = NO;
    }

}

RCT_EXPORT_METHOD(checkPermissions:(RCTResponseSenderBlock)callback)
{
    callback(@[[self authStatusToString:[CLLocationManager authorizationStatus]]]);
}

RCT_EXPORT_METHOD(checkEnableLocationService:(RCTResponseSenderBlock) callback){
    BOOL isEnable= [CLLocationManager locationServicesEnabled];
    callback(@[[NSNull null], @(isEnable)]);
}

RCT_EXPORT_METHOD(requestWhenInUseAuth){
    [self.locationManager requestWhenInUseAuthorization];
}

RCT_EXPORT_METHOD(requestAlwaysAuth){
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
    [self sendEventWithName:@"permissionChange" body:statusName];
}

// emit khi trạng thái của location thay đổi

-(void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations {
    CLLocation *location = [locations lastObject];
    NSDictionary *locationData = @{
                                   @"latitude": @(location.coordinate.latitude),
                                   @"longitude": @(location.coordinate.longitude)
                                   };
    NSLog(@"THANHPHAM_REALTIME_GEO locationData %@", locationData);
    [self sendEventWithName:@"locationChange" body: locationData];
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



