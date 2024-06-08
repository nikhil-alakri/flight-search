import { useState, useCallback, useEffect, useRef } from "react";

const InputSearch = ({ type, onSelect, selected }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [sourceData, setSourceData] = useState([]);
  const [value, setValue] = useState("");
  const wrapperRef = useRef<HTMLInputElement>(null);

  const debounce = (func: any, timeout = 300) => {
    let timer: string | number | NodeJS.Timeout | undefined;

    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const onTextChange = useCallback(
    debounce((val: string) => {
      searchAPI(val);
    }, 500),
    []
  );

  const searchAPI = (searchText: string) => {
    fetch(
      `https://www.skyscanner.net/g/autosuggest-search/api/v1/search-flight/IN/en-GB/${searchText}?isDestination=false&enable_general_search_v2=true&autosuggestExp=`
    )
      .then((response) => response.json())
      .then((data) => {
        setIsVisible(true);
        setSourceData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const boldMatchCharacters = ({ sentence = "" }) => {
    let characters = value;
    const regEx = new RegExp(characters, "gi");
    return sentence.replace(regEx, "<strong>$&</strong>");
  };

  useEffect(() => {
    if (selected) {
      console.log("first", selected);
      setValue(selected?.PlaceName);
    }
  }, [selected]);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      window.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  return (
    <div className="relative w-48" ref={wrapperRef}>
      <input
        type="text"
        className="bg-white text-black p-2 rounded"
        placeholder={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onTextChange(e.target.value);
        }}
      />
      {isVisible && (
        <div className="bg-slate-100 text-gray-700 p-2 rounded w-full absolute">
          <ul>
            {sourceData.map((data: any) => (
              <li
                key={data.PlaceId}
                className="hover:bg-slate-200 p-2 rounded cursor-pointer"
                onClick={() => {
                  console.log("list data item", data);
                  onSelect(data);
                  setTimeout(() => {
                    setIsVisible(false);
                  }, 1000);
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: boldMatchCharacters({ sentence: data.PlaceName }),
                  }}
                />
                ({data.PlaceId})
                <br />
                {data.CountryName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InputSearch;
