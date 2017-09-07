import ImagePicker from 'react-native-image-crop-picker';

import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

// import { Video } from './video';
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
	      this.setState({
	      	source: video.path
	      })
	    });
	}

	render() {
		if(!this.state.source) return (<Text>please select a video</Text>);
		return (
			<VideoPlayer source={this.state.source}/>
		);
	}
}