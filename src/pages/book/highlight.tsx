import React from 'react';

import { searchInputSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';

interface IHighlight {
  text: string;
  query: string;
}
export const Higlight = ({ text, query }: IHighlight) => {
  const hightLightWords = query.split(' ').map((el) => el.toLowerCase());

  const result = query.replace(/\s/g, '').length ? (
    text.split(' ').map((el, i) => {
      if (hightLightWords.includes(el.toLowerCase())) {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <mark key={i + el} data-test-id='highlight-matches'>
            {' '}
            {el}{' '}
          </mark>
        );
      }

      // eslint-disable-next-line react/no-array-index-key
      return <span key={i}> {el} </span>;
    })
  ) : (
    <span>{text}</span>
  );

  return <React.Fragment> {result} </React.Fragment>;
};
