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
                <Text>text1</Text>
                <Text>text2</Text>
                <Text>text3</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1D1D21',
        height: 60
    }
});
