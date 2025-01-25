import { useMemo, useState, useRef } from 'react';

export const useListItemIsVisible = ({
  keyExtractorField,
  visiblePercentage,
}: {
  keyExtractorField: string;
  visiblePercentage: number;
}) => {
  const viewabilityConfig = useMemo(
    () => ({
      viewAreaCoveragePercentThreshold: visiblePercentage,
      minimumViewTime: 100,
    }),
    []
  );
  const [visibleIds, setVisibleIds] = useState<string[]>([]);
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<any> }) => {
    const visibleIds = viewableItems.map((item) => item.item[keyExtractorField]);
    setVisibleIds((prev) => [...prev, ...visibleIds]);
  }).current;

  return { visibleIds, onViewableItemsChanged, viewabilityConfig };
};
