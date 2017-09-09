import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    Modal,
    ProgressBar,
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

const FilterMap = [
    ,
    'boxblur=2:1:cr=0:ar=0', 
    'drawbox=color=pink@0.5:t=max', 
    'drawgrid=width=100:height=100:thickness=2:color=red@0.5',
    'drawbox=color=pink@0.5:t=max', 
    'drawgrid=width=100:height=100:thickness=2:color=red@0.5',
    'boxblur=2:1:cr=0:ar=0',
    'drawgrid=width=100:height=100:thickness=2:color=red@0.5',
    'boxblur=2:1:cr=0:ar=0',
    'drawbox=color=pink@0.5:t=max', 
    'drawgrid=width=100:height=100:thickness=2:color=red@0.5',
    'boxblur=2:1:cr=0:ar=0',
    'drawgrid=width=100:height=100:thickness=2:color=red@0.5',
    'boxblur=2:1:cr=0:ar=0',
];

const paperList = ['http://image27.360doc.com/DownloadImg/2011/04/1517/10943604_2.jpg',
    'http://image27.360doc.com/DownloadImg/2011/04/1517/10943604_3.jpg',
    'http://image27.360doc.com/DownloadImg/2011/04/1517/10943604_5.jpg',
    'http://image27.360doc.com/DownloadImg/2011/04/1517/10943604_6.jpg',
    'http://image27.360doc.com/DownloadImg/2011/04/1517/10943604_8.jpg',
    'http://image27.360doc.com/DownloadImg/2011/04/1517/10943604_9.jpg',
    'http://image27.360doc.com/DownloadImg/2011/04/1517/10943604_10.jpg',
    'http://image27.360doc.com/DownloadImg/2011/04/1517/10943604_11.jpg']

export default class VedioView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: viewType.fullScreen_vertical,
            paper: '',
            pindex: -1,
            music: '',
            filter: 0,
            modalVisible: false
        }
    }
    render() {
        let image = !!this.state.paper ? <Image source={this.state.paper} style={styles.paper} /> : <Text></Text>;
        return (
            <TouchableNativeFeedback onPress={this.clearEdit.bind(this)}>
                <View style={styles.container}>
                    <CameraPicker ref={(ref) => { this.cameraPickerRef = ref }} />
                    {image}
                    
                </View>
            </TouchableNativeFeedback>
        );
    }

    clearEdit() {
        Store.dispatch({ type: 'CHECKEDIT', payload: { editType: 0 } });
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('start', e => {
            this.setState({modalVisible: true });
        });

        DeviceEventEmitter.addListener('process', function (e: Event) {
            console.log(e);
        });

        DeviceEventEmitter.addListener('fail', function (e: Event) {
            console.log(e);
        });

        DeviceEventEmitter.addListener('success', function (e: Event) {
            console.log(e);
        });

        DeviceEventEmitter.addListener('finish', target => {
            console.log(target);
            this.setState({modalVisible: true });
            this.cameraPickerRef.update(target);
        });

        DeviceEventEmitter.addListener('error', function (e: Event) {
            console.log(e);
        });

        Store.subscribe('SELECTEDPAPER', ((payload) => {
            this.setState({ paper: payload.url, pindex: payload.pindex })
        }).bind(this))

        Store.subscribe('SELECTEDMUSIC', ((payload) => {
            this.setState({ music: payload.url })
        }).bind(this))

        Store.subscribe('SELECTEDFILTER', ((payload) => {
            this.setState({ filter: payload.filter });
        }).bind(this))

        Store.subscribe('SAVEVEDIO', ((payload) => {
            let source = this.cameraPickerRef.video.path;
            let target = `VE-${new Date().getTime()}.mp4`;
            if (-1 != this.state.pindex) {
                FFMpeg.addLogo(source, paperList[this.state.pindex], target);
            }
            if (!!this.state.music) {
                //add bgm
            }
            if (0 != this.state.filter) {
                // add filter
                FFMpeg.run(`-i ${source} -vf ${FilterMap[this.state.filter]} ${target}`);
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

let { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        position: 'relative'
    },
    paper: {
        position: 'absolute',
        top: 0,
        left: (width - (width / height) * (height - 60 - 200 - 60)) / 2,
        width: 60,
        height: 60
    }
});
