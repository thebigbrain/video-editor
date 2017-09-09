import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    View,
    StyleSheet,
    Button
} from 'react-native';

import { CameraPicker } from '../../js/picker';
import FFMpeg from '../../js/ffmpeg';

const viewType = {
    fullScreen_vertical: 1,
    fullScreen_horizontal: 2,
    normal: 3,
    small: 4,
    smaller: 5,
    circle: 6
}

export default class VedioView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: viewType.fullScreen_vertical
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <CameraPicker ref={ (ref) => { this.cameraPickerRef = ref } }/>
                <Button
                  onPress={this.onPressAddLogo.bind(this)}
                  title="Add Logo"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }

    componentDidMount() {
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

    onPressAddLogo() {
        let logo = 'http://img.bss.csdn.net/201709070936311271.jpg';
        let source = this.cameraPickerRef.video.path;
        let target = `VE-${new Date().getTime()}.mp4`;
        FFMpeg.addLogo(source, logo, target);
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee'
    }
});
