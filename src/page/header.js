import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel: true
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.item}>滤镜</Text>
                <Text style={styles.item}>音乐</Text>
                <Text style={styles.item}>贴纸</Text>
            </View>
        );
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
    item:{
        color: 'white'
    }
});
