import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Alert,
  Action,
  TouchableOpacity,
  Linking,
  Dimensions
} from 'react-native'
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AnimatedLoader from "react-native-animated-loader";

const Down = ({isConnected, onConnected}) => {
const [loading, onLoading] = React.useState(true);

    return (
        <View>
            <AnimatedLoader
                visible={loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("./down.json")}
                animationStyle={styles.lottie}
                speed={1} />
        </View>
    )
}
const styles = StyleSheet.create({

})

export default Down;