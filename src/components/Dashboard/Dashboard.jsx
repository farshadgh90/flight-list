import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlightCard from "../FlightCard/FlightCard";

const Dashboard = () => {
  const [flights, setFlights] = useState([]);
  const [pageSize, setPageSize] = useState(3);
  const [totalNumberOfFlights, setTotalNumberOfFlights] = useState();
  const [username, setUsername] = useState("");
  const [isLogoutVisible, setLogoutVisible] = useState(false);
  const [flightCardOpenState, setFlightCardOpenState] = useState({});

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUsername = async () => {
      try {
        const response = await axios.get("http://localhost:3001/username", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const username = response.data.username;
        setUsername(username);
      } catch (error) {
        console.log("Error in fetching username", error);
        navigate("/login");
      }
    };

    getUsername();
  }, []);

  useEffect(() => {
    const getFlightsList = async () => {
      try {
        const response = await axios.get("http://localhost:3001/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: 1,
            size: pageSize,
          },
        });
        setTotalNumberOfFlights(response.data.total);
        setFlights(response.data.result);
      } catch (error) {
        console.log("Error in getting the list", error);
        navigate("/login");
      }
    };
    getFlightsList();
  }, [token, pageSize]);

  const loadMore = () => {
    setPageSize((prevSize) => prevSize + 3);
  };

  const logoutOpener = () => {
    setLogoutVisible((prevVisible) => !prevVisible);
  };

  const logout = () => {
    navigate("/login");
  };

  const openCard = (index) => {
    setFlightCardOpenState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div>
      <div className="flex flex-col items-end relative">
        <button
          onClick={logoutOpener}
          className="border-2 border-black bg-white rounded-md w-32 py-1 mr-3 text-lg font-bold capitalize"
        >
          {username}
        </button>
        <button
          onClick={logout}
          className={`border-2 border-black rounded-md w-32 py-1 mr-3 text-lg font-bold capitalize cursor-pointer absolute transition-translate duration-500
            ${
              isLogoutVisible
                ? "translate-y-[2.45rem] z-0"
                : "translate-y-0 -z-10"
            }
          `}
        >
          Logout
        </button>
      </div>
      <div className="mt-20">
        <div className="flex justify-between px-16 py-6 font-bold text-lg">
          <p>Viewed: {flights.length}</p>
          <p>Total: {totalNumberOfFlights}</p>
        </div>
        <div className="flex flex-wrap justify-center items-start gap-10">
          {flights.map((flight, index) => (
            <FlightCard
              key={index}
              index={index}
              flight={flight}
              flightCardOpenState={flightCardOpenState}
              openCard={openCard}
            />
          ))}
        </div>
        <button
          onClick={loadMore}
          disabled={flights.length === totalNumberOfFlights}
          className={`${
            flights.length === totalNumberOfFlights
              ? "bg-gray-300 text-gray-400"
              : "bg-blue-500 hover:bg-blue-600"
          } flex mx-auto my-10 p-3 rounded-lg text-white font-semibold tracking-wider transition-all duration-300`}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
