import { FlatList, View, TouchableOpacity, Text, Pressable, Keyboard } from 'react-native';
import { ChatBubble } from './ChatBubble';
import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useScrollToBottom } from '~/lib/hooks/useScrollToBottom';
import { formatDay, isSystemMessage } from '../ui/utils';
import { useListItemIsVisible } from '~/lib/hooks/useListItemIsVisible';
import { useInputStore } from '~/store/inputStore';
//TODO: ugly code
const mockMessages = [
  {
    messageId: '123',
    userId: '$system',
    message: '123456',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-24T08:45:30.423Z',
  },
  {
    messageId: '29bacc6a-840a-48bc-873b-bc90ca7f73b1',
    userId: '444cf7cf-2b9c-4efb-99d3-1256449a74fa',
    message:
      'Votum concido adulatio caecus. Vos adopto dolores. Reprehenderit textor traho abutor appono patior.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-24T08:45:30.423Z',
  },
  {
    messageId: 'dfd3c411-7665-43f6-8191-28cfe1fd7268',
    userId: '1cee15ee-5e79-454d-94e4-1f569729b455',
    message:
      'Adhaero tot decumbo dapifer surgo vester claustrum conitor vulpes. Desparatus abeo turba magni. Consectetur summisse vomer nesciunt caries admiratio minus tenax atque debitis.',
    isUser: true,
    isViewed: false,
    timestamp: '2025-01-25T00:06:08.049Z',
    imageUrl: 'https://loremflickr.com/3424/3832?lock=942570571021449',
  },
  {
    messageId: '0766f16c-6de8-470f-ab03-ab96d6252aaa',
    userId: 'b1114e96-cfba-4bf0-afec-687b8c189867',
    message:
      'Anser astrum verbum eligendi administratio. Censura asporto solum. Chirographum spes agnitio tantum tunc assumenda dedecor cinis.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-25T00:28:52.319Z',
  },
  {
    messageId: '47e5917c-63df-4c2c-80b9-77074567ff89',
    userId: '4398e76b-5778-4e3b-a526-6820a9c184dc',
    message:
      'Conatus amissio video cursim canonicus adulescens blanditiis. Attollo cibo cavus auctor at alo dolores sapiente vilitas. Aveho tollo alius carus teneo conforto.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-24T13:52:22.199Z',
  },
  {
    messageId: 'e937b0b1-4541-4f5e-861f-b073d007ada4',
    userId: '537640c3-6fd2-4771-9dce-58eb56e82f13',
    message:
      'Vorago vallum adulescens bene triumphus cupio cunabula. Ocer expedita thesaurus absens tergiversatio ascisco ademptio. Curiositas terminatio adiuvo abeo cubicularis ultra denique.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-25T04:26:34.583Z',
    imageUrl: 'https://loremflickr.com/3159/1949?lock=3840849955991567',
  },
  {
    messageId: '100ab8d6-9f54-48b2-8e55-1139567fc4ce',
    userId: '86020067-6990-406f-bb7b-2cfab7ae2630',
    message:
      'Dolorum termes quaerat vulariter cunabula deduco avaritia. Theatrum benigne consequuntur quibusdam verus. Addo abutor capillus decipio nulla vox copia agnitio crapula.',
    isUser: true,
    isViewed: false,
    timestamp: '2025-01-24T16:10:07.345Z',
  },
  {
    messageId: '73f248c6-3afc-458c-854c-685d852e5e99',
    userId: 'e3e3fab2-aa6e-44ce-8e57-8328d55c8c84',
    message:
      'Cotidie cunae assumenda vomer coepi soleo vel maxime deludo. Summa colligo administratio coniecto consectetur autem urbanus. Omnis caterva deleniti possimus armarium tener cubo.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-25T05:03:27.413Z',
  },
  {
    messageId: 'b7f1a3de-02f5-488d-8b86-370ab39bb3b8',
    userId: '904f8751-d29e-48a0-b8b1-1d2144df6686',
    message:
      'Thorax deleo similique sit suscipit tendo audio ubi. Alo crepusculum delego strenuus. Ocer culpa capillus.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-25T03:43:26.610Z',
    imageUrl: 'https://picsum.photos/seed/Go3x4lFy/2334/1502',
  },
  {
    messageId: '9f366334-348a-49a6-ac4a-8bfde159d27b',
    userId: 'de2bf42d-582c-4482-b22a-26e365cbe960',
    message:
      'Viriliter soleo conventus adinventitias. Copiose bellum antea. Contigo vito comburo defaeco ager cupiditas ciminatio.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-24T11:25:15.554Z',
  },
  {
    messageId: '07c00bdf-736e-4ecb-8e8c-c43146cc6c87',
    userId: '4476abc6-e746-4f61-9910-fc1abf5be0d0',
    message:
      'Veritas absconditus sollers ademptio clam sono crustulum ars. Territo verbera bibo uterque soluta somniculosus sum. Cura dignissimos terebro aequus adulescens.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-24T13:16:13.883Z',
    imageUrl: 'https://picsum.photos/seed/39JyUmSlw/2566/782',
  },
  {
    messageId: '78838cef-69c2-4e24-87d3-30fcd955ad96',
    userId: '08fcc3a4-6d42-490a-80df-9482f5e63379',
    message:
      'Ver angulus termes distinctio. Tollo adeo addo voluptate tres vehemens vinitor caveo adamo clibanus. Pectus cupio timidus accusator argentum pel corroboro similique contabesco utrum.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-24T08:47:37.036Z',
    imageUrl: 'https://loremflickr.com/2144/3418?lock=1583720674124591',
  },
  {
    messageId: '3bede3eb-8417-4a86-989f-2a044c549ff9',
    userId: '91606456-00de-4717-8a42-9d39e8a4e816',
    message:
      'Ara sollicito officiis argumentum. Admiratio repellat sordeo aliqua. Vos repellendus vesica concido trans contra solitudo.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-25T02:43:17.088Z',
    imageUrl: 'https://loremflickr.com/100/3732?lock=2203678176694225',
  },
  {
    messageId: '4aeef164-7142-4b2b-8381-888c3b57a83f',
    userId: 'aa146b1f-ffb4-47eb-9b24-d4b7c0b399f9',
    message:
      'Dolor antepono confido amet bestia labore clarus templum sint. Adipisci volaticus damno verecundia. Summa acidus cruciamentum contego temperantia.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-24T09:18:33.358Z',
  },
  {
    messageId: 'f49bf37a-e7df-4d70-a51d-f9bbd65fb7b3',
    userId: 'edfccca9-18d1-42fc-abe2-1639c391385b',
    message:
      'Carus attollo truculenter spes aeneus spiritus cariosus cresco. Venia bestia summa caelum. Aegre beatae aliquam saepe solitudo.',
    isUser: true,
    isViewed: false,
    timestamp: '2025-01-24T06:25:07.041Z',
  },
  {
    messageId: '50138707-e7f4-4651-9645-41cffd1d2256',
    userId: '102df95f-3d65-4f52-99b3-5d84176f6b76',
    message:
      'Charisma depulso tamisium eos solio cilicium. Aduro in defaeco valeo curso culpo delectatio. Advoco advoco earum ventito atqui arbitro amplitudo tot autus.',
    isUser: true,
    isViewed: false,
    timestamp: '2025-01-24T07:22:38.210Z',
  },
  {
    messageId: 'a3d2707d-4386-4ec7-a844-402f38f16aa5',
    userId: '5d20b26e-5af2-401d-8289-9c7c86051150',
    message:
      'Bibo patruus averto tamquam adsum tepesco claustrum. Cupressus usque ratione ait virtus vilicus urbanus suspendo collum. Admiratio textor volva auctus colligo.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-25T03:50:33.502Z',
  },
  {
    messageId: '2555954f-a214-4958-8f72-20faa5f6937f',
    userId: '1a5dcb2f-3aae-4ce6-a2f2-d8ef586efbc3',
    message:
      'Patruus tantillus certus convoco thema. Terra compello numquam. Defungo basium dens maiores rem usitas uterque adopto acer.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-24T08:14:29.345Z',
  },
  {
    messageId: '955a7755-2cd6-4d65-b6e1-e03e42bc70ba',
    userId: 'cc1ccd9d-cf4d-49e6-b176-31b3b4f0aa97',
    message:
      'Constans uberrime conculco laudantium. Delego aggero cervus caveo creator. Amiculum decerno unde adipisci vereor.',
    isUser: true,
    isViewed: false,
    timestamp: '2025-01-24T06:30:44.184Z',
    imageUrl: 'https://loremflickr.com/2223/3676?lock=946832043126570',
  },
  {
    messageId: 'dd9c2541-656d-484a-946b-9c99e8dccdd9',
    userId: '18f02472-513e-4d22-bf08-b14cf4f72f58',
    message:
      'Utor bonus supellex. Cupressus totidem vespillo corporis astrum. Ademptio blandior tantillus.',
    isUser: false,
    isViewed: false,
    timestamp: '2025-01-24T15:50:45.531Z',
  },
  {
    messageId: '9975d509-48a4-4ad1-8143-1187968b8ed9',
    userId: '7ff7e938-60c1-4c05-a928-c222e0c98ccb',
    message:
      'Fuga validus decens peccatus tamquam solio cavus ustulo aeneus. Appello comminor carus vilitas amicitia conscendo consequatur uredo virga. Nulla eius tenetur ait.',
    isUser: false,
    isViewed: true,
    timestamp: '2025-01-25T04:05:24.854Z',
  },
];

export const Conversation = () => {
  const messages = useMemo(() => mockMessages, [mockMessages]);
  const { listRef, isAtBottom, onScrollListener, scrollToBottom } = useScrollToBottom();
  const { visibleIds, onViewableItemsChanged, viewabilityConfig } = useListItemIsVisible({
    keyExtractorField: 'messageId',
    visiblePercentage: 100,
  });
  const { isInputFocused, setInputFocused } = useInputStore();
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  // Add gesture handler for scroll
  const handleScroll = useCallback(
    (event: any) => {
      const currentY = event.nativeEvent.contentOffset.y;
      const currentTime = Date.now();
      const deltaY = currentY - lastScrollY.current;
      const deltaTime = currentTime - lastScrollTime.current;

      // Calculate velocity (pixels per millisecond)
      const velocity = deltaTime > 0 ? deltaY / deltaTime : 0;
      // If scrolling up (positive velocity) and input is focused, unfocus it
      // Adjust the threshold value (0.5) as needed
      if (velocity < -0.5 && isInputFocused) {
        setInputFocused(false);
        Keyboard.dismiss();
      }

      lastScrollY.current = currentY;
      lastScrollTime.current = currentTime;
    },
    [isInputFocused, setInputFocused]
  );

  useEffect(() => {
    if (isInputFocused) {
      scrollToBottom();
    }
  }, [isInputFocused, scrollToBottom]);

  // Clean up throttle on unmount

  const scrollToMessageId = useCallback(
    (messageId: string) => {
      const messageIndex = messages.findIndex((msg) => msg.messageId === messageId);
      if (messageIndex !== -1) {
        listRef.current?.scrollToIndex({
          index: messageIndex,
          animated: true,
          viewPosition: 0.5,
          viewOffset: 0,
        });
      }
    },
    [messages]
  );

  const onScrollToIndexFailed = useCallback(
    (info: { index: number; highestMeasuredFrameIndex: number; averageItemLength: number }) => {
      listRef.current?.scrollToOffset({
        offset: info.averageItemLength * info.index,
        animated: false,
      });

      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollToIndex({
            index: info.index,
            animated: true,
            viewPosition: 0.5,
          });
        }
      }, 100);
    },
    []
  );

  return (
    <View>
      <FlatList
        ref={listRef}
        onScroll={(e) => {
          onScrollListener(e);
          handleScroll(e);
        }}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        data={messages}
        onScrollToIndexFailed={onScrollToIndexFailed}
        renderItem={({ item, index }) => (
          <>
            {isSystemMessage(item) ? (
              <SystemMessage message={item.message} />
            ) : (
              <ChatBubble
                key={item.messageId}
                messageId={item.messageId}
                message={item.message}
                isUser={item.isUser}
                imageUrl={item.imageUrl}
                sendAtDate={new Date(item.timestamp)}
                isViewed={item.isViewed}
                isVisible={visibleIds.includes(item.messageId)}
              />
            )}
          </>
        )}
      />

      {!isAtBottom ? (
        <TouchableOpacity
          onPress={scrollToBottom}
          className="absolute bottom-4 right-4 rounded-full bg-white/80 p-2">
          <Ionicons name="chevron-down" size={22} color={'gray'} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => scrollToMessageId('123')}
          className="absolute bottom-4 right-4 rounded-full bg-white/80 p-2">
          <Ionicons name="chevron-up" size={22} color={'gray'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const SystemMessage = ({ message }: { message: string }) => {
  return (
    <View>
      <Text className="text-center text-gray-500">{message}</Text>
    </View>
  );
};

{
  /* <TouchableOpacity
onPress={() => scrollToMessage('9975d509-48a4-4ad1-8143-1187968b8ed9')}
className="absolute bottom-12 right-4 rounded-full bg-white/80 p-2">
<Ionicons name="play" size={22} color={'gray'} />
</TouchableOpacity> */
}
