import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Filter from './edit/filter';
import Music from './edit/Music';
import Paper from './edit/Paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel: true
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text onPress={this.save} style={styles.item}>
                    保存
                </Text>
                
            </View>
        );
    }
    save(){
        console.log('保存。。。');
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#101010',
        height: 200
    },
    item:{
        color: 'white'
    }
});
