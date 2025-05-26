import { useState, useEffect } from 'react';
import styles from './SearchPanel.module.css';

const SearchPanel = ({ onSearch, onClear }) => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    department: '',
    position: '',
    status: ''
  });

  const [activeFilters, setActiveFilters] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filters = Object.entries(searchParams)
      .filter(([_, value]) => value.trim() !== '')
      .map(([key, value]) => ({
        key,
        value,
        label: `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
      }));
    
    setActiveFilters(filters);
    onSearch(searchParams);
  };

  const handleClear = () => {
    setSearchParams({
      name: '',
      department: '',
      position: '',
      status: ''
    });
    setActiveFilters([]);
    onClear();
  };

  const removeFilter = (filterKey) => {
    setSearchParams(prev => ({
      ...prev,
      [filterKey]: ''
    }));
    setActiveFilters(prev => prev.filter(f => f.key !== filterKey));
    onSearch({
      ...searchParams,
      [filterKey]: ''
    });
  };

  return (
    <div className={styles.searchPanel}>
      <div className={styles.searchHeader}>
        <h2 className={styles.searchTitle}>Search Employees</h2>
        <button 
          className={styles.clearButton}
          onClick={handleClear}
        >
          Clear All
        </button>
      </div>

      <form className={styles.searchForm} onSubmit={handleSearch}>
        <div className={styles.searchGroup}>
          <svg 
            className={styles.searchIcon} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            name="name"
            className={styles.searchInput}
            placeholder="Search by name..."
            value={searchParams.name}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.searchGroup}>
          <svg 
            className={styles.searchIcon} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <input
            type="text"
            name="department"
            className={styles.searchInput}
            placeholder="Department..."
            value={searchParams.department}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.searchGroup}>
          <svg 
            className={styles.searchIcon} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.143.195 1.687.418L15.06 6H18.5a1.5 1.5 0 011.5 1.5v2.5a1.5 1.5 0 01-1.5 1.5h-3.44l-1.373 2.139a2.75 2.75 0 01-2.187 1.111H8.75a2.75 2.75 0 01-2.75-2.75v-7.5z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            name="position"
            className={styles.searchInput}
            placeholder="Position..."
            value={searchParams.position}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.searchGroup}>
          <svg 
            className={styles.searchIcon} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          <select
            name="status"
            className={styles.searchInput}
            value={searchParams.status}
            onChange={handleInputChange}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on_leave">On Leave</option>
          </select>
        </div>

        <button type="submit" className={styles.searchButton}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          Search
        </button>
      </form>

      {activeFilters.length > 0 && (
        <div className={styles.filterTags}>
          {activeFilters.map(filter => (
            <span key={filter.key} className={styles.filterTag}>
              {filter.label}
              <button onClick={() => removeFilter(filter.key)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPanel; 