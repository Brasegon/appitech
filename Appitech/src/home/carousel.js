import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView, ProgressBarAndroid, StyleSheet} from 'react-native';

import Carousel from 'react-native-snap-carousel';

export default class carousel extends React.Component {

 
    constructor(props){
        super(props);
        // console.log(props.project, 'teeeeeeeeeeeeeeeeeeeeest');
    }

    _renderItem({item,index}){
        return (
          <View style={{
              flex : 1,
              backgroundColor:'#2ca9e7',
              borderRadius: 15,
              height : 0,
              padding: 50,
              marginLeft: 20,
            marginRight: 0,
          }}>
            <Text style={{ fontSize: 23, color: 'white', top: -28, left: -20, fontWeight: 'bold', width:230 }}>{item.title}</Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 4,
                left: -20,
                top : -10,
                width : 50,
                opacity : 0.3
              }}
            />
            <Text style={{width : 230, top : 10, left: -20, color :'white', opacity:0.8}}>{item.timeline_start} - {item.timeline_end}</Text>
            <View
              style={{
                borderBottomColor: 'white',
                borderBottomWidth: 2,
                left: -20,
                top : 20,
                width : 300,
                opacity : 0.3
              }}
            />
                <View>
                      <ProgressBarAndroid
                        style={styles.bar}
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={item.timeline_barre / 100}
                        color="white"
                      />
                    </View>
          </View>

        )
    }

    render() {
        return (
          <SafeAreaView style={{paddingTop: 0, height : 200}}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.props.project}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  bar: {
    paddingTop: 80,
    marginBottom: -10,
    width: 200
  }
});
