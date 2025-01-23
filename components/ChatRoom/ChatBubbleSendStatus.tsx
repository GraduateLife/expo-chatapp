import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { busy } from '../ui/utils';

type BubbleStatus = 'happening' | 'okay';

const getBubbleStatusColor = (bubbleStatus: BubbleStatus) => {
  switch (bubbleStatus) {
    case 'happening':
      return 'gray';
    case 'okay':
      return 'green';
  }
};

export const ChatBubbleSendStatus = () => {
  const [sendStatus, setSendStatus] = useState<BubbleStatus>('happening');
  const [readStatus, setReadStatus] = useState<BubbleStatus>('happening');
  useEffect(() => {
    const updateSendStatus = async () => {
      setSendStatus('happening');
      await busy(1000);
      setSendStatus('okay');
    };
    const updateReadStatus = async () => {
      setReadStatus('happening');
      await busy(2000);
      setReadStatus('okay');
    };
    updateSendStatus();
    updateReadStatus();
  }, []);
  return (
    <View className="relative">
      <View>
        <Ionicons name="checkmark" size={18} color={getBubbleStatusColor(sendStatus)} />
      </View>
      <View className="absolute -right-[11px]">
        <Ionicons name="checkmark" size={18} color={getBubbleStatusColor(readStatus)} />
      </View>
    </View>
  );
};
