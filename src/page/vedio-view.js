import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

const viewType = {
    fullScreen_vertical: 1,
    fullScreen_horizontal: 2,
    normal: 3,
    small: 4,
    smaller: 5,
    circle: 6
}

export default class VedioView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: viewType.fullScreen_vertical
        }
    }
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
