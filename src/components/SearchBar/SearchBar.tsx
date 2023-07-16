import { Search } from "lucide-react";
import React from "react";
import Input from "../UI/TextInput/Input";
import "./SearchBar.scss";
const SearchBar = () => {
  return (
    <div className="search-bar">
      <Input search placeholder="Search Something ..." />
    </div>
  );
};

export default SearchBar;
