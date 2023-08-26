import { useState } from "react";
import incomingDB from "../../database/incoming.json"

function Search({ users }) {
  // console.log("Users data: search bar", users);

  const [searchFilteredData, setSearchFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");



  const handleSearchFilter = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  
    const filteredResults = incomingDB.posts.filter((item) => {
      return (
        item.payBy.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.category.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.price.toString().includes(searchValue)
      );
    });
  
 setSearchFilteredData(filteredResults);
  };

  return (
    <div className="relative z-1 flex w-full max-w-lg pt-1 md:mx-auto text-gray-400 border-red-200 border-solid rounded-full ">


{/* filter search bar  */}
{searchFilteredData.length !== 0 && (
  <div className="mt-16 w-100 absolute bg-white border-2 border-zinc-300 rounded-lg overflow-hidden overflow-y-auto">
    {searchFilteredData.map((user) => {
      let renderedProperty = "";

      if (user.payBy.toLowerCase().includes(searchTerm.toLowerCase())) {
        renderedProperty = user.payBy;
      } else if 
         (user.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        renderedProperty = user.category;
      } else if 
        (user.price.toString().includes(searchTerm)) {
        renderedProperty = user.price.toString();
      }


      return (
        <a
        className="w-100 h-50 align-middle py-5"
        target="_blank"
        key={user.id}>

        <p className="py-2 w-full pl-4 pr-24 pt-4 hover:bg-neutral-200 cursor-pointer">{renderedProperty}</p>
      </a>
      );
    })}
  </div>
)}

{/* filter search bar ends */}
      <input
        className="flex-1 h-12 py-0 px-10 z-1 border-b relative bg-white shadow-md border-gray md:w-full text-md focus:border-green-500 focus:ring-green-500 focus:outline-teal-600 focus:ring-opacity-40"
        type="search"
        name="search"
        placeholder="Search.."
        
        onChange={handleSearchFilter}
      />
      <div className="absolute right-2 top-3">
        <button type="submit" className="p-2 rounded-full bg-neutral-200">
          <svg
            className="w-4 h-4 text-gray-600 fill-current "
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style={{ enableBackground: "new 0 0 56.966 56.966" }}
            xmlSpace="preserve"
            width="512px"
            height="512px"
          >
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              className="text-red"
            />
          </svg>
        </button>
        
      </div>
    </div>
  );
}

export default Search;

