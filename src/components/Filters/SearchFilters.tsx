import React from 'react';
import { useFilterContext } from '../../context/filter_context';

export const SearchFilters = () => {
  const {
    updateFilters, filters: { searchTerm },
  } = useFilterContext();

  return (
    <div className='form-control'>
      <input
        type='text'
        name='searchTerm'
        placeholder='search'
        className='search-input'
        value={searchTerm}
        onChange={e => updateFilters(e)} />
    </div>
  );
};
