import React, { Component } from 'react';
import {
  CameraRoll,
  DeviceEventEmitter,
  View, 
  StyleSheet ,
  Button,
} from 'react-native';


import Video from 'react-native-video';

import { CameraPicker } from './picker';
import FFMpeg from './ffmpeg';

export default class VE extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  componentDidMount () {
    DeviceEventEmitter.addListener('start', function(e: Event) {
      console.log(e);
    });

    DeviceEventEmitter.addListener('process', function(e: Event) {
      console.log(e);
    });

    DeviceEventEmitter.addListener('fail', function(e: Event) {
      console.log(e);
    });

    DeviceEventEmitter.addListener('success', function(e: Event) {
      console.log(e);
    });

    DeviceEventEmitter.addListener('finish', function(e: Event) {
      console.log(e);
    });

    DeviceEventEmitter.addListener('error', function(e: Event) {
      console.log(e);
    });
  }

  onPressAddLogo () {
    let logo = 'http://img.bss.csdn.net/201709070936311271.jpg';
    let source = this.cameraPickerRef.video.path;
    let target = `/sdcard/temp/${new Date().getTime()}.mp4`;
    FFMpeg.addLogo(source, logo, target);
  }

  render() {
    return (
      <View style={styles.container}>
        <CameraPicker ref={ (ref) => { this.cameraPickerRef = ref } }/>
        <Button style={styles.button}
          onPress={this.onPressAddLogo.bind(this)}
          title="Add Logo"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    backgroundColor: '#aaa',
  }
});