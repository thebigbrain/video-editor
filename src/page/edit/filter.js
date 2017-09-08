import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    ScrollView,
    Button,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const filterButtons = ['OR','F1','F2','R1','OR','F1','F2','R1','OR','F1','F2','R1','OR','F1','F2','R1','OR','F1','F2','R1','OR','F1','F2','R1'];
export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel: true,
            fadeAnim: new Animated.Value(0),
            translateY: new Animated.Value(50),
            active: 0 //该值为filterButtons下标，用于改变选中按钮的样式
        }
    }
    // static filterButtons = ['OR','F1','F2','R1'];
    render() {
        return (
            <Animated.View style={[styles.container,{
                ...this.props.style,
                opacity: this.state.fadeAnim,
                transform:[{translateY: this.state.translateY}]
              }]}>
              <View style={[styles.item,{height:40,borderBottomWidth: 1,borderBottomColor: '#7B7B7B'}]}>
                <Text style={styles.title}>
                    滤镜
                </Text>
              </View>
              <View style={[styles.item,{height:60,marginTop:30,marginLeft:10,marginRight:10}]}>
                <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>
                    {filterButtons.map(this.createFilterButton)}
                </ScrollView>
              </View>
              <View style={[styles.item,{height:40,marginLeft:10,marginRight:10,flexDirection:'row',justifyContent:'space-between'}]}>
                <Text style={[styles.title,{width:90}]}>
                    透明度
                </Text>
                <Text style={{flex:1}}>
                
                </Text>
              </View>
            </Animated.View>
        );
    }

    // createFilterButton = (text, i) => <Button key={'filterButton'+i} title={text} onPress={this.onButtonPress.bind(this,i)} accessibilityLabel={text} color='#121212' style={[styles.filterButton,i == this.state.active ? styles.active : '']}/>;

    createFilterButton = (text,i) => <TouchableNativeFeedback
                                        key={'filterButton'+i}
                                        accessibilityComponentType="button"
                                        accessibilityLabel={text}
                                        accessibilityTraits={['button']}
                                        testID={'filterButton'+i}
                                        onPress={this.onButtonPress.bind(this,i)}>
                                        <View style={[styles.button,i == this.state.active ? styles.active : '']}>
                                            <Text style={styles.text}>{text.toUpperCase()}</Text>
                                        </View>
                                    </TouchableNativeFeedback>;

    onButtonPress = index => {
        console.log('ss:',filterButtons[index]);
        this.setState({
            active: index
        });
    };

    /* 渲染完成时执行 */
    componentDidMount() {
        Animated.parallel([                             // 并行执行
            Animated.timing(                            // 随时间变化而执行的动画类型
                this.state.fadeAnim,                    // 动画中的变量值
                {
                    toValue: 1,                         // 透明度最终变为1，即完全不透明
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
                    toValue: 0,                         // 透明度最终变为1，即完全不透明
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
    contentContainer: {
        paddingVertical: 10,
    },
    filterButton: {
        // color: 'white',
        height: 20,
        width: 20,
    },
    active: {
        borderColor: 'red'
    },
    button: {
        elevation: 4,
        height: 40,
        width: 40,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        borderColor: '#121212',
        borderRadius: 20,
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
