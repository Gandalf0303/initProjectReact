package com.thanhpham;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResponse;
import com.google.android.gms.location.SettingsClient;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.location.LocationProvider;
import android.os.Looper;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.util.Log;
//import android.os.Build.VERSION;
//import java.security.Timestamp;
import java.text.SimpleDateFormat;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
//import com.mohan.location.locationtrack.LocationProvider;

import okio.Timeout;

public class RNRealtimeGeoModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private final ReactApplicationContext reactContext;
    private FusedLocationProviderClient mFusedLocationClient;
    private LocationCallback mLocationCallback;
    private LocationSettingsRequest mLocationSettingsRequest;
    private LocationRequest mLocationRequest;
    private SettingsClient mSettingsClient;
    // constane for export to JS


    public RNRealtimeGeoModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(reactContext);
        createLocationCallback();
        createLocationRequest();
        buildLocationSettingsRequest();
        mSettingsClient = LocationServices.getSettingsClient(this.reactContext);
        getReactApplicationContext().addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "RNRealtimeGeo";
    }


    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {

    }


    @ReactMethod
    public void checkEnableLocationService(Callback cb) {

        LocationManager manager = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);
        if (manager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
            cb.invoke(true);
            return;
        } else {
            cb.invoke(false);
            return;
        }
    }


    @ReactMethod
    public void openLocationServiceActivity() {
        final LocationManager manager = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);
        if (!manager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
            reactContext.startActivity(new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS));
        }
    }


    private void emitMessageToRN(String eventName, @Nullable WritableMap params) {
        this.reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


    @ReactMethod
    public void checkPermissions(Callback cb) {
        int permissionState = ActivityCompat.checkSelfPermission(this.reactContext,
                Manifest.permission.ACCESS_COARSE_LOCATION);
        switch (permissionState) {
            case PackageManager.PERMISSION_GRANTED:
                cb.invoke("granted");
                break;
            case PackageManager.PERMISSION_DENIED:
                cb.invoke("denied");
                break;
        }
    }

    @ReactMethod
    public void startTracking() {
//        long interval = options.getInt("interval");
//        long fastestIterval = options.getInt("fastestIterval");
//        createLocationRequest(interval,fastestIterval);

        mSettingsClient.checkLocationSettings(mLocationSettingsRequest).addOnSuccessListener(this.reactContext.getCurrentActivity(), new OnSuccessListener<LocationSettingsResponse>() {
            @Override
            public void onSuccess(LocationSettingsResponse locationSettingsResponse) {
                if (ActivityCompat.checkSelfPermission(reactContext.getApplicationContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(reactContext.getApplicationContext(), Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    // TODO: Consider calling
                    //    ActivityCompat#requestPermissions
                    // here to request the missing permissions, and then overriding
                    //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                    //                                          int[] grantResults)
                    // to handle the case where the user grants the permission. See the documentation
                    // for ActivityCompat#requestPermissions for more details.
                    return;
                }
                mFusedLocationClient.requestLocationUpdates(mLocationRequest, mLocationCallback, Looper.myLooper());
            }


        });
    }

    @ReactMethod
    public void stopTracking(final Promise promise) {
        try {
            mFusedLocationClient.removeLocationUpdates(mLocationCallback)
                    .addOnCompleteListener(reactContext.getCurrentActivity(), new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> task) {
                            promise.resolve(true);
                        }
                    });
        } catch (Exception e) {
            Log.e("LOI", "KO tat dk listender");
            promise.resolve(false);
        }
    }

    @javax.annotation.Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        try {
            int permissionState = ActivityCompat.checkSelfPermission(this.reactContext,
                    Manifest.permission.ACCESS_COARSE_LOCATION);

            constants.put("hasPermission", permissionState == PackageManager.PERMISSION_GRANTED ? true : false);
            LocationManager manager = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);
            constants.put("isEnable", manager.isProviderEnabled(LocationManager.GPS_PROVIDER) ? true : false);
            constants.put("permissionStatus", manager.isProviderEnabled(LocationManager.GPS_PROVIDER) ? "authorizedAlways" : "restricted");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return constants;
    }

    // helper
    private void createLocationCallback() {
        mLocationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                super.onLocationResult(locationResult);
                WritableMap params = Arguments.createMap();
                params.putDouble("latitude", locationResult.getLastLocation().getLatitude());
                params.putDouble("longitude", locationResult.getLastLocation().getLongitude());
                emitMessageToRN("locationChange", params);
            }
        };
    }

    private void buildLocationSettingsRequest() {
        LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder();
        builder.addLocationRequest(mLocationRequest);
        mLocationSettingsRequest = builder.build();
    }

    private void createLocationRequest() {
        mLocationRequest = new LocationRequest();
        mLocationRequest.setInterval(5000);
        mLocationRequest.setFastestInterval(3000);
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
    }
}