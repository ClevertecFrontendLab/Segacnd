import React from 'react';

import { SearchInputSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';

interface IHighlight {
  text: string;
}
export const Higlight = ({ text }: IHighlight) => {
  const { query } = useAppSelector(SearchInputSelector);
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  const result =
  // eslint-disable-next-line react/no-array-index-key
    query === '' ? <span>{text}</span> : parts.map((el, i) => (regex.test(el) ? <mark key={i+el} data-test-id='highlight-matches'>{el}</mark> : <span key={i}>{el}</span>));

  return <React.Fragment> {result} </React.Fragment>;
};
