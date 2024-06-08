const SwitchButtons = () => (
  <>
    <button
      className="py-2 px-4 rounded-full bg-sky-600 active:text-white border border-sky-600 mr-4"
      type="button"
    >
      Flights
    </button>
    <button
      className="border border-white hover:border-gray-800 hover:bg-gray-800 py-2 px-4 rounded-full mr-4"
      type="button"
    >
      Hotels
    </button>
    <button
      className="border border-white hover:border-gray-800 hover:bg-gray-800 py-2 px-4 rounded-full mr-4"
      type="button"
    >
      Car hire
    </button>
  </>
);

export default SwitchButtons;
// Compare this snippet from src/components/Heading.tsx:
