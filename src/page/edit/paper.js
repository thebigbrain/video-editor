import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableNativeFeedback,
    ScrollView,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Store from '../../store';

const paperList = [{
    name: '兔子',
    url: require('../../../resources/assets/img/ys1.jpg')
}, {
    name: '小狗',
    url: require('../../../resources/assets/img/ys2.jpg')
}, {
    name: '小熊',
    url: require('../../../resources/assets/img/ys3.jpg')
}, {
    name: '老鼠',
    url: require('../../../resources/assets/img/ys4.jpg')
}, {
    name: '山羊',
    url: require('../../../resources/assets/img/ys7.jpg')
}]
export default class Paper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel: true,
            fadeAnim: new Animated.Value(0),
            translateY: new Animated.Value(50),
            active: Store.getState()['paper'] && Store.getState()['paper']['active'] || -1 //该值为musicList下标，用于改变选中按钮的样式
        }
    }
    render() {
        let clearButton = -1 != this.state.active ? <TouchableNativeFeedback
                                                        key={'clearPaperButton'}
                                                        accessibilityComponentType="button"
                                                        accessibilityLabel={'清除贴纸'}
                                                        accessibilityTraits={['button']}
                                                        testID={'clearPaperButton'}
                                                        onPress={this.clearPaper.bind(this)}>
                                                        <View style={[{position: 'absolute', left: 10}]}>
                                                            <Text style={styles.text}>清除贴纸</Text>
                                                        </View>
                                                    </TouchableNativeFeedback> : <Text style={{position: 'absolute'}}></Text>;
        return (
            <Animated.View style={[styles.container, {
                ...this.props.style,
                opacity: this.state.fadeAnim,
                transform: [{ translateY: this.state.translateY }]
            }]}>
                <View style={[styles.item,{ height: 40, borderBottomWidth: 1, borderBottomColor: '#7B7B7B', position: 'relative' }]}>
                    <Text style={styles.title}>
                        添加贴纸
                    </Text>
                    {clearButton}
                </View>
                <View style={[styles.item, { height: 60, marginLeft: 10, marginRight: 10, marginTop: 40 }]}>
                    <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>
                        {paperList.map(this.createPaperButton)}
                    </ScrollView>
                </View>
            </Animated.View>
        );
    }

    createPaperButton = (data, i) => <TouchableNativeFeedback
                                        key={'paperButton' + i}
                                        accessibilityComponentType="button"
                                        accessibilityLabel={data.name}
                                        accessibilityTraits={['button']}
                                        testID={'paperButton' + i}
                                        onPress={this.onButtonPress.bind(this, i)}>
                                        <View style={[styles.button, i == this.state.active ? styles.active : '']}>
                                            <Image source={data.url} style={{width:58,height:58}}/>
                                        </View>
                                    </TouchableNativeFeedback>;

    onButtonPress = index => {
        console.log('ss:', paperList[index]);
        this.setState({
            active: index
        });
        Store.getState()['paper']={active:index}; //记录选择的贴纸
        Store.dispatch({type:'SELECTEDPAPER',payload:{url:paperList[index].url,pindex:index}}); //派发选择贴纸事件，在视频组件中响应
    };

    clearPaper(){
        this.setState({
            active: -1
        });
        Store.getState()['paper']={active:-1}; //记录选择的贴纸
        Store.dispatch({type:'SELECTEDPAPER',payload:{url:'',pindex:-1}}); //派发选择贴纸事件，在视频组件中响应
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
        
        Store.subscribe('CLEARPAPER', ((payload) => {
            this.setState({ active: -1 })
        }).bind(this))
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
    title:{
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
    text:{
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '300',
    },
});
