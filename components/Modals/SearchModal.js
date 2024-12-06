/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import styles from './SearchModal.module.css';

const SearchModal = ({ isOpen, onRequestClose }) => {
  const [query, setQuery] = useState(''); // State for the search input

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);
    onRequestClose(); // Optional: Close modal after searching
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onRequestClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalInner}>
          <form onSubmit={handleSearch} className={styles.searchBar}>
            <input
              type="text"
              placeholder="Type in your search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <img src="/images/search.png" alt="search icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
