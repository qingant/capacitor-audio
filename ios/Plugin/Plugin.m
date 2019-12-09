#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(AudioPlugin, "Audio",
           CAP_PLUGIN_METHOD(playList, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setPlaying, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(pausePlay, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(resumePlay, CAPPluginReturnPromise);
)
