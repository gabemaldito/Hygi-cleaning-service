import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import Colors from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export default function BookServiceScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  // Fix for potential array
  const serviceId = Array.isArray(params.serviceId) ? params.serviceId[0] : params.serviceId;

  const { services, addBooking } = useData();
  const { userToken } = useAuth();

  const service = services.find(s => s.id === serviceId);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');

  // Payment State
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!service) {
    return (
      <View style={styles.container}>
        <Text>Serviço não encontrado.</Text>
      </View>
    );
  }

  const handleBooking = async () => {
    if (!date || !time || !address || !cardNumber || !expiry || !cvv || !cardName) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Basic Validation simulation
    if (cardNumber.length < 16) {
        Alert.alert('Erro', 'Número de cartão inválido (simulação: use 16 dígitos).');
        return;
    }

    setIsSubmitting(true);

    try {
      await addBooking({
        serviceId: service.id,
        clientId: userToken || 'guest',
        date,
        time,
        address,
        totalAmount: service.price,
      });

      Alert.alert('Sucesso!', 'Seu agendamento foi realizado com sucesso.', [
        {
          text: 'OK',
          onPress: () => {
            router.dismiss(); // Close modal
            router.replace('/(client)/bookings'); // Go to bookings
          }
        }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao agendar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* Service Summary */}
        <View style={styles.summaryContainer}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.servicePrice}>R$ {service.price.toFixed(2)}</Text>
            <Text style={styles.serviceDuration}>{service.duration} horas de duração</Text>
        </View>

        {/* Schedule Section */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Agendamento</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Data (DD/MM/AAAA)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: 25/10/2023"
                    value={date}
                    onChangeText={setDate}
                    keyboardType="numbers-and-punctuation"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: 14:00"
                    value={time}
                    onChangeText={setTime}
                    keyboardType="numbers-and-punctuation"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Endereço Completo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Rua, Número, Bairro, Complemento"
                    value={address}
                    onChangeText={setAddress}
                />
            </View>
        </View>

        {/* Payment Section */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pagamento</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Número do Cartão</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    keyboardType="number-pad"
                    maxLength={19}
                />
            </View>

            <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>Validade</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="MM/AA"
                        value={expiry}
                        onChangeText={setExpiry}
                        maxLength={5}
                    />
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>CVV</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="123"
                        value={cvv}
                        onChangeText={setCvv}
                        keyboardType="number-pad"
                        maxLength={4}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome no Cartão</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Como impresso no cartão"
                    value={cardName}
                    onChangeText={setCardName}
                    autoCapitalize="characters"
                />
            </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total a pagar:</Text>
                <Text style={styles.totalValue}>R$ {service.price.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
                style={[styles.confirmButton, isSubmitting && styles.disabledButton]}
                onPress={handleBooking}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={styles.confirmButtonText}>Confirmar e Pagar</Text>
                )}
            </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.m,
    backgroundColor: Colors.background,
    paddingBottom: 40,
  },
  summaryContainer: {
    backgroundColor: Colors.surface,
    padding: spacing.m,
    borderRadius: spacing.m,
    marginBottom: spacing.l,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  serviceTitle: {
    fontSize: typography.size.l,
    fontFamily: typography.family.bold,
    color: Colors.textPrimary,
  },
  servicePrice: {
    fontSize: typography.size.xl,
    fontFamily: typography.family.bold,
    color: Colors.primary,
    marginTop: 4,
  },
  serviceDuration: {
    fontSize: typography.size.s,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  section: {
    marginBottom: spacing.l,
  },
  sectionTitle: {
    fontSize: typography.size.m,
    fontFamily: typography.family.bold,
    color: Colors.textPrimary,
    marginBottom: spacing.m,
  },
  inputGroup: {
    marginBottom: spacing.m,
  },
  label: {
    fontSize: typography.size.s,
    color: Colors.textSecondary,
    marginBottom: 4,
    fontFamily: typography.family.medium,
  },
  input: {
    backgroundColor: Colors.surface,
    height: 48,
    borderRadius: spacing.s,
    paddingHorizontal: spacing.m,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: typography.size.m,
    fontFamily: typography.family.regular,
  },
  row: {
    flexDirection: 'row',
  },
  footer: {
    marginTop: spacing.m,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  totalLabel: {
    fontSize: typography.size.m,
    fontFamily: typography.family.medium,
    color: Colors.textPrimary,
  },
  totalValue: {
    fontSize: typography.size.xl,
    fontFamily: typography.family.bold,
    color: Colors.primary,
  },
  confirmButton: {
    backgroundColor: Colors.success,
    height: 56,
    borderRadius: spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.7,
  },
  confirmButtonText: {
    color: Colors.white,
    fontFamily: typography.family.bold,
    fontSize: typography.size.m,
  },
});
