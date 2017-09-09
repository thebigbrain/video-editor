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

const FilterMap = {
  'boxblur': 'boxblur=2:1:cr=0:ar=0',
  // 'colorchannelmixer': 'colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3',
  'drawbox': 'drawbox=color=pink@0.5:t=max',
  'drawgrid': 'drawgrid=width=100:height=100:thickness=2:color=red@0.5'
};

export default class VE extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  componentWillUnmount () {
    FFMpeg.kill();
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
    let target = `VE-${new Date().getTime()}.mp4`;
    FFMpeg.addLogo(source, logo, target);
  }

  onPressAddFilter () {
    let source = this.cameraPickerRef.video.path;
    let target = `VE-${new Date().getTime()}.mp4`;
    FFMpeg.run(`-i ${source} -vf ${FilterMap.drawbox} ${target}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <CameraPicker ref={ (ref) => { this.cameraPickerRef = ref } }/>
        <Button
          onPress={this.onPressAddFilter.bind(this)}
          title="Add Filter"
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