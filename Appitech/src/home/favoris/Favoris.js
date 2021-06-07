import React, { useEffect, useState } from "react";
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Linking,
    RefreshControl,
} from "react-native";
import Login from "../../login/login";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import Video from "react-native-video";
function Favoris({ isConnected, onConnected, listFavorite, onFavorite }) {
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(false);
    async function changeFavorite(index) {
        setSelectedId(index);
        var tmp = listFavorite;
        if (tmp[index].favorite) {
            tmp[index].favorite = false;
        } else {
            tmp[index].favorite = true;
        }
        var result = await httpClient(
            "https://api.imgur.com/post/v1/posts/" +
                tmp[index].id +
                "/favorite",
            "POST",
            {}
        );
        onFavorite(tmp);
        setTimeout(() => {
            setSelectedId(-1);
        }, 500);
    }

    function renderItem({ item, index }) {
        var items = item;
        var type = items.type;
        var img;
        var favorite;
        if (isConnected) {
            favorite = (
                <Icon
                    onPress={() => {
                        changeFavorite(index);
                    }}
                    type="font-awesome"
                    name="heart-o"
                    color="#D20073"
                />
            );
            if (items.favorite) {
                favorite = (
                    <Icon
                        onPress={() => {
                            changeFavorite(index);
                        }}
                        type="font-awesome"
                        name="heart"
                        color="#D20073"
                    />
                );
            }
        }
        if (type.split("/")[0] === "image") {
            img = (
                <Card.Image
                    style={styles.tinyLogo}
                    source={{
                        uri:
                            "https://i.imgur.com/" +
                            items.cover +
                            "." +
                            type.split("/")[1],
                    }}
                    onPress={() => Linking.openURL(items.link)}
                ></Card.Image>
            );
        } else {
            img = <Video muted={true} source={{
                        uri: items.images[0].mp4
                    }}style={{ width: 300, height: 300 }}
                    />
        }
        if (items) {
            return (
                <View>
                    <Card>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Card.Title
                                style={{ width: "75%", textAlign: "left" }}
                            >
                                {items.title}
                            </Card.Title>
                            <View
                                style={{
                                    flex: 1,
                                    width: 100,
                                    height: 100,
                                    right: -40,
                                    position: "absolute",
                                }}
                            >
                                {favorite}
                            </View>
                        </View>
                        <Card.Divider />
                        {img}
                    </Card>
                </View>
            );
        }
    }

    async function searchImage() {
        var result = await httpClient(
            "https://api.imgur.com/3/account/me/favorites",
            "GET",
            undefined
        );
        onFavorite([]);
        for (var i = 0; i < result.data.length; i += 1) {
            onFavorite((listFavorite) => [...listFavorite, result.data[i]]);
        }
    }
    async function useAsync() {
        useEffect(() => {
            if (isConnected) {
                searchImage();
            }
        }, []);
    }
    useAsync();
    if (isConnected == false) {
        return (
            <View style={{ left: 130 }}>
                <Image
                    source={require("../../../Asset/broken.png")}
                    style={{ width: 200, height: 180, left: -50, top: 160 }}
                />
                <Text
                    style={{
                        top: 180,
                        left: -60,
                        fontSize: 20,
                        color: "#cdcdcd",
                    }}
                >
                    <Text style={{ color: "#D20073" }}>Login</Text> to have
                    access to{"\n"} your favorites
                </Text>
            </View>
        );
    } else {
        return (
            <View>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={searchImage}
                        />
                    }
                    data={listFavorite}
                    renderItem={renderItem}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 30,
        paddingTop: 25,
        paddingBottom: 5,
    },
    tinyLogo: {
        width: "100%",
        aspectRatio: 50 / 50,
        height: 250,
        alignSelf: "center",
    },
});
export default Favoris;
