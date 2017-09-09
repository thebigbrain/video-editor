import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableNativeFeedback,
    Dimensions
} from 'react-native';

import { CameraPicker } from '../../js/picker';
import FFMpeg from '../../js/ffmpeg';
import Store from '../store';

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
            viewType: viewType.fullScreen_vertical,
            paper: '',
            music: '',
            filter: 0
        }
    }
    render() {
        let image = !!this.state.paper ? <Image source={this.state.paper} style={styles.paper}/> : <Text></Text>;
        return (
            <TouchableNativeFeedback onPress={this.clearEdit.bind(this)}>
                <View style={styles.container}>
                    <CameraPicker ref={ (ref) => { this.cameraPickerRef = ref } }/>
                    {image}
                </View>
            </TouchableNativeFeedback>
        );
    }

    clearEdit() {
        Store.dispatch({ type: 'CHECKEDIT', payload: { editType: 0 } });
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

        Store.subscribe('SELECTEDPAPER', ((payload) => {
            this.setState({ paper: payload.url })
        }).bind(this))
        
        Store.subscribe('SELECTEDMUSIC', ((payload) => {
            this.setState({ music: payload.url })
        }).bind(this))
        
        Store.subscribe('SELECTEDFILTER', ((payload) => {
            this.setState({ filter: payload.filter })
        }).bind(this))
        
        Store.subscribe('SAVEVEDIO', ((payload) => {
            let source = this.cameraPickerRef.video.path;
            let target = `VE-${new Date().getTime()}.mp4`;
            if(!!paper){
                FFMpeg.addLogo(source, paper, target);
            }
            if(!!music){
                //add bgm
            }
            if(0 != filter){
                // add filter
            }
        }).bind(this))
    }

    onPressAddLogo() {
        let logo = 'http://img.bss.csdn.net/201709070936311271.jpg';
        let source = this.cameraPickerRef.video.path;
        let target = `VE-${new Date().getTime()}.mp4`;
        FFMpeg.addLogo(source, logo, target);
    }
}

let {width,height} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        position: 'relative'
    },
    paper: {
        position: 'absolute',
        top: 0,
        left: (width - (width / height) * (height - 60 - 200 - 60)) / 2,
        width:60,
        height:60
    }
});
