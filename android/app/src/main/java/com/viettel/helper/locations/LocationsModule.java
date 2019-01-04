package com.viettel.helper.locations;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.PendingResult;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.location.LocationAvailability;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;

public class LocationsModule extends ReactContextBaseJavaModule {

    private int mLocationPriority = LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY;
    private GoogleApiClient mGoogleApiClient;
    private static final String TAG = "@VT_LOCATION";
    private final int PLAY_SERVICES_RESOLUTION_REQUEST = 2404;
    private final String NATIVE_EVENT = "fusedLocation";
    private final String NATIVE_ERROR = "fusedLocationError";
    private final String ERROR_PLAY_SERVICES_NOT_FOUND = "Play services not found.";
    private final String ERROR_UNAUTHORIZED = "Appropriate permissions not given.";
    private final String ERROR_NO_LOCATION_PROVIDER = "No location provider found.";
    private int mLocationInterval = 15000;
    private int mLocationFastestInterval = 10000;
    private int mSmallestDisplacement = 0;
    private LocationListener mLocationListener;
    private ReactApplicationContext reactContext;

    public LocationsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "Locations";
    }

    @ReactMethod
    public void setLocationInterval(int mLocationInterval) {
        this.mLocationInterval = mLocationInterval;
    }

    @ReactMethod
    public void setLocationPriority(int mLocationPriority) {
        switch (mLocationPriority) {
            case 0:
                this.mLocationPriority = LocationRequest.PRIORITY_HIGH_ACCURACY;
                break;
            case 1:
                this.mLocationPriority = LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY;
                break;
            case 2:
                this.mLocationPriority = LocationRequest.PRIORITY_LOW_POWER;
                break;
            case 3:
                this.mLocationPriority = LocationRequest.PRIORITY_NO_POWER;
                break;
        }
    }

    @ReactMethod
    public void checkPermision(Promise promise) {
        boolean hasPermision = ActivityCompat.checkSelfPermission(getReactApplicationContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(getReactApplicationContext(), Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED;
        promise.resolve(hasPermision);
    }

    @SuppressWarnings("All")
    @ReactMethod
    public void openSettingPermision() {
        Intent intent = new Intent();
        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        Uri uri = Uri.fromParts("package", this.reactContext.getPackageName(), null);
        intent.setData(uri);
        this.reactContext.startActivity(intent);
    }

    @SuppressWarnings("All")
    @ReactMethod
    public void openLocationSetting() {
        final String action = android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS;
        Intent intent = new Intent();
        intent.setAction(action);
        this.reactContext.startActivity(intent);
    }

    @ReactMethod
    public void setFastestLocationInterval(int mLocationFastestInterval) {
        this.mLocationFastestInterval = mLocationFastestInterval;
    }

    @ReactMethod
    public void setSmallestDisplacement(int mSmallestDisplacement) {
        this.mSmallestDisplacement = mSmallestDisplacement;
    }

    @SuppressWarnings("All")
    @ReactMethod
    public void getFusedLocation(boolean forceNewLocation, final Promise promise) {
        try {
            if (!areProvidersAvailable()) {
                promise.reject(TAG, ERROR_NO_LOCATION_PROVIDER);
                return;
            }
            if (!checkForPlayServices()) {
                promise.reject(TAG, ERROR_PLAY_SERVICES_NOT_FOUND);
                return;
            }
            if (ActivityCompat.checkSelfPermission(getReactApplicationContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(getReactApplicationContext(), Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                promise.reject(TAG, ERROR_UNAUTHORIZED);
                return;
            }
            this.setLocationPriority(0);

            final GoogleApiClient googleApiClient;
            LocationRequest request = buildLR();
            googleApiClient = new GoogleApiClient.Builder(getReactApplicationContext())
                    .addApi(LocationServices.API)
                    .build();
            googleApiClient.blockingConnect();
            final Location location;
            if (!forceNewLocation) {
                location = LocationServices.FusedLocationApi.getLastLocation(googleApiClient);
            } else {
                location = null;
            }
            if (location == null) {
                LocationServices.FusedLocationApi.requestLocationUpdates(googleApiClient, request, new LocationCallback() {
                    @Override
                    public void onLocationResult(LocationResult locationResult) {
                        super.onLocationResult(locationResult);
                        promise.resolve(convertLocationToJSON(locationResult.getLastLocation()));
                    }

                    @Override
                    public void onLocationAvailability(LocationAvailability locationAvailability) {
                        super.onLocationAvailability(locationAvailability);
                        LocationServices.FusedLocationApi.removeLocationUpdates(googleApiClient, this);
                        googleApiClient.disconnect();
                        if (!locationAvailability.isLocationAvailable()) {
                            promise.reject(TAG, "Location not available. Does your phone have GPS turned on and internet connectivity?");
                        }
                    }
                }, null);
                return;
            }
            if (location != null) {
                Log.d(TAG, location.toString());
            }
            promise.resolve(convertLocationToJSON(location));
            googleApiClient.disconnect();
        } catch (Exception ex) {
            Log.e(TAG, "Native Location Module ERR - " + ex.toString());
            promise.reject(TAG, ex.toString());
        }
    }

    @SuppressWarnings("All")
    @ReactMethod
    public void startLocationUpdates(final Promise promise) {
        try {
            if (!checkForPlayServices()) {
                WritableMap params = new WritableNativeMap();
                params.putString("error", ERROR_PLAY_SERVICES_NOT_FOUND);
                sendEvent(getReactApplicationContext(), NATIVE_ERROR, params);
                promise.reject(TAG, ERROR_PLAY_SERVICES_NOT_FOUND);
                return;
            }
            if (ActivityCompat.checkSelfPermission(getReactApplicationContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(getReactApplicationContext(), Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                WritableMap params = new WritableNativeMap();
                params.putString("error", ERROR_UNAUTHORIZED);
                sendEvent(getReactApplicationContext(), NATIVE_ERROR, params);
                promise.reject(TAG, ERROR_UNAUTHORIZED);
                return;
            }
            if (!areProvidersAvailable()) {
                WritableMap params = new WritableNativeMap();
                params.putString("error", ERROR_NO_LOCATION_PROVIDER);
                sendEvent(getReactApplicationContext(), NATIVE_ERROR, params);
                // Allow the App to still register the location updates so that it can send new locations if the user turns on the GPS through the notification bar
                // promise.reject(TAG, ERROR_NO_LOCATION_PROVIDER);
                // return;
            }
            LocationRequest request = buildLR();
            Log.d("request", request.getPriority() + "");
            mGoogleApiClient = new GoogleApiClient.Builder(getReactApplicationContext())
                    .addApi(LocationServices.API)
                    .build();
            mGoogleApiClient.blockingConnect();
            mLocationListener = new LocationListener() {
                @Override
                public void onLocationChanged(Location l) {
                    sendEvent(getReactApplicationContext(), NATIVE_EVENT, convertLocationToJSON(l));
                }
            };
            LocationServices.FusedLocationApi.requestLocationUpdates(mGoogleApiClient, request, mLocationListener);
            promise.resolve(null);
        } catch (Exception ex) {
            Log.e(TAG, "Native Location Module ERR - " + ex.toString());
            WritableMap params = new WritableNativeMap();
            params.putString("error", "Native Location Module ERR - " + ex.toString());
            sendEvent(getReactApplicationContext(), NATIVE_ERROR, params);
            promise.reject(TAG, ex);
        }
    }

    @ReactMethod
    public void stopLocationUpdates(final Promise promise) {
        if (mGoogleApiClient != null && mLocationListener != null && mGoogleApiClient.isConnected()) {
            PendingResult<Status> pendingResult = LocationServices.FusedLocationApi.removeLocationUpdates(mGoogleApiClient, mLocationListener);
            pendingResult.setResultCallback(new ResultCallback<Status>() {
                @Override
                public void onResult(@NonNull Status status) {
                    mGoogleApiClient.disconnect();
                    if (!status.isSuccess()) {
                        Log.e(TAG, "Could not remove location updates.");
                        promise.reject(TAG, String.valueOf(status.getStatusCode()));
                    } else {
                        promise.resolve(true);
                    }

                }
            });
        } else {
            promise.resolve(false);
        }
    }

    @ReactMethod
    public void areProvidersAvailable(final Promise promise) {
        promise.resolve(areProvidersAvailable());
    }

    private boolean areProvidersAvailable() {
        LocationManager lm = (LocationManager) getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);
        boolean gps_enabled = false;
        try {
            gps_enabled = lm.isProviderEnabled(LocationManager.GPS_PROVIDER) || lm.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
        } catch (Exception ex) {
            Log.e(TAG, ex.toString());
        }
        return gps_enabled;
    }

    // ~ https://stackoverflow.com/questions/
    // 22493465/check-if-correct-google-play-service-available-unfortunately-application-has-s
    private boolean checkForPlayServices() {
        GoogleApiAvailability googleApiAvailability = GoogleApiAvailability.getInstance();
        int resultCode = googleApiAvailability
                .isGooglePlayServicesAvailable(getReactApplicationContext());
        if (resultCode != ConnectionResult.SUCCESS) {
            if (googleApiAvailability.isUserResolvableError(resultCode)) {
                googleApiAvailability.getErrorDialog(getCurrentActivity(), resultCode,
                        PLAY_SERVICES_RESOLUTION_REQUEST).show();
            }
            return false;
        }
        return true;
    }

    private WritableMap convertLocationToJSON(Location l) {
        WritableMap params = new WritableNativeMap();
        params.putDouble("latitude", l.getLatitude());
        params.putDouble("longitude", l.getLongitude());
        params.putDouble("accuracy", l.getAccuracy());
        params.putDouble("altitude", l.getAltitude());
        params.putDouble("bearing", l.getBearing());
        params.putString("provider", l.getProvider());
        params.putDouble("speed", l.getSpeed());
        params.putString("timestamp", Long.toString(l.getTime()));
        boolean isMock;
        if (android.os.Build.VERSION.SDK_INT >= 18) {
            isMock = l.isFromMockProvider();
        } else {
            isMock = !Settings.Secure.getString(getReactApplicationContext().getContentResolver(), Settings.Secure.ALLOW_MOCK_LOCATION).equals("0");
        }
        params.putBoolean("mocked", isMock);
        return params;
    }

    private LocationRequest buildLR() {
        LocationRequest request = new LocationRequest();
        request.setPriority(mLocationPriority);
        request.setInterval(mLocationInterval);
        request.setFastestInterval(mLocationFastestInterval);
        request.setSmallestDisplacement(mSmallestDisplacement);
        return request;
    }

    /*
     * Internal function for communicating with JS
     */
    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        if (reactContext.hasActiveCatalystInstance()) {
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        } else {
            Log.d(TAG, "Waiting for Catalyst Instance...");
        }
    }
}

