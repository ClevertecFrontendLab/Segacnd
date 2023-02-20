import { useCallback, useRef, useState } from 'react';

import { CloseIcon, OpenIcon, SearchCloseIcon } from '../../assets/icons';
import { useDebounce } from '../../hooks/use-debounce-hook';
import { searchInputActions } from '../../redux/slices/search-input-slice';
import { useAppDispatch } from '../../redux/store';

import styles from './search-bar.module.css';

export const SearchBar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [inFocus, setInFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const changeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(searchInputActions.inputValueCHanger({ query: event.target.value }));
    },
    [dispatch]
  );

  const debouncedChangeHandler = useDebounce({cb: changeHandler, ms: 1000});

  function openMenuIcon() {
    setInFocus(true);
    setOpen((prev) => !prev);
  }

  function inputToggle() {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setOpen(false);
    setInFocus(false);
  }

  return (
    <div className={styles.root}>
      <button
        data-test-id='button-search-open'
        type='button'
        className={`${styles.inputToggler} `}
        onClick={openMenuIcon}
      >
        {OpenIcon}{' '}
      </button>
      <div
        className={
          isOpen ? `${styles.searchInputWrapper} ${styles.open}` : `${styles.searchInputWrapper} ${styles.close}`
        }
      >
        <div className={`${styles.iconWrapper} ${styles.left}`}>{inFocus ? SearchCloseIcon : OpenIcon}</div>

        <input
          data-test-id='input-search'
          ref={inputRef}
          className={styles.searchInput}
          type='text'
          onFocus={() => setInFocus(true)}
          onChange={debouncedChangeHandler}
          placeholder='Поиск книги или автора...'
        />
        {inFocus ? (
          <div
            data-test-id='button-search-close'
            onClick={inputToggle}
            aria-hidden='true'
            className={`${styles.iconWrapper} ${styles.right}`}
          >
            {CloseIcon}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
