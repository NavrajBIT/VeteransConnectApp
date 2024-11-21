import { Text } from 'react-native'

export const BoldText = ({ children, fontSize, textAlign }) => {
  return (
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: fontSize ? fontSize : 14,
        textAlign: textAlign ? textAlign : 'center',
      }}
    >
      {children}
    </Text>
  )
}

export const PrimaryText = ({ children, fontSize, textAlign, color }) => {
  return (
    <Text
      style={{
        fontSize: fontSize ? fontSize : 14,
        textAlign: textAlign ? textAlign : 'center',
        color: color ? color : '#000000',
      }}
    >
      {children}
    </Text>
  )
}
