import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, FlatList, Linking, Dimensions, screenWidth} from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
    chartConfig,
  } from 'react-native-chart-kit'


export default function Log() {
    const linedata = {
        labels: ['24/05', '25/05', '26/05', '27/05', '28/05', '29/05', "30/05"],
        datasets: [
          {
            data: [4, 5, 6, 4, 7, 0, 0],
            strokeWidth: 2, // optional
          },
        ],
      };

    return (

        <View>
        <LineChart
          data={linedata}
          width={Dimensions.get('window').width} // from react-native
          height={200}
          yAxisLabel={''}
          chartConfig={{
            backgroundGradientFrom: 'rgba(255, 255, 255, 0)',
            backgroundGradientTo: 'rgba(255, 255, 255, 0)',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(30,144,255, ${opacity})`,
            style: {
            }
          }}
          bezier
          style={{
            marginBottom: 30,
            left:-10
          }}
        />
      </View>
    );

}