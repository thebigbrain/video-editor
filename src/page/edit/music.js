import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableNativeFeedback,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Store from '../../store';
import Sound from 'react-native-sound';

const musicList = [{
    name: 'fc 热血格斗',
    url: require('../../../resources/assets/music/FurtherBeyondFighting.mp3')
}, {
    name: 'Ninja Turtles',
    url: require('../../../resources/assets/music/NinjaTurtles.mp3')
}, {
    name: 'fc 超级洛克人',
    url: require('../../../resources/assets/music/luokeman.mp3')
}, {
    name: 'shadow legend',
    url: require('../../../resources/assets/music/shadow-legend.mp3')
}, {
    name: 'kof 97 WINNER',
    url: require('../../../resources/assets/music/SNKKOF.mp3')
}, {
    name: 'Super Mario Bros. 3',
    url: require('../../../resources/assets/music/SuperMarioBros3.mp3')
}, {
    name: 'fc 坦克大战',
    url: require('../../../resources/assets/music/waroftank.mp3')
}];
export default class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel: true,
            fadeAnim: new Animated.Value(0),
            translateY: new Animated.Value(50),
            active: Store.getState()['music'] && Store.getState()['music']['active'] || -1, //该值为musicList下标，用于改变选中按钮的样式
            sound: Store.getState()['music'] && Store.getState()['music']['sound'] || ''
        }
    }
    render() {
        let selectedMusic = this.state.active != -1 ? <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', flex: 1 }}>
                {musicList[this.state.active].name}
            </Text>
            <TouchableNativeFeedback
                onPress={this.clearMusic.bind(this)}>
                <View style={[styles.button, { height: 20 }]}>
                    <Text style={styles.text}>删除</Text>
                </View>
            </TouchableNativeFeedback>
        </View> :
            <Text style={{ color: 'white' }}>
                请选择音乐
                                                    </Text>;
        return (
            <Animated.View style={[styles.container, {
                ...this.props.style,
                opacity: this.state.fadeAnim,
                transform: [{ translateY: this.state.translateY }]
            }]}>
                <View style={[styles.item, { height: 40, borderBottomWidth: 1, borderBottomColor: '#7B7B7B' }]}>
                    <Text style={styles.title}>
                        添加音乐
                    </Text>
                </View>
                <View style={[{ height: 70, marginLeft: 10, marginRight: 10, justifyContent: 'center', alignItems: 'center' }]}>
                    {selectedMusic}
                </View>
                <View style={[styles.item, { height: 60, marginLeft: 10, marginRight: 10 }]}>
                    <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>
                        {musicList.map(this.createMusicButton)}
                    </ScrollView>
                </View>
            </Animated.View>
        );
    }

    createMusicButton = (data, i) => <TouchableNativeFeedback
        key={'musicButton' + i}
        accessibilityComponentType="button"
        accessibilityLabel={data.name}
        accessibilityTraits={['button']}
        testID={'musicButton' + i}
        onPress={this.onButtonPress.bind(this, i)}>
        <View style={[styles.button, i == this.state.active ? styles.active : '']}>
            <Text style={styles.text}>{data.name.toUpperCase()}</Text>
        </View>
    </TouchableNativeFeedback>;

    setStoreData(data) {
        if(!!Store.getState()['music']){
            Store.getState()['music'] = {...Store.getState()['music'],...data};
        }else{
            Store.getState()['music'] = data;
        }
    }

    onButtonPress = index => {
        console.log('ss:', musicList[index]);
        this.setState({
            active: index
        });
        this.setStoreData({ active: index }); //记录选择音乐
        Store.dispatch({ type: 'SELECTEDMUSIC', payload: { url: musicList[index].url } }) //派发选择音乐事件，在视频组件中响应
        this.play(musicList[index].url); //播放音乐
    };
    clearMusic() {
        this.setState({
            active: -1
        });
        this.setStoreData({ active: -1 }); //记录选择音乐
        Store.dispatch({ type: 'SELECTEDMUSIC', payload: { url: '' } }) //派发选择音乐事件，在视频组件中响应
        this.play(''); //暂停音乐
    }

    stop() {
        if (!this.state.sound) {
            return;
        }
        this.state.sound
            .stop()
            .release();
        this.setState({ sound: null });
        this.setStoreData({ sound: '' }); //记录播放音乐
    }


    play(url) {
        this.stop();
        if (!!url) {
            const s = new Sound(url, (e) => {
                if (e) {
                    console.log('error', e);
                    return;
                }
                s.setNumberOfLoops(-1);
                s.play();
            });
            this.setState({ sound: s });
            this.setStoreData({ sound: s }); //记录播放音乐
        }
    }

    /* 渲染完成时执行 */
    componentDidMount() {
        Animated.parallel([                             // 并行执行
            Animated.timing(                            // 随时间变化而执行的动画类型
                this.state.fadeAnim,                    // 动画中的变量值
                {
                    toValue: 1,
                    duration: 200
                }
            ),
            Animated.timing(
                this.state.translateY,
                {
                    toValue: 0,
                    duration: 200
                }
            ),
        ]).start();
    }

    /* 卸载组件时执行 */
    componentWillUnmount() {
        Animated.parallel([                             // 并行执行
            Animated.timing(                            // 随时间变化而执行的动画类型
                this.state.fadeAnim,                    // 动画中的变量值
                {
                    toValue: 0,
                    duration: 200
                }
            ),
            Animated.timing(
                this.state.translateY,
                {
                    toValue: 200,
                    duration: 200
                }
            ),
        ]).start();
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#101010',
        height: 200
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#6C6C6C'
    },
    active: {
        borderColor: 'red'
    },
    button: {
        elevation: 4,
        height: 60,
        width: 60,
        marginLeft: 2,
        marginRight: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        borderColor: '#121212',
        borderWidth: 1
    },
    text: {
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '300',
    },
});
