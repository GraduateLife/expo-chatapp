import { generateMockData } from '../.data/runner';
import { MessageMocker } from '../.data/MessageMocker';

generateMockData(() => MessageMocker.createMultipleMessages(20), 'messages');
