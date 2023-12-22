import { MdSearch } from "react-icons/md";

function Search() {
  return (
    <div className="relative flex items-center justify-center h-full bg-white">
      <MdSearch size="1.5em" className="text-sky-800 mx-2" />
      <input
        onChange={null}
        type="text"
        placeholder="Search..."
        className="flex-[5_0_0%] border-none bg-transparent focus:outline-none ml-2 text-black"
      />
    </div>
  );
}

export default Search;
