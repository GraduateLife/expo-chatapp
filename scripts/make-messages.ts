import { MessageMocker } from '~/.data/MessageMocker';
import { generateMockData } from '~/.data/runner';

generateMockData(() => MessageMocker.createMultipleMessages(20), 'messages');
