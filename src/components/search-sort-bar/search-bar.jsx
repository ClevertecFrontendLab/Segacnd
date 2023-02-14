import { useRef, useState } from 'react';

import { CloseIcon, OpenIcon, SearchCloseIcon } from '../../assets/icons';

import styles from './search-bar.module.css';

export const SearchBar = () => {
  const [isOpen, setOpen] = useState(false);
  const [inFocus, setInFocus] = useState(false);
  const inputRef = useRef();

  function openMenuIcon() {
    setInFocus(true);
    setOpen((prev) => !prev);
  }

  function inputToggle() {
    inputRef.current.value = '';
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
