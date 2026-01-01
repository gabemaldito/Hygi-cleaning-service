import { useAuth } from '@/context/AuthContext';
import Colors from '@/theme/colors';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
    const { signIn } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hygi Login</Text>
            <View style={styles.buttonContainer}>
                <Button title="Login as Client" onPress={() => signIn('dummy-token', 'client')} color={Colors.primary} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Login as Pro" onPress={() => signIn('dummy-token', 'professional')} color={Colors.textSecondary} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.textPrimary,
    },
    buttonContainer: {
        marginVertical: 10,
        width: '80%',
    }
});
