package com.exampleredux;
import com.rnfs.RNFSPackage;
import com.reactnativenavigation.packages.RnnPackage;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.reactnativenavigation.activities.RootActivity;
import java.util.Arrays;
import java.util.List;
public class MainActivity extends RootActivity {

     @Override
     public List<ReactPackage> getPackages() {
       return Arrays.asList(
               new MainReactPackage(),
               new RnnPackage(),
               new RNFSPackage() // <---------- add package
       );
     }
}
