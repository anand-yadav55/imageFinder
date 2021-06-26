import React, { useState } from "react";

export default function SearchBar(props) {
  const [input, setInput] = useState("");
  let [suggestionArray, set] = useState([]);

  function getSearchSuggestion() {
    if (suggestionArray.length > 0) {
      set(localStorage.getItem("imageFinderSearchHistoryData").split(","));
    }
  }

  function AddSearchSuggestion(value) {
    let ifExist = localStorage.getItem("imageFinderSearchHistoryData");
    ifExist = ifExist ? ifExist.split(",") : [];
    ifExist.push(value);
    localStorage.setItem("imageFinderSearchHistoryData", ifExist);
    set(ifExist);
    console.log(suggestionArray);
    getSearchSuggestion();
  }

  function handleInputChange(e) {
    setInput(e.target.value.replaceAll(" ", "+"));
  }

  const handleSearch = (e) => {
    e.preventDefault();
    AddSearchSuggestion(input);
    props.setPage((page) => 1);
    props.setSearchResult((prev) => []);
    let newURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API}&tags=${input}&page=${props.page}&format=json&nojsoncallback=1`;
    props.setURL((prev) => {
      return newURL;
    });
  };

  return (
    <div className="searchBar">
      <form className="search" onSubmit={(e) => handleSearch(e)}>
        <input
          className="search_bar"
          type="text"
          value={input}
          onChange={handleInputChange}
          list="suggest"
        />
        <datalist id="suggest">
          {suggestionArray &&
            suggestionArray.map((item, idx) => {
              return <option key={idx}>{item}</option>;
            })}
        </datalist>
        <button className="search_go">Go</button>
      </form>
    </div>
  );
}
