import React from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FormInputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  error?: string;
}

export function FormInput({
  label,
  icon,
  rightIcon,
  onRightIconPress,
  error,
  ...props
}: FormInputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-sm font-medium text-textPrimary mb-1.5 ml-1">
          {label}
        </Text>
      )}
      <View 
        className={`flex-row items-center bg-surface rounded-2xl px-4 h-14 border ${
          error ? 'border-error' : 'border-transparent'
        }`}
      >
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color="#666666" 
            className="mr-3" 
          />
        )}
        <TextInput
          className="flex-1 text-base text-textPrimary h-full"
          placeholderTextColor="#666666"
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons 
              name={rightIcon} 
              size={20} 
              color="#666666" 
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-xs text-error mt-1 ml-1">{error}</Text>
      )}
    </View>
  );
}
