import React from "react";
import Image from "./image";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Result(props) {
  const photoArray = props.res;
  return (
    <div className="result">
      <InfiniteScroll
        className="resultImage"
        dataLength={photoArray.length}
        next={() => {
          props.setPage((prev) => prev + 1);
        }}
        hasMore={true}
      >
        {photoArray.map((item, idx) => {
          const src = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_n.jpg`;

          // return <img />;
          return <Image src={src} key={idx} title={item.title} />;
        })}
      </InfiniteScroll>
    </div>
  );
}
