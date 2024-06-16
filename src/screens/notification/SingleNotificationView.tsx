import { View, Text } from 'react-native'
import React from 'react'
import ScreenWithBackButton from '@/components/core/ScreenWithBackButton'

const SingleNotificationView = ({navigation}) => {
  return (
    <ScreenWithBackButton onBackClick={()=>{
        navigation.goBack()
    }}>
        <View>
      <Text>SingleNotificationView</Text>
    </View>
    </ScreenWithBackButton>
  )
}

export default SingleNotificationView