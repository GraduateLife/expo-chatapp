import { ContactMocker } from '~/.data/ContactMocker';
import { generateMockData } from '~/.data/runner';

generateMockData(() => ContactMocker.createFakeContact(), 'contact');
