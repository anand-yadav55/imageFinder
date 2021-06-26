import React, { useState, useEffect } from "react";

export default function SearchBar(props) {
  const [input, setInput] = useState("");
  let [suggestionArray, set] = useState([]);

  function getSearchSuggestion() {
    set(localStorage.getItem("imageFinderSearchHistoryData").split(","));
  }

  function AddSearchSuggestion(value) {
    let ifExist = localStorage.getItem("imageFinderSearchHistoryData");
    ifExist = ifExist ? ifExist.split(",") : [];
    ifExist.push(value);
    localStorage.setItem("imageFinderSearchHistoryData", ifExist);
    console.log(suggestionArray);
    getSearchSuggestion();
  }

  function handleInputChange(e) {
    setInput(e.target.value.replaceAll(" ", "+"));
  }
  useEffect(() => {
    getSearchSuggestion();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    AddSearchSuggestion(input);
    props.setPage((page) => 1);
    props.setSearchResult((prev) => []);
    console.log(suggestionArray);
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
          list="cars"
        />
        <datalist id="cars">
          {console.log(suggestionArray.length)}
          {suggestionArray.map((item) => {
            return <option>{item}</option>;
          })}
        </datalist>
        <button className="search_go">Go</button>
      </form>
    </div>
  );
}
