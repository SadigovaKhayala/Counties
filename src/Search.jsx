import React from 'react'

const Search = (inputRef, handleInput) => {
  return (
    <form onSubmit={handleInput}>
      <input
        ref={inputRef}
        type="text"
        id="header-search"
        placeholder="Enter animal name "
        onChange={handleInput}
      ></input>
    </form>
  )
}

export default Search
