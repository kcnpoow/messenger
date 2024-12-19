import { ReactNode } from 'react';
import { View, FlexStyle, ViewStyle } from 'react-native';

type RowProps = {
  children?: ReactNode;
} & FlexStyle;

export const Row = ({ children, ...flexProps }: RowProps) => {
  return (
    <View style={[{ flexDirection: 'row' }, flexProps as ViewStyle]}>
      {children}
    </View>
  );
};
