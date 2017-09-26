package com.loremachine;
import com.github.xinthink.rnmk.ReactMaterialKitPackage; 
import com.facebook.react.ReactActivity;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactPackage;
import java.util.List;
import java.util.Arrays;
import com.rngrp.RNGRPPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "LoreMachine";
    }

    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNGRPPackage()
      );
    }
}
