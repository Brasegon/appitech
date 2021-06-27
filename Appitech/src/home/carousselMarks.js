import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function Mark() {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const data = [
    {
      name: 'T6 - AppDev Epicture',
      grade: 'A',
      credit: '3',
    },
    {
      name: 'T6 - E-Commerce',
      grade: 'A',
      credit: '3',
    },
    {
      name: 'T6 - Devops',
      grade: 'A',
      credit: '3',
    },
    {
      name: 'T6 - NSA',
      grade: 'A',
      credit: '3',
    },
    {
      name: 'T6 - End Year project',
      grade: 'A',
      credit: '3',
    },
    {
      name: 'T6 - Binary Security',
      grade: 'A',
      credit: '3',
    },
    {
      name: 'T6 - Securité web',
      grade: 'A',
      credit: '3',
    },
    {
      name: 'T6 - Java',
      grade: 'A',
      credit: '3',
    },
    {
      name: 'T6 - Web Pool',
      grade: 'A',
      credit: '3',
    },
    {
      name: 'T6 - Web Pool',
      grade: 'A',
      credit: '3',
    },
    {
      name: 'T6 - Web Pool',
      grade: 'A',
      credit: '3',
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
                <DataTable.Cell style={{ flex: 3 }}>{row.name}</DataTable.Cell>
                <DataTable.Cell numeric>{row.grade}</DataTable.Cell>
                <DataTable.Cell numeric>{row.credit}</DataTable.Cell>
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