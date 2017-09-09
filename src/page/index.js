import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import Header from './header';
import VedioView from './vedio-view';
import Footer from './footer';
import Store from '../store';

const { width, height } = Dimensions.get("window");
const section = ['生成视频失败', '开始生成视频', '视频生成中...', '视频生成成功', '视频生成完成']
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
      section: 0
    }
  }

  componentDidMount() {
    // 每1000毫秒对showText状态做一次取反操作
    // setInterval(() => {
    //   this.setState(previousState => {
    //     return { showText: !previousState.showText };
    //   });
    // }, 1000);
    Store.subscribe('CREATEVEDIO', (payload => {
      this.setState({
        showText: payload.showText,
        section: payload.section
      })
      if(payload.section == 0 || payload.section == 4){
        setTimeout(() => {
          this.setState({
            showText: false,
          })
        },1000)
      }
    }).bind(this))
  }

  render() {
    let content = this.state.showText ? <View style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.6)', position: 'absolute', elevation: 100, left: 0, top: 0, width: width, height: height, alignItems: 'center', justifyContent: 'center' }]}>
      <Text style={{ color: 'white' }}>{section[this.state.section]}</Text>
    </View> : <Text style={{ position: 'absolute' }}></Text>;
    return (
      <View style={styles.container}>
        <Header />
        <VedioView style={{ flex: 1 }} />
        <Footer />
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000',
    borderColor: 'red'
  }
});
