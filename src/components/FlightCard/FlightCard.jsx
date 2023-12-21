const FlightCard = ({ index, flight, flightCardOpenState, openCard }) => {
  const foldingAnimation = (index) => {
    return flightCardOpenState[index] ? "fold-out" : "fold-in";
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });
  };

  const formatDate = (timestamp) => {
    const options = { month: "long", day: "numeric" };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  };

  function calculateDuration(departureTime, destinationTime) {
    const departureDate = new Date(departureTime);
    const destinationDate = new Date(destinationTime);

    const durationInMilliseconds = destinationDate - departureDate;
    const durationInMinutes = durationInMilliseconds / (1000 * 60);

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.round(durationInMinutes % 60);

    const formattedDuration = `${hours}h ${minutes}min`;

    return formattedDuration;
  }

  return (
    <div
      key={index}
      onClick={() => openCard(index)}
      className={`relative cursor-pointer transition-all duration-700
                ${flightCardOpenState[index] ? "h-[20rem]" : "h-[10rem]"}
              `}
    >
      <div className="perspective">
        <div
          className={`flex justify-around items-center bg-white shadow-custom rounded-2xl w-[28rem] h-[10rem] relative bf-visibility-hidden origin-bottom overflow-hidden cursor-pointer transition-all duration-700
                  ${foldingAnimation(index)}
                `}
        >
          <div className="absolute -left-7 top-4 bg-[#ff0000] text-white capitalize -rotate-45 px-7">
            {flight.class}
          </div>
          <div>
            <img
              src={flight.logoSrc}
              alt="logo"
              style={{
                height: flight.logoStyle.height,
                margin: flight.logoStyle.margin,
              }}
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            <div>
              <p className="text-gray-500">{flight.src.country}</p>
              <p className="text-2xl font-bold">
                {formatTime(flight.src.time)}
              </p>
              <p className="text-gray-500">{formatDate(flight.src.time)}</p>
            </div>
            <img src="/airplane.png" alt="airplane" width={50} />
            <div>
              <p className="text-gray-500">{flight.dst.country}</p>
              <p className="text-2xl font-bold">
                {formatTime(flight.dst.time)}
              </p>
              <p className="text-gray-500">{formatDate(flight.dst.time)}</p>
            </div>
          </div>
          <p className="absolute bottom-0 left-[50%] transform -translate-x-1/2 text-2xl font-bold border-[2px] border-dashed border-gray-500 py-0 px-7 rounded-md">
            ${flight.price}
          </p>
        </div>
      </div>
      <div className="absolute top-0 -z-20">
        <div className="relative flex justify-around items-center bg-white shadow-custom rounded-2xl w-[28rem] h-[10rem] overflow-hidden">
          <div className="absolute -left-7 top-4 bg-[#ff0000] text-white capitalize -rotate-45 px-7">
            {flight.class}
          </div>
          <div className="flex justify-around w-full">
            <div className="w-28 flex flex-col text-center">
              <p className="font-bold">From</p>
              <p className="font-bold text-2xl">{flight.src.iso3}</p>
              <p className="text-sm">{flight.src.airline}</p>
            </div>
            <div className="flex flex-col items-center justify-end">
              <img src="/airplane.png" alt="airplane" width={50} />
              <p className="font-bold text-lg mt-5 -mb-2 bg-gray-300 px-7 rounded-md">
                ${flight.price}
              </p>
            </div>
            <div className="w-28 flex flex-col text-center">
              <p className="font-bold">To</p>
              <p className="font-bold text-2xl">{flight.dst.iso3}</p>
              <p className="text-sm">{flight.dst.airline}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 -z-10 perspective">
        <div
          className={`flex justify-around items-center bg-white shadow-custom rounded-2xl w-[28rem] h-[10rem] rotate-x-180 origin-bottom border-b-2 border-gray-400 border-dashed transition-all duration-700
                ${foldingAnimation(index)}
              `}
        >
          <div className="flex flex-col justify-start">
            <div>
              <p className="text-xl font-bold">
                {formatTime(flight.src.time)} - {formatTime(flight.dst.time)}
              </p>
              <p className="text-gray-600">Flight Time</p>
            </div>
            <div className="mt-3">
              <p className="text-xl font-bold">
                {flight.transfer ? "Yes" : "No"}
              </p>
              <p className="text-gray-600">Transfer</p>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div>
              <p className="text-xl font-bold">
                {calculateDuration(flight.src.time, flight.dst.time)}
              </p>
              <p className="text-gray-600">Duration</p>
            </div>
            <div className="mt-3">
              <p className="text-xl font-bold">{flight.gates}</p>
              <p className="text-gray-600">Gate</p>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div>
              <p className="text-xl font-bold">{flight.boarding}</p>
              <p className="text-gray-600">Boarding</p>
            </div>
            <div className="mt-3">
              <p className="text-xl font-bold">{flight.seat}</p>
              <p className="text-gray-600">Seat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
