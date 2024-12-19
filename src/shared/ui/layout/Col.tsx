import { ReactNode } from 'react';
import { View, FlexStyle, ViewStyle } from 'react-native';

type ColProps = {
  children?: ReactNode;
} & FlexStyle;

export const Col = ({ children, ...flexProps }: ColProps) => {
  return (
    <View style={[{ flexDirection: 'column' }, flexProps as ViewStyle]}>
      {children}
    </View>
  );
};
