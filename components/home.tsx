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

export const Home = () => {
  const [questionIdToFetch, setQuestionIdToFetch] = React.useState(1);
  const [include, setInclude] = React.useState<string[]>([]);
  const [exclude, setExclude] = React.useState<string[]>([]);
  const router = useRouter();

  const discoveryPrompt = useQuery(api.discoveryPrompts.get, {
    questionId: questionIdToFetch,
  });

  if (!discoveryPrompt) {
    return <Loader />;
  }

  const onSelect = (option: Option) => {
    // Update the include and exclude lists based on the selected option
    if (option.include) {
      console.log('option.include', option.include);
      setInclude((prevInclude) => [
        ...prevInclude,
        ...option.include!.filter((item) => !prevInclude.includes(item)),
      ]);
    }

    if (option.exclude) {
      setExclude((prevExclude) => [
        ...prevExclude,
        ...option.exclude!.filter((item) => !prevExclude.includes(item)),
      ]);
    }

    if (questionIdToFetch === 8 && option.value === 'findDestination') {
      // Construct the query for the Google Places API with accumulated includes and excludes
      const includes = include.join(',');
      const excludes = exclude.join(',');
      let result = `/restaurants`;
      if (includes) {
        result += `?include=${includes}`;
      }
      if (excludes) {
        result += `${includes ? '&' : '?'}exclude=${excludes}`;
      }

      // Navigate to the restaurants page with the query parameters
      router.push(result);
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
