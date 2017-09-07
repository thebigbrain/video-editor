import React, { Component } from 'react';
import { View } from 'react-native';
import { VideoPlayer, Trimmer } from 'react-native-video-processing';
 
export class Video extends Component {
    constructor(props) {
      super(props);
    
      this.state = {};
    }

    trimVideo() {
        const options = {
            startTime: 0,
            endTime: 15,
            quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only 
            saveToCameraRoll: true, // default is false // iOS only 
            saveWithCurrentDate: true, // default is false // iOS only 
        };
        this.videoPlayerRef.trim(options)
            .then((newSource) => console.log(newSource))
            .catch(console.warn);
    }
 
    compressVideo() {
        const options = {
            width: 720,
            height: 1280,
            bitrateMultiplier: 3, // iOS only 
            saveToCameraRoll: true, // default is false, iOS only 
            saveWithCurrentDate: true, // default is false, iOS only 
            minimumBitrate: 300000, // iOS only 
            removeAudio: true, // default is false 
        };
        this.videoPlayerRef.compress(options)
            .then((newSource) => console.log(newSource))
            .catch(console.warn);
    }
 
    getPreviewImageForSecond(second) {
        const maximumSize = { width: 640, height: 1024 }; // default is { width: 1080, height: 1080 } iOS only 
        this.videoPlayerRef.getPreviewForSecond(second, maximumSize) // maximumSize is iOS only 
        .then((base64String) => console.log('This is BASE64 of image', base64String))
        .catch(console.warn);
    }
 
    getVideoInfo() {
        this.videoPlayerRef.getVideoInfo()
        .then((info) => console.log(info))
        .catch(console.warn);
    }
 
    render() {
        return (
            <View style={{ flex: 1 }}>
                <VideoPlayer
                    ref={ref => this.videoPlayerRef = ref}
                    startTime={30}  // seconds 
                    endTime={120}   // seconds 
                    play={true}     // default false 
                    replay={true}   // should player play video again if it's ended 
                    rotate={true}   // use this prop to rotate video if it captured in landscape mode iOS only 
                    source={this.props.source}
                    playerWidth={300} // iOS only 
                    playerHeight={500} // iOS only 
                    style={{ backgroundColor: 'black' }}
                    resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
                    onChange={({ nativeEvent }) => console.log({ nativeEvent })} // get Current time on every second 
                />
                <Trimmer
                    source={this.props.source}
                    height={100}
                    width={300}
                    onTrackerMove={(e) => console.log(e.currentTime)} // iOS only 
                    // currentTime={this.video.currentTime} // use this prop to set tracker position iOS only 
                    themeColor={'white'} // iOS only 
                    thumbWidth={30} // iOS only 
                    trackerColor={'green'} // iOS only 
                    onChange={(e) => console.log(e.startTime, e.endTime)}
                />
            </View>
        );
    }
}