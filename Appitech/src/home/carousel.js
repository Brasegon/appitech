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
              title:"Bernstein",
              text: "T6 - Devops",
          },
          {
              title:"Epicture",
              text: "T6 - App Development",
          },
          {
              title:"E-Commerce",
              text: "T6 - Php Symfony development",
          }
        ]
      }
    }

    _renderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'#39A2DB',
              borderRadius: 30,
              height: 150,
              padding: 50,
              marginLeft: 20,
              marginRight: 0, }}>
            <Text style={{fontSize: 25, color: 'white', top : -25}}>{item.title}</Text>
            <Text style={{width : 180, top : -10}}>{item.text}</Text>
          </View>

        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1, paddingTop: 20, }}>
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
