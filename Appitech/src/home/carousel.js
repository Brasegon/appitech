import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView } from 'react-native';

import Carousel from 'react-native-snap-carousel';

export default class carousel extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"E-Commerce",
              module: "T6 - PHP Framework",
              credits: "6 available credits"
          },
          {
              title:"Epicture",
              module: "T6 - App Development",
              credits: "6 available credits"
          },
          {
              title:"E-Commerce",
              module: "T6 - Php Symfony development",
              credits: "6 available credits"
          }
        ]
      }
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
            <Text style={{ fontSize: 25, color: 'white', top: -28, left: -20, fontWeight: 'bold' }}>{item.title}</Text>
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
            <Text style={{width : 230, top : 10, left: -20, color :'white', opacity:0.8}}>{item.module}</Text>
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
            <Text style={{width : 180, top : 40, left: -20, color :'white', opacity:0.8}}>{item.credits}</Text>
            <View
              style={{
                borderBottomColor: 'white',
                borderBottomWidth: 2,
                left: -20,
                top : 50,
                width : 300,
                opacity : 0.3
              }}
            />
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
                  data={this.state.carouselItems}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );
    }
}
