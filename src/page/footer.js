import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Filter from './edit/filter';
import Music from './edit/music';
import Paper from './edit/paper';
import Save from './edit/save';
import Icon from 'react-native-vector-icons/FontAwesome';

const editType = {
    none: 0,
    filter: 1,
    music: 2,
    paper: 3
}

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel: true,
            editType: editType.paper
        }
        // setInterval(() => {
        //     this.setState(preState => {
        //         return { editType: (preState.editType + 1) % 4 }
        //     })
        // },2000)
    }
    render() {
        let editPage;
        if (this.state.editType === editType.none) {
            editPage = <Save/>
        } else if (this.state.editType === editType.filter) {
            editPage = <Filter/>
        } else if (this.state.editType === editType.music) {
            editPage = <Music/>
        } else if (this.state.editType === editType.paper) {
            editPage = <Paper/>
        }
        return (
            <View style={styles.container}>
                {editPage}
            </View>
        );
    }
    save() {
        console.log('保存。。。');
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200
    }
});
