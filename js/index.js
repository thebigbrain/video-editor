import React, { Component } from 'react';
import { 
  View, 
  StyleSheet ,
  Button
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
    console.log(this.cameraPickerRef)
  }

  onPressAddLogo () {
    console.log(this.cameraPickerRef)
    FFMpeg.addLogo('./broadchurch.mp4', './ios_crop.png', './output.mp4')
  }

  render() {
    return (
      <View style={styles.container}>
        <CameraPicker ref={ (ref) => { this.cameraPickerRef = ref } }/>
        <Button
          onPress={this.onPressAddLogo}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    backgroundColor: '#aaa',
  }
});