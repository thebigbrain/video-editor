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
    'drawgrid=width=100:height=100:thickness=2:color=red@0.5'
];

const paperList = ['http://image.tianjimedia.com/uploadImages/2011/160/CLZ4E2B3V2G0.jpg',
    'http://image.tianjimedia.com/uploadImages/2011/160/5H2W47FKBNMX.jpg',
    'http://image.tianjimedia.com/uploadImages/2011/160/UODWE0LN56L5.jpg',
    'http://image.tianjimedia.com/uploadImages/2011/160/MXAXCL54W24Y.jpg',
    'http://image.tianjimedia.com/uploadImages/2011/160/I21YC715Q6J0.jpg'];

let currentSource = '';

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
            this.setState({ modalVisible: true });
            Store.dispatch({ type: 'CREATEVEDIO', payload: { showText: true, section: 1 } });
        });

        DeviceEventEmitter.addListener('process', function (e: Event) {
            console.log(e);
            Store.dispatch({ type: 'CREATEVEDIO', payload: { showText: true, section: 2 } });
        });

        DeviceEventEmitter.addListener('fail', function (e: Event) {
            console.log(e);
            Store.dispatch({ type: 'CREATEVEDIO', payload: { showText: true, section: 0 } });
            Store.dispatch({ type: 'CLEARPAPER', payload: {} });
        });

        DeviceEventEmitter.addListener('success', function (e: Event) {
            console.log(e);
            Store.dispatch({ type: 'CREATEVEDIO', payload: { showText: true, section: 3 } });
            Store.dispatch({ type: 'CLEARPAPER', payload: {} });
        });

        DeviceEventEmitter.addListener('finish', target => {
            console.log(target);
            this.setState({ modalVisible: true });
            this.cameraPickerRef.update(target);
            currentSource = target;
            Store.dispatch({ type: 'CREATEVEDIO', payload: { showText: true, section: 4 } });
            Store.dispatch({ type: 'CLEARPAPER', payload: {} });
        });

        DeviceEventEmitter.addListener('error', function (e: Event) {
            console.log(e);
            Store.dispatch({ type: 'CREATEVEDIO', payload: { showText: true, section: 0 } });
            Store.dispatch({ type: 'CLEARPAPER', payload: {} });
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
            let source = currentSource || this.cameraPickerRef.video.path;
            console.warn(source);
            let target = `VE-${new Date().getTime()}.mp4`;
            if (-1 != this.state.pindex) {
                // FFMpeg.addLogo(source, , target);
                FFMpeg.run(`-i ${source} -i ${paperList[this.state.pindex]} -filter_complex [1]scale=w=58:h=58[tmp];[0][tmp]overlay ${target}`);
            }
            if (!!this.state.music) {
                //add bgm
            }
            if (-1 == this.state.pindex && 0 != this.state.filter) {
                // add filter
                FFMpeg.run(`-i ${source} -vf ${FilterMap[this.state.filter]} ${target}`);
            }
        }).bind(this))
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
        width: 120,
        height: 120
    }
});
