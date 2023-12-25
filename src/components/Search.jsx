import { MdSearch } from "react-icons/md";

function Search({ handleSearch }) {
  return (
    <div className="flex items-center justify-stretch min-h-full p-6 bg-white">
      <MdSearch size="1.5em" className="text-sky-800 mx-2" />
      <input
        onChange={(event) => handleSearch(event.target.value)}
        type="text"
        placeholder="Search..."
        className="flex-[5_0_0%] border-none bg-transparent focus:outline-none ml-2 text-black"
      />
    </div>
  );
}

export default Search;
