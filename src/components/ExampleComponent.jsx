import React from "react";
import { useGetProductListData } from "./service";

const ExampleComponent = () => {
  const { data, error, isLoading } = useGetProductListData();
  console.log("data", data);
  return <div>Example Component hh</div>;
};

export default ExampleComponent;
