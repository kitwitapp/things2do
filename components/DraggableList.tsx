import React from 'react'
import { Text, View } from './Themed'
import { FlatList } from 'react-native'

export default function DraggableList({ tasks }) {  
  return (
    <View>
      <FlatList
        keyExtractor={(item, _idx) => item['task']}
        data={tasks}
        renderItem={({item}) => <Text>{item['task']}</Text>}
      />
    </View>
  )
}
