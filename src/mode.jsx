import { useState } from "react";
import CategorySelect from "./menu";
import SearchBar from "./search";

const SelectOptions = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderSelectedOptionComponent = () => {
    switch (selectedOption) {
      case "option1":
        return <SearchBar />;
      case "option2":
        return <CategorySelect />;
      default:
        return null;
    }
  };

  return (
    <div className="category">
      {selectedOption === "" && ( // Only show the menu if no option is selected
        <div>
          <select
            id="options"
            value={selectedOption}
            onChange={handleOptionChange}
            className="category-select form-select"
            placeholder="Select Thr type of search"
          >
            <option value="">Select Search option</option>
            <option value="option1">Search by Name</option>
            <option value="option2">Search by Category</option>
          </select>
        </div>
      )}

      {selectedOption !== "" && renderSelectedOptionComponent()}
    </div>
  );
};

export default SelectOptions;
