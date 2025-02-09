import React from "react";
import DressStyleCard from "./DressStyleCard";

const DressStyle = () => {
  // Sample data for the cards
  const dressStyleData = [
    {
      title: "Elegant Dress",
      url: "/products/elegant-dress",
    },
    {
      title: "Casual T-shirt",
      url: "/products/casual-tshirt",
    },
    // Add more items as needed
  ];

  return (
    <div className="dress-style-container">
      {dressStyleData.map((item, index) => (
        <DressStyleCard
          key={index}
          title={item.title}
          url={item.url}
        />
      ))}
    </div>
  );
};

export default DressStyle;
