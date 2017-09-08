import ImagePicker from 'react-native-image-crop-picker';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Video from 'react-native-video';
import { VideoPlayer } from './video-player';

export class CameraPicker extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	source: props.source
	  };
	}

	componentDidMount () {
	    ImagePicker.openPicker({
	      cropping: false,
	      mediaType: 'video'
	    }).then(video => {
	    	this.video = video;
	      this.setState({
	      	source: video.path
	      })
	    });
	}

	render() {
		if(!this.state.source) return (<Text>loading...</Text>);
		return (
			<Video
				style={styles.backgroundVideo}
				source={{uri: this.state.source}}
				resizeMode="cover" 
       	repeat={true}
      />
		);
	}
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0, 
    bottom: 0,
    backgroundColor: '#000'
  }
});