import { useAuth } from '@/context/AuthContext';
import { Button, Text, View } from 'react-native';

export default function ExploreScreen() {
    const { signOut } = useAuth();

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-2xl font-bold mb-5 text-textPrimary">Client Explore</Text>
            <Button title="Sign Out" onPress={signOut} color="#E31C5F" />
        </View>
    );
}
