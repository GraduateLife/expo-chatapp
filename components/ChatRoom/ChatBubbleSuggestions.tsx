import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ChatSuggestionsProps {
  suggestions: string[];
  onSuggestionPress?: (suggestion: string) => void;
}

export const ChatSuggestions = ({
  suggestions,
  onSuggestionPress,
}: ChatSuggestionsProps) => {
  return (
    <View className="mt-2 flex-row flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSuggestionPress?.(suggestion)}
          className="rounded-full bg-gray-100 px-3 py-1.5"
        >
          <Text className="text-sm text-gray-700">{suggestion}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
