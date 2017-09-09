package com.ve.ffmpeg;

import java.io.File;
import android.os.Environment;
// import android.widget.Toast;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.Promise;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.github.hiteshsondhi88.libffmpeg.FFmpeg;
import com.github.hiteshsondhi88.libffmpeg.*;
import com.github.hiteshsondhi88.libffmpeg.exceptions.*;

public class RNFFMpegModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;
  private final FFmpeg ffmpeg;

  public RNFFMpegModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;

    this.ffmpeg = FFmpeg.getInstance(this.reactContext);
    try {
      ffmpeg.loadBinary(new LoadBinaryResponseHandler() {

        @Override
        public void onStart() {}

        @Override
        public void onFailure() {}

        @Override
        public void onSuccess() {}

        @Override
        public void onFinish() {}
      });
    } catch (FFmpegNotSupportedException e) {
      // Handle if FFmpeg is not supported by device\
      e.printStackTrace();
    }
  }

  @Override
  public String getName() {
    return "RCTFFMpeg";
  }

  private final void sendEvent(String eventName,
                       String params) {
    reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
  }

  @ReactMethod
  public void kill () {
    ffmpeg.killRunningProcesses();
  }

  @ReactMethod
  public void run(String args) {
    if(ffmpeg.isFFmpegCommandRunning()){
      sendEvent("error", "ffmpeg is running");
    } else {
      String[] cmd = args.split(" ");
      cmd[cmd.length - 1] = fixPath(cmd[cmd.length - 1]);
      if(cmd[cmd.length - 1].equals("")) return;
      conversion(cmd);
    }
  }

  @ReactMethod
  public void addLogo(String input, String logo, String output) {
    // output = fixPath(output);
    // if(!output.equals("")) {
    //   String[] cmd = {
    //     "-i",
    //     input,
    //     "-i",
    //     logo,
    //     "-filter_complex",
    //     "overlay",
    //     output
    //   };
    //   conversion(cmd);
    // }
    run("-i " + input + " -i " + logo + " -filter_complex overlay " + output);
  }

  private String fixPath(String output) {
    File folder = new File(Environment.getExternalStorageDirectory() + 
                             File.separator + "DCIM" + File.separator + "VE");
    boolean success = true;
    if (!folder.exists()) {
        success = folder.mkdirs();
    }
    if (success) {
      return folder.getPath() + File.separator + output;
    } else {
      sendEvent("error", "directory error");
      return "";
    }
  }

  public void conversion(String[] cmd) {

    try {
      // to execute "ffmpeg -version" command you just need to pass "-version"
      ffmpeg.execute(cmd, new ExecuteBinaryResponseHandler() {

        @Override
        public void onStart() {
          sendEvent("start", "");
        }

        @Override
        public void onProgress(String message) {
          sendEvent("process", message);
        }

        @Override
        public void onFailure(String message) {
          sendEvent("fail", message);
        }

        @Override
        public void onSuccess(String message) {
          sendEvent("success", message);
        }

        @Override
        public void onFinish() {
          sendEvent("finish", "");
        }
      });
    } catch (FFmpegCommandAlreadyRunningException e) {
      // Handle if FFmpeg is already running
      e.printStackTrace();
      sendEvent("error", e.getMessage());
    }
  }
}