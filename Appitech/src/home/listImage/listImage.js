import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View, Image, FlatList, Linking} from "react-native";
import httpClient from "../../utils/httpClient";
import { SearchBar } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Video from 'react-native-video';

const ListImage = ({listImage, onListImage, isConnected, onConnected, search, onSearch}) => {
    const [selectedId, setSelectedId] = useState(null);
    async function searchImage(page) {
        global.page += 1;
        var result = await httpClient("https://api.imgur.com/3/gallery/search/" + global.page + "/?q=" + encodeURIComponent(search), "GET", undefined);
        for (var i = 0; i < result.data.length; i += 1) {
            onListImage(listImage => [...listImage, result.data[i]]);
        }
    }
    function handleLoadMore() {
        searchImage();
    }
    async function changeFavorite(index) {
        setSelectedId(index);
        var tmp = listImage;
        if (tmp[index].favorite) {
            tmp[index].favorite = false;
        } else {
            tmp[index].favorite = true;
        }
        var result = await httpClient("https://api.imgur.com/post/v1/posts/" + tmp[index].id + "/favorite", "POST", {});
        onListImage(tmp);
        setTimeout(() => {
            setSelectedId(-1);
        }, 500)
    }
    function renderItems({item, index}) {
        var items = item;
        var favorite;
        var img;

        if (isConnected) {
            favorite = <Icon onPress={() => {changeFavorite(index)}} type='font-awesome'name='heart-o'color='#D20073' />;
        if (items.favorite) {
            favorite = <Icon onPress={() => {changeFavorite(index)}} type='font-awesome'name='heart'color='#D20073' />;
            }
        }
        if (items.images) {
            var type = items.images[0].type;
            if (type.split("/")[0] === "image") {
                img = (
                    <Card.Image style={styles.tinyLogo} source={{uri: items.images[0].link,}} onPress={() => Linking.openURL(items.link)}>
                        </Card.Image>
                );
            } else {
                img = <Video muted={true} source={{
                            uri: items.images[0].mp4
                        }}style={{ width: 300, height: 300 }}
                        />
            }
        } else {
                var type = items.type;
                if (type.split("/")[0] === "image") {
                    img = (
                        <Card.Image style={styles.tinyLogo} source={{uri: items.link}} onPress={() => Linking.openURL(items.link)}>
                            </Card.Image>
                    );
                } else {
                    img = <Video muted={true} source={{
                                uri: items.mp4
                            }}style={{ width: 300, height: 300 }}
                            />
                }
            }
            return (
            <View>
                <Card>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <Card.Title style={{width: '75%', textAlign: "left"}}>
                        {items.title}
                    </Card.Title>
                    <View style={{
                            flex: 1,
                            width: 100,
                            height: 100,
                            right: -40,
                            position: 'absolute',
                            }}>
                        {favorite}
                        </View>
                    </View>
                    <Card.Divider/>
                    {img}
                </Card>
            </View>)

    }
    
   
    return (
        <View>
            <FlatList
                data={listImage}
                extraData={selectedId}
                renderItem={renderItems}
                onEndReached={handleLoadMore}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 30,
        paddingTop : 25,
        paddingBottom : 5,
        
    },
    tinyLogo: {
        width: '100%',
        aspectRatio: 50/50,
        height: 250,
        alignSelf: "center"
    },
});

export default ListImage;