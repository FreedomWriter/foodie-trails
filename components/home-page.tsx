'use client';

import React from 'react';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { api } from '../convex/_generated/api';
import { Loader } from './loader';
import { NarrativeOptionsBox } from './narrative-options-box';

export interface Option {
  label: string;
  value: string;
  include?: string[];
  exclude?: string[];
  nextDiscoveryPrompt: number | null;
}

export const HomePage = () => {
  const [questionIdToFetch, setQuestionIdToFetch] = React.useState(2);
  const router = useRouter();

  const discoveryPrompt = useQuery(api.discoveryPrompts.get, {
    questionId: questionIdToFetch,
  });

  if (!discoveryPrompt) {
    return <Loader />;
  }

  const onSelect = (option: Option) => {
    console.log(option);

    if (questionIdToFetch === 28 && option.value === 'findDestination') {
      // Construct the query for the Google Places API
      const includes = option.include ? option.include.join(',') : '';
      const excludes = option.exclude ? option.exclude.join(',') : '';

      // Navigate to the restaurants page with the query parameters
      router.push(`/restaurants?include=${includes}&exclude=${excludes}`);
    } else if (questionIdToFetch === 28) {
      // If the user selects "No, I Need to Review", restart the flow
      setQuestionIdToFetch(2);
    } else {
      // Proceed to the next question
      setQuestionIdToFetch(option.nextDiscoveryPrompt ?? 2);
    }
  };

  return <NarrativeOptionsBox prompt={discoveryPrompt} onSelect={onSelect} />;
};
