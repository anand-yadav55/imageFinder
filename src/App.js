import React, { useState, useEffect } from "react";
import Header from "./components/header";
import SearchBar from "./components/searchBar";
import Result from "./components/result";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import "./style.css";

export default function App() {
  const [page, setPage] = useState(1);
  const [url, setURL] = useState(
    `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_API}&page=${page}&format=json&nojsoncallback=1`
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([]);

  const imageResult = (url) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setSearchResult((prev) => prev.concat(res.data.photos.photo));
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    imageResult(url);
  }, [url, page]);

  return (
    <div className="App">
      <Header className="header" />
      <SearchBar
        setURL={setURL}
        setSearchResult={setSearchResult}
        setPage={setPage}
        page={page}
      />

      <Result
        setIsLoading={setIsLoading}
        res={searchResult}
        setURL={setURL}
        url={url}
        setSearchResult={setSearchResult}
        page={page}
        setPage={setPage}
      />
      {isLoading && <BeatLoader color="red" size={24} />}
    </div>
  );
}
