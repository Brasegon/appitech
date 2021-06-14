import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function Mark() {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(2);
  const data = [
    {
      name: 'Frozen Yogurt',
      grade: 'A',
      credit: '6.0',
    },
    {
      name: 'Frozen Yogurt',
      grade: 'A',
      credit: '6.0',
    },
    {
      name: 'TEST',
      grade: 'A',
      credit: '6.0',
    },
  ];
  return (

    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 3 }}>Titre</DataTable.Title>
          <DataTable.Title numeric>Grade</DataTable.Title>
          <DataTable.Title numeric>Crédits</DataTable.Title>
        </DataTable.Header>
        {data
            .slice(
              page * itemsPerPage,
              page * itemsPerPage + itemsPerPage,
            )
            .map(row => (
              <DataTable.Row>
                <DataTable.Cell>{row.name}</DataTable.Cell>
                <DataTable.Cell>{row.grade}</DataTable.Cell>
                <DataTable.Cell>{row.credit}</DataTable.Cell>
              </DataTable.Row>
            ))}
            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(data.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={page}
              numberOfItemsPerPage={data.length}
              setItemsPerPage={setItemsPerPage}
            />
      </DataTable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 350
  },
  row: {
    paddingTop: 20,
    paddingBottom: 20,

  },
  rowVariante: {
    backgroundColor: '#FBFBFC',
    paddingTop: 20,
    paddingBottom: 20,

  },
});