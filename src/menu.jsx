import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const categories = [
  { value: "fiction", label: "Fiction" },
  { value: "nonfiction", label: "Nonfiction" },
  { value: "mystery", label: "Mystery" },
  { value: "academic", label: "Academic" },
  { value: "selfHelp", label: "Self-Help and Personal Development" },
  { value: "biographies", label: "Biographies and Memoirs" },
  { value: "business", label: "Business and Finance" },
  { value: "art", label: "Art and Photography" },
  { value: "science", label: "Science and Technology" },
  { value: "travel", label: "Travel and Adventure" },
];

function CategorySelect() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleCategoryChange = async (event) => {
    setSelectedCategory(event.target.value);

    try {
      if (event.target.value) {
        const response = await fetch("http://localhost:5000/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: event.target.value,
            source: "open_library",
          }),
        });
        // console.log(searchResults);
        const data = await response.json();
        setSearchResults(data);
        console.log(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="category-select form-select"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      <div className="category">
        {searchResults.map((book, index) => (
          <div className="list" key={index}>
            <ul>
              <li>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySelect;
