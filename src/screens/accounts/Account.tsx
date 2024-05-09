import { View, Text } from 'react-native'
import React from 'react'
import { colors, fonts, hp } from '@/constants'

const Account = () => {
  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.white[50]

    }}>
      <Text
        style={{
          fontFamily: fonts.PoppinsMedium,
          fontSize: hp(20),
        }}
      >
        Accounts
      </Text>
    </View>
  )
}

export default Account