import React from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { DataTable } from 'react-native-paper';

export default function Mark() {
  return (

    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{flex: 3}}>Titre</DataTable.Title>
          <DataTable.Title numeric>Grade</DataTable.Title>
          <DataTable.Title numeric>Crédits</DataTable.Title>
        </DataTable.Header>
        <ScrollView vertical={true}>

        <DataTable.Row style={ styles.rowVariante}>
          <DataTable.Cell style={{flex: 3}}>T6 - Organizational Theory</DataTable.Cell>
          <DataTable.Cell numeric>A</DataTable.Cell>
          <DataTable.Cell numeric>3</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={{flex: 3}}>T6 - Hub</DataTable.Cell>
          <DataTable.Cell numeric>-</DataTable.Cell>
          <DataTable.Cell numeric>0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={ styles.rowVariante}>
          <DataTable.Cell style={{flex: 3}}>T6 - Web Security</DataTable.Cell>
          <DataTable.Cell numeric>B</DataTable.Cell>
          <DataTable.Cell numeric>3</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={{flex: 3}}>T6 - PHP Framework & REST API</DataTable.Cell>
          <DataTable.Cell numeric>A</DataTable.Cell>
          <DataTable.Cell numeric>3</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={ styles.rowVariante}>
          <DataTable.Cell style={{flex: 3}}>T6 - JS Framework</DataTable.Cell>
          <DataTable.Cell numeric>A</DataTable.Cell>
          <DataTable.Cell numeric>3</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={{flex: 3}}>T6 - AppDev - Epicture</DataTable.Cell>
          <DataTable.Cell numeric>A</DataTable.Cell>
          <DataTable.Cell numeric>3</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={ styles.rowVariante}>
          <DataTable.Cell style={{flex: 3}}>T6 - DevOps</DataTable.Cell>
          <DataTable.Cell numeric>-</DataTable.Cell>
          <DataTable.Cell numeric>3</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={{flex: 3}}>T6 - AppDev - Epicture</DataTable.Cell>
          <DataTable.Cell numeric>A</DataTable.Cell>
          <DataTable.Cell numeric>3</DataTable.Cell>
        </DataTable.Row>
</ScrollView>
      </DataTable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height:350
  },
  row: {
    paddingTop: 20,
    paddingBottom: 20,

  },
  rowVariante: {
    backgroundColor : '#FBFBFC',
    paddingTop: 20,
    paddingBottom: 20,

  },
});