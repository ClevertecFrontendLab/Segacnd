import React from 'react';

import { searchInputSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';

interface IHighlight {
  text: string;
}
export const Higlight = ({ text }: IHighlight) => {
  const { query } = useAppSelector(searchInputSelector);
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  const result =
    query === '' ? (
      <span>{text}</span>
    ) : (
      parts.map((el, i) =>
        regex.test(el) ? (
          // eslint-disable-next-line react/no-array-index-key
          <mark key={i + el} data-test-id='highlight-matches'>
            {el}
          </mark>
        ) : (
          // eslint-disable-next-line react/no-array-index-key
          <span key={i}>{el}</span>
        )
      )
    );

  return <React.Fragment> {result} </React.Fragment>;
};
