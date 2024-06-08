"use client";

import { useState } from "react";
import InputSearch from "../Input";
import SwitchButtons from "../SwitchButtons";
import Toast from "../Snackbar";
import useToast from "../useToast";

const FlightSearch = () => {
  const { toast, addToast, removeToast } = useToast();
  const [sourceData, setSourceData] = useState<any>();
  const [destination, setDestination] = useState<any>();
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  // const [passenger, setPassenger] = useState();
  // const [cabinClass, setCabinClass] = useState();

  const search = () => {
    const jsonBody = {
      source: sourceData?.PlaceId,
      destination: destination?.PlaceId,
      departureDate,
      returnDate,
    };
    // store jsonBody in local storage
    localStorage.setItem("flightSearch", JSON.stringify(jsonBody));
    addToast("API token not found!", "error");
  };

  return (
    <div className="bg-gray-900 text-violet-50 px-4 py-4">
      <div className="container mx-auto">
        <SwitchButtons />
        <div className="bg-transparent rounded flex py-8 ">
          <div className="flex bg-white rounded mr-4">
            <div className="p-2">
              <label htmlFor="source" className="text-slate-700 font-semibold">
                From
                <br />
              </label>
              <InputSearch
                type="Source"
                onSelect={setSourceData}
                selected={sourceData}
              />
            </div>
            <div className="p-2">
              <label
                htmlFor="destination"
                className="text-slate-700 font-semibold"
              >
                To
                <br />
              </label>
              <InputSearch
                type="Destination"
                onSelect={setDestination}
                selected={destination}
              />
            </div>
            <div className="p-2">
              <label
                htmlFor="departure"
                className="text-slate-700 font-semibold"
              >
                Depart
                <br />
              </label>
              <input
                id="departure"
                type="date"
                onChange={(e: any) => setDepartureDate(e.target.value)}
                className="bg-white text-black p-2 rounded w-48"
              />
            </div>
            <div className="p-2">
              <label htmlFor="return" className="text-slate-700 font-semibold">
                Return
                <br />
              </label>
              <input
                id="return"
                type="date"
                onChange={(e: any) => setReturnDate(e.target.value)}
                className="bg-white text-black p-2 rounded w-48"
              />
            </div>
            <div className="p-2">
              <label
                htmlFor="passenger"
                className="text-slate-700 font-semibold"
              >
                Travellers and cabin class
              </label>
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={search}
          >
            Search
          </button>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={removeToast}
        />
      )}
    </div>
  );
};

export default FlightSearch;
