import React from 'react';

import { searchInputSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';

interface IHighlight {
  text: string;
  query: string | string[];
}

interface IHightlightedData {
  hightlight: boolean;
  text: string;
}
export const Higlight = ({ text, query }: IHighlight) => {
  const hightLightWords = Array.isArray(query) ? query : query.split(' ').map((el) => el.toLowerCase());
  let highlightedData: IHightlightedData[] | [] = [];

  if (!hightLightWords.length) {
    return <span>{text}</span>;
  }

  hightLightWords.reduce((prev: string, h: string, index: number) => {
    const splitString = prev.split(h);

    if (splitString[0].length) {
      highlightedData = [
        ...highlightedData,
        { hightlight: false, text: splitString[0] },
        { hightlight: true, text: h },
      ];
    } else {
      highlightedData = [...highlightedData, { hightlight: true, text: h }];
    }

    if (index === hightLightWords.length - 1 && splitString[1]) {
      highlightedData = [...highlightedData, { hightlight: false, text: splitString[1] }];
    }

    return splitString[1];
  }, text);

  const result = highlightedData.map((data) => {
    if (data.hightlight) {
      return (
        <span className='markText' key={data.text} data-test-id='highlight-matches'>
          {data.text}
        </span>
      );
    }

    return <span key={data.text}>{data.text}</span>;
  });

  return <React.Fragment> {result} </React.Fragment>;
};
