# mmwcon-workshop-ionic
ionic source code from Friday morning MMWCON workshop.
1. clone or download the project from this repo
2. install the missing camera plugin
3. add the platform(s) of interest (ios, android, windowsphone)
4. test as a web app
    * ```ionic serve --lab```
5. build as a platform app
    * ```ionic build ios```
6. open the app in IDE and run on emulator or device

note that the project is missing the platform and plugin directories as these directories are part of the default .gitignore provided in the project template.  So, the plugins and platforms will need to be added.  Follow the instructions for each and ideally install the plugins before the platforms of interest.  This will make sure the plugins are properly added to each platform as the platform is added.

## Plugins
the camera feature for the walk-thru on plugin use is based on the camera plugin provided through the ngCordova wrapper.  You can find the documentation [here](http://ngcordova.com/docs/plugins/camera/).  Note you must run the following cordova command to download and include the pulgin for use.
```
cordova plugin add org.apache.cordova.camera
```
Note that part of my plugin implementation requires the ngCordova javascript module to work correctly.  This is accomplished by downloading the library from [ngCordova](http://ngCordova.com).  The .js or .min.js file is placed in the lib directory of the www folder and linked w/ a reference in the index.html.  And, finally the ngCordova module must be injected into the app module, as can be seen in the app.js file.  This should already be done in the git repo for this project (but the camera plugin must still be added, ngCordova is just the wrapper).

## Platforms
the ionic platform command can be used to add the desired development/deployment platform.  Note, the only testing in the workshop and during development was for an iOS release.  However, the Ionic framework does allow for the addition of android or windowsphone platforms
```
ionic platform add ios
ionic platform add android
```