package com.luces.app;

import android.app.Application;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.appevents.AppEventsLogger;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.imagepicker.ImagePickerPackage; 
import com.BV.LinearGradient.LinearGradientPackage; 

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AsyncStoragePackage(),
          new SplashScreenReactPackage(),
          new ImagePickerPackage(),
          new FBSDKPackage(mCallbackManager),
          new ReactNativeYouTube(),
          new LinearGradientPackage(),
          new RNFirebasePackage(),
          new RNFirebaseMessagingPackage(),
          new RNFirebaseNotificationsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
