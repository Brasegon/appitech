import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import httpClient from "../../utils/httpClient";
import { SearchBar, Overlay } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

const SearchBarHome = ({listImage, onListImage, search, onSearch}) => {
    
    const [visible, setVisible] = useState(false);
    const [tri, setTri] = useState();
    const [time, setTime] = useState();
    async function searchImage(page) {
        global.page = 0;
        setVisible(true);
        var result = await httpClient("https://api.imgur.com/3/gallery/search/" + tri + "/" + time + "/" + page + "/?q=" + encodeURIComponent(search), "GET", undefined);
        onListImage([]);

        for (var i = 0; i < result.data.length; i += 1) {
            onListImage(listImage => [...listImage, result.data[i]]);
        }
        setVisible(false);
    }

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
    <View>
        <Overlay isVisible={visible}>
        <View>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        </Overlay>    
        <SearchBar
            placeholder="Rechercher une image"
            searchIcon={{name: 'search', type: 'font-awesome'}}
            clearIcon={{name: 'eraser', type: 'font-awesome'}}
            onChangeText={text =>  {
                onSearch(text)
            }}
            round = {true}
            onSubmitEditing={() => searchImage(0)}
            onClear={() => onListImage([])}
            value={search}
            lightTheme={true}
            containerStyle={{width: "100%", height: 60, backgroundColor : 'white', borderRadius: 0}}
            inputContainerStyle={{width : '100%', height : 40, backgroundColor : 'white'}}
        />
        <View style={{flex: 1, flexDirection: "row"}}>
            <Picker style={{width: '50%'}}
            selectedValue={tri}
            onValueChange={(itemValue, itemIndex) =>
                setTri(itemValue)
            }>
            <Picker.Item label="Top" value="top" />
            <Picker.Item label="Time" value="time" />
            <Picker.Item label="Viral" value="viral" />
            </Picker>
            <Picker style={{width: '50%'}}
            selectedValue={time}
            onValueChange={(itemValue, itemIndex) =>
                setTime(itemValue)
            }>
            <Picker.Item label="All" value="all" />
            <Picker.Item label="Day" value="day" />
            <Picker.Item label="Week" value="week" />
            <Picker.Item label="Month" value="month" />
            <Picker.Item label="Year" value="year" />
            </Picker>
        </View>
        <Text></Text>
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
        width: 300,
        height: 300,
    },
});

export default SearchBarHome;