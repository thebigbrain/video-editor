import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
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
                <Icon name="check-circle-o" size={30} color="#900" />
                <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
                    Login with Facebook
                </Icon.Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D1F21',
        height: 200
    }
});
