package com.ve.ffmpeg;

// import android.widget.Toast;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
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

  @ReactMethod
  public void addLogo(String input, String logo, String output, Promise promise) {
    String[] cmd = {
      "-i",
      input,
      "-i",
      logo,
      "-filter_complex",
      "overflow",
      output
    };
    conversion(cmd, promise);
  }

  public void conversion(String[] cmd, final Promise promise) {
    try {
      // to execute "ffmpeg -version" command you just need to pass "-version"
      ffmpeg.execute(cmd, new ExecuteBinaryResponseHandler() {

        @Override
        public void onStart() {
        }

        @Override
        public void onProgress(String message) {
        }

        @Override
        public void onFailure(String message) {
          promise.reject(message);
        }

        @Override
        public void onSuccess(String message) {
          promise.resolve(message);
        }

        @Override
        public void onFinish() {
        }
      });
    } catch (FFmpegCommandAlreadyRunningException e) {
      // Handle if FFmpeg is already running
      e.printStackTrace();
    }
  }
}