import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Store from '../../store';

export default class save extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel: true,
            fadeAnim: new Animated.Value(0),
            translateY: new Animated.Value(50)
        }
    }
    render() {
        return (
            <Animated.View style={[styles.container, {
                ...this.props.style,
                opacity: this.state.fadeAnim,
                transform: [{ translateY: this.state.translateY }]
            }]}>
                <TouchableNativeFeedback
                    accessibilityComponentType="button"
                    accessibilityLabel={'保存'}
                    accessibilityTraits={['button']}
                    testID={'saveButton'}
                    onPress={this.save}>
                    <View style={styles.button}>
                        <Text style={styles.text}>保存</Text>
                    </View>
                </TouchableNativeFeedback>
            </Animated.View>
        );
    }

    save() {
        Store.dispatch({type:'SAVEVEDIO',payload:{}}); //派发保存视频动作
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#101010',
        height: 200
    },
    item: {
        color: 'white'
    },
    button: {
        elevation: 4,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        borderColor: 'red',
        borderRadius: 30,
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
