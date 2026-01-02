import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';

import Colors from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Encontre Profissionais',
        description: 'Os melhores profissionais de limpeza para sua casa ou empresa.',
    },
    {
        id: '2',
        title: 'Agendamento Fácil',
        description: 'Agende o serviço que você precisa em poucos cliques.',
    },
    {
        id: '3',
        title: 'Segurança e Qualidade',
        description: 'Profissionais verificados e avaliados para sua tranquilidade.',
    },
];

const Slide = ({ item }: { item: typeof SLIDES[0] }) => {
    return (
        <View style={styles.slide}>
            <View style={styles.placeholderImage} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
};

export default function OnboardingScreen() {
    const { completeOnboarding } = useAuth();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const finishOnboarding = () => {
        completeOnboarding();
        router.replace('/(auth)/login');
    };

    const handleNext = () => {
        if (currentSlideIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentSlideIndex + 1 });
        } else {
            finishOnboarding();
        }
    };

    const handleSkip = () => {
        finishOnboarding();
    };

    const updateCurrentSlideIndex = (e: any) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleSkip}>
                    <Text style={styles.skipText}>Pular</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                data={SLIDES}
                contentContainerStyle={styles.flatList}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <Slide item={item} />}
                keyExtractor={(item) => item.id}
            />

            <View style={styles.footer}>
                <View style={styles.indicatorContainer}>
                    {SLIDES.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                currentSlideIndex === index && styles.indicatorActive,
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>
                        {currentSlideIndex === SLIDES.length - 1 ? 'Começar' : 'Próximo'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        padding: spacing.m, 
        alignItems: 'flex-end',
    },
    skipText: {
        color: Colors.textSecondary,
        fontFamily: typography.family.medium,
        fontSize: typography.size.s,
    },
    flatList: {
        // can adjust if needed
    },
    slide: {
        width,
        alignItems: 'center',
        paddingHorizontal: spacing.l,
        paddingTop: spacing.xl,
    },
    placeholderImage: {
        width: width * 0.8,
        height: width * 0.8, // Square aspect ratio for placeholder
        backgroundColor: Colors.surface,
        borderRadius: spacing.m,
        marginBottom: spacing.xl,
    },
    title: {
        fontSize: typography.size.xxl,
        fontFamily: typography.family.bold,
        color: Colors.textPrimary,
        textAlign: 'center',
        marginBottom: spacing.s,
    },
    description: {
        fontSize: typography.size.m,
        fontFamily: typography.family.regular,
        color: Colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: spacing.m,
    },
    footer: {
        height: height * 0.20,
        justifyContent: 'space-between',
        paddingHorizontal: spacing.l,
        paddingBottom: spacing.xl,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: spacing.l,
    },
    indicator: {
        height: 8,
        width: 8,
        backgroundColor: Colors.border,
        marginHorizontal: spacing.xs,
        borderRadius: 4,
    },
    indicatorActive: {
        backgroundColor: Colors.primary,
        width: 24,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: spacing.m,
        borderRadius: spacing.s,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: typography.size.m,
        fontFamily: typography.family.bold,
    },
});