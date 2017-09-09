import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Header from './header';
import VedioView from './vedio-view';
import Footer from './footer';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      showText:true
    }
  }

  componentDidMount () {
    // 每1000毫秒对showText状态做一次取反操作
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <VedioView style={{flex:1}}/>
        <Footer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'column',
      backgroundColor: '#000000',
      borderColor: 'red'
    }
});
