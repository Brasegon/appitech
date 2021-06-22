import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';

export default class Craigslist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      data: [
        {id:1,  name: "T6 - Part-time job",   image:"https://img.icons8.com/color/96/000000/module.png",           count:0,} ,
        {id:2,  name: "T6 - PCP Development",    image:"https://img.icons8.com/color/96/000000/module.png",       count:1},
        {id:3,  name: "T6 - Binary Security",       image:"https://img.icons8.com/color/96/000000/module.png", count:2} ,
        {id:4,  name: "T6 - PHP Framework & REST API",   image:"https://img.icons8.com/color/96/000000/module.png",    count:3} ,
        {id:5,  name: "T6 - Organizational Theory",   image:"https://img.icons8.com/color/96/000000/module.png",        count:3} ,
        {id:6,  name: "T6 - Organizational Theory",   image:"https://img.icons8.com/color/96/000000/module.png",        count:3} ,
        {id:7,  name: "T6 - Organizational Theory",   image:"https://img.icons8.com/color/96/000000/module.png",        count:3} ,
        {id:8,  name: "T6 - Organizational Theory",   image:"https://img.icons8.com/color/96/000000/module.png",        count:3} ,
        {id:9,  name: "T6 - Organizational Theory",   image:"https://img.icons8.com/color/96/000000/module.png",        count:3} ,
        {id:10,  name: "T6 - Organizational Theory",   image:"https://img.icons8.com/color/96/000000/module.png",        count:3} ,

      ]
    };
  }

  clickEventListener = (item) => {
    Alert.alert('Message', 'Item clicked. '+item.name);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
              <Image style={styles.image} source={{uri: item.image}}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.count}>{item.count} crédit(s)</Text>
                <TouchableOpacity style={styles.followButton} onPress={()=> this.clickEventListener(item)}>
                  <Text style={styles.followButtonText}>Explore now</Text>  
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#ebf0f7"
  },
  contentList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
    borderWidth:2,
    borderColor:"#ebf0f7"
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"white",
    padding: 10,
    flexDirection:'row',
    borderRadius:30,
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#3399ff",
    fontWeight:'bold'
  },
  count:{
    fontSize:15,
    alignSelf:'auto',
    color:"#6666ff"
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "white",
    borderWidth:1,
    borderColor:"#dcdcdc",
  },
  followButtonText:{
    color: "#6e6e6e",
    fontSize:12,
  },
}); 