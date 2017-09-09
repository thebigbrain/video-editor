import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native';
import Store from '../store';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel: true,
            editType: 0
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={this.checkEdit.bind(this, 1)}>
                    <Text style={[styles.item,1 == this.state.editType ? {color:'red'} : '']}>滤镜</Text>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={this.checkEdit.bind(this, 2)}>
                    <Text style={[styles.item,2 == this.state.editType ? {color:'red'} : '']}>音乐</Text>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={this.checkEdit.bind(this, 3)}>
                    <Text style={[styles.item,3 == this.state.editType ? {color:'red'} : '']}>贴纸</Text>
                </TouchableNativeFeedback>
            </View>
        );
    }
    /* 渲染完成时执行 */
    componentDidMount() {
        Store.subscribe('CHECKEDIT', ((payload) => {
            this.setState({ editType: payload.editType })
        }).bind(this))
    }
    checkEdit(index) {
        Store.dispatch({ type: 'CHECKEDIT', payload: { editType: index } });
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#101010',
        height: 60
    },
    item: {
        color: 'white'
    }
});
