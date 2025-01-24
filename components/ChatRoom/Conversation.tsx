import { FlatList, View, TouchableOpacity } from 'react-native';
import { ChatBubble } from './ChatBubble';
import { useMemo, useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/build/Ionicons';

import { useScrollToBottom } from '~/lib/hooks/useScrollToBottom';

const mockMessages = [
  {
    userId: '9843c195-0f6e-4f2e-8b6a-3b1b0f20ecac',
    message:
      'Administratio suggero acquiro quas adopto dolorum. Bellum aspicio crapula demitto congregatio attonbitus. Antiquus cruciamentum ascisco desidero tunc quibusdam totam amplus repellat aspernatur.',
    isUser: false,
    timestamp: '2025-01-23T15:43:51.612Z',
  },
  {
    userId: '06bfe2bc-358a-4b12-befb-99f3b76a814c',
    message:
      'Quo tego spiculum unde calculus voluptatem caput trans. Vaco tondeo tamquam vaco. Absorbeo vulnero cursim amicitia vestrum summisse.',
    isUser: true,
    timestamp: '2025-01-24T08:10:01.300Z',
  },
  {
    userId: '6f878ddd-e0bf-4e6e-9f9e-663f481a0edd',
    message:
      'Amplus alter utilis cervus torrens ustilo copiose. Amoveo perspiciatis odio vestigium damnatio appositus tempore audeo acidus. Delicate depulso vobis temeritas.',
    isUser: true,
    timestamp: '2025-01-24T00:29:51.133Z',
  },
  {
    userId: 'd31367fd-b5e2-4bf5-8989-e92debc8a2f9',
    message:
      'Suppellex delinquo cura tibi thesaurus tergum tollo thalassinus arto. Utique adsidue desparatus confero aeneus curso cetera dedico. Aspicio autus vehemens comptus adulescens mollitia abduco conventus aliquam degero.',
    isUser: true,
    timestamp: '2025-01-23T15:59:43.346Z',
  },
  {
    userId: 'e00435db-a752-40ce-825f-d723764852e3',
    message:
      'Abutor cogo statua vinum animus. Vito aggredior accendo subnecto valens aeneus caelum amplitudo. Avarus depereo arcesso.',
    isUser: true,
    timestamp: '2025-01-24T07:23:10.482Z',
  },
  {
    userId: 'fe6a2afe-626b-412e-b3d4-f0a511df3cd4',
    message:
      'Civis antiquus tibi cumque contigo sortitus. Subnecto articulus defaeco sumptus delego verbum deleniti derelinquo theologus suppellex. Quas atavus desidero infit pectus crudelis.',
    isUser: false,
    timestamp: '2025-01-23T21:46:07.078Z',
  },
  {
    userId: '6304dae1-c5b9-47c5-9c4d-c6aba2b6361b',
    message:
      'Patria argentum sursum appositus cognomen pauci. Audio tenuis verto. Sollers astrum adiuvo spero ago stultus.',
    isUser: true,
    timestamp: '2025-01-24T06:51:45.700Z',
    imageUrl: 'https://loremflickr.com/377/2817?lock=7952897993557325',
  },
  {
    userId: '2c235c4e-19a8-42de-86ba-db2dca091905',
    message:
      'Basium depromo correptius illo tactus suscipit tollo taceo utrimque. Carpo cui vinum clementia demergo. Theca nisi solitudo suffoco avaritia rem.',
    isUser: true,
    timestamp: '2025-01-24T08:22:44.024Z',
    imageUrl: 'https://loremflickr.com/207/604?lock=4307847980677638',
  },
  {
    userId: 'efc5cd63-b740-4036-8d66-538537bf4bdc',
    message:
      'Acerbitas denuo enim validus pecto corona ascit termes cruentus suadeo. Capio cometes desparatus pauper nulla tabernus aurum congregatio itaque. Supplanto tardus canto volutabrum campana conspergo.',
    isUser: true,
    timestamp: '2025-01-23T20:29:23.370Z',
  },
  {
    userId: '85f7c7b9-63c0-4d5f-a67d-9eb7509eb390',
    message:
      'Acquiro aureus architecto arto decipio vesco aliquam derideo defessus vere. Depopulo traho cito vulgo curvo bestia depulso. Uberrime inventore laborum angustus civitas charisma aurum velut candidus.',
    isUser: false,
    timestamp: '2025-01-23T14:34:34.807Z',
    imageUrl: 'https://loremflickr.com/2425/2620?lock=7614149007492012',
  },
  {
    userId: '27699f09-759c-4550-9cc8-0564ffbadacb',
    message:
      'Suggero tamisium totidem. Ulciscor vilis in cognomen dedecor. Volaticus delectus comburo tripudio absum distinctio.',
    isUser: false,
    timestamp: '2025-01-23T21:21:06.246Z',
  },
  {
    userId: 'b7d7f02c-5cfc-4716-92f9-e6faded3661a',
    message:
      'Praesentium comparo cunabula utique demoror laborum. Desipio turbo sortitus agnosco. Cupiditas sum virga sordeo ullus.',
    isUser: false,
    timestamp: '2025-01-24T09:50:57.623Z',
  },
  {
    userId: 'cd0a4917-6809-4f21-b53c-4f0c294ca402',
    message:
      'Omnis inventore accusamus. Suppellex creta delinquo. Libero labore aperio candidus thermae sub adicio.',
    isUser: false,
    timestamp: '2025-01-24T09:35:51.769Z',
  },
  {
    userId: '341da6a4-8a0c-4bf7-b164-1a6a25b519a6',
    message:
      'Contego concido illum voco thorax claro. Voluntarius venia conforto tendo. Corporis tero auxilium statim iure solio sperno ut ubi eius.',
    isUser: true,
    timestamp: '2025-01-24T01:20:52.853Z',
    imageUrl: 'https://picsum.photos/seed/CH0X6YpBrJ/3028/3733',
  },
  {
    userId: '7ea2860f-4262-4934-b9f4-06d085e036ce',
    message: 'Aegrotatio torrens demo. Adulatio dolor celer. Carbo subnecto valens corporis vae.',
    isUser: true,
    timestamp: '2025-01-24T03:55:54.285Z',
  },
  {
    userId: 'c607578b-7f91-4f5f-b704-a0e3411068a8',
    message:
      'Delectatio delectatio contabesco peior tepesco damno. Terra terreo arcus currus. Carus ager suadeo apud.',
    isUser: false,
    timestamp: '2025-01-23T19:51:35.154Z',
  },
  {
    userId: '616701a4-12f2-46df-9c34-340fce734899',
    message:
      'Cognatus totus blandior. Benevolentia spoliatio chirographum vilis aveho averto. Decet terra vox succurro admiratio.',
    isUser: true,
    timestamp: '2025-01-23T16:19:36.174Z',
  },
  {
    userId: 'd5ad908c-7089-471b-a650-b23a5d841ed9',
    message:
      'Surculus deleo usitas volutabrum adicio odio vorago voluptatem. Considero spero arca sit arbitro basium sustineo sumptus videlicet. Barba basium pax alter.',
    isUser: false,
    timestamp: '2025-01-24T00:16:13.427Z',
  },
  {
    userId: '7b17ad3a-3818-479c-8ad9-76b342f7363d',
    message:
      'Vita surgo conservo despecto deleo quibusdam antea spiritus vestigium aliquid. Ager vilicus officiis ante adiuvo vero acidus clementia cruentus. Fuga cenaculum timor tergum absque absens.',
    isUser: false,
    timestamp: '2025-01-23T21:09:35.683Z',
  },
  {
    userId: '57e30c8a-3c05-494d-ba57-4c857d797190',
    message:
      'Vero alius dens corona porro. Texo succedo textor agnitio adsuesco aetas crepusculum beatae. Denique adimpleo canonicus assentator vitae contego voro attonbitus.',
    isUser: false,
    timestamp: '2025-01-23T19:42:46.789Z',
  },
];

const useListItemIsVisible = ({
  visiblePercentage = 100,
  minimumViewTime = 100,
}: {
  visiblePercentage: number;
  minimumViewTime: number;
}) => {
  const viewabilityConfig = useMemo(
    () => ({
      viewAreaCoveragePercentThreshold: visiblePercentage,
      minimumViewTime: minimumViewTime,
    }),
    []
  );
  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<any> }) => {
    const visibleIds = viewableItems.map((item) => item.item.userId + item.item.timestamp);
    setVisibleIds(visibleIds);
  }).current;

  return { visibleIds, onViewableItemsChanged, viewabilityConfig };
};

export const Conversation = () => {
  const messages = useMemo(() => mockMessages, [mockMessages]);
  const { listRef, isAtBottom, onScrollListener, scrollToBottom } = useScrollToBottom();
  const { visibleIds, onViewableItemsChanged, viewabilityConfig } = useListItemIsVisible({
    visiblePercentage: 100,
    minimumViewTime: 100,
  });

  return (
    <View className="relative flex-1">
      <FlatList
        ref={listRef}
        onScroll={onScrollListener}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        data={messages}
        renderItem={({ item }) => (
          <ChatBubble
            key={item.userId + item.timestamp}
            message={item.message}
            isUser={item.isUser}
            imageUrl={item.imageUrl}
            sendAtDate={new Date(item.timestamp)}
            isVisible={visibleIds.includes(item.userId + item.timestamp)}
          />
        )}
      />
      {!isAtBottom && (
        <TouchableOpacity
          onPress={scrollToBottom}
          className="absolute bottom-4 right-4 rounded-full bg-blue-500 p-1">
          <Ionicons name="chevron-down" size={12} color={'white'} />
        </TouchableOpacity>
      )}
    </View>
  );
};
