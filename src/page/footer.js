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
import Store from '../store';

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
            editType: editType.none
        }
        // setInterval(() => {
        //     this.setState(preState => {
        //         return { editType: (preState.editType + 1) % 4 }
        //     })
        // }, 2000)
    }
    render() {
        let editPage;
        if (this.state.editType === editType.none) {
            editPage = <Save />
        } else if (this.state.editType === editType.filter) {
            editPage = <Filter />
        } else if (this.state.editType === editType.music) {
            editPage = <Music />
        } else if (this.state.editType === editType.paper) {
            editPage = <Paper />
        }
        return (
            <View style={styles.container}>
                {editPage}
            </View>
        );
    }

    /* 渲染完成时执行 */
    componentDidMount() {
        Store.subscribe('CHECKEDIT', ((payload) => {
            this.setState({ editType: payload.editType })
        }).bind(this))
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200
    }
});
