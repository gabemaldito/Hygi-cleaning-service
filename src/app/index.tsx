import Colors from '@/theme/colors';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center" style={{ backgroundColor: Colors.background }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}
