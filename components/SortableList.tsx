import React from 'react'
import { Text, View } from './Themed'
import SortableList from 'react-native-sortable-list'
import { StyleSheet } from 'react-native'
import { getDummyData } from '../utils'


function _renderRow(data) {
  return <Row data={data} />
}

function Row ({ data }) {
return (
    <View>
      <Text style={styles.row}>{data.key} {JSON.stringify(data, null, 2)}</Text>
    </View>
  )
}

export default function(props) {
  return (
    <SortableList
      data={getDummyData()}
      renderRow={_renderRow}
    />
  )
}

const styles = StyleSheet.create({
  row: {
    marginTop: 2,
    paddingLeft: 10,
    backgroundColor: '#ddd',
  }
})
