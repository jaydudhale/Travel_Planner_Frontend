import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import '../App.css';  // Adjust the path based on where you place the CSS file

const ViewAllTourBookings = () => {
  const [allTourBookings, setAllTourBookings] = useState([
    {
      customer: { firstName: "", lastName: "" },
      tour: {
        fromLocation: { name: "" },
        toLocation: { name: "" },
        guide: { firstName: "", lastName: "" },
      },
    },
  ]);
  const [weather, setWeather] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [mapUrl, setMapUrl] = useState("");

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get("http://localhost:8080/weather", {
        params: { city: city },
      });
      setWeather(response.data);
    } catch (err) {
      console.error("Error fetching weather for " + city, err);
    }
  };

  const openMapModal = (from, to) => {
    const url = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyCLak1nmHfkVQ4VWNOp_J9diCfJ46jVPqs&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}`;
    setMapUrl(url);
    setShowMap(true);
  };

  const closeMapModal = () => {
    setShowMap(false);
    setMapUrl("");
  };

  useEffect(() => {
    const getAllTourBookings = async () => {
      const allToursBookings = await retrieveAllTourBookings();
      if (allToursBookings) {
        setAllTourBookings(allToursBookings.bookings);
      }
    };
    getAllTourBookings();
  }, []);

  const retrieveAllTourBookings = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/tour/booking/fetch/all"
    );
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    return date.toLocaleString();
  };

  return (
    <div className="mt-3">
      {weather && (
        <div className="text-center mb-4">
          <h4>🌦 Weather in {weather.name}, {weather.sys.country}</h4>
          <p>🌡 Temp: {weather.main.temp}°C | 🌥Description: {weather.weather[0].description} | 💧Humidity: {weather.main.humidity}% | 💨Wind_Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
      <div className="card form-card ms-2 me-2 mb-5 shadow-lg" style={{ height: "45rem" }}>
        <div className="card-header custom-bg-text text-center bg-color" style={{ borderRadius: "1em", height: "50px" }}>
          <h2>My Tour Bookings</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Tour</th>
                  <th scope="col">Name</th>
                  <th scope="col">Tour Guide</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Tour Date</th>
                  <th scope="col">From Location</th>
                  <th scope="col">To Location</th>
                  <th scope="col">Price (per ticket)</th>
                  <th scope="col">Total Tickets</th>
                  <th scope="col">Total Ticket Price</th>
                  <th scope="col">Booking Time</th>
                  <th scope="col">Booking Id</th>
                  <th scope="col">Status</th>
                  <th scope="col">Map</th>
                </tr>
              </thead>
              <tbody>
                {allTourBookings.map((booking, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={"http://localhost:8080/api/tour/" + booking.tour.image1}
                        className="img-fluid"
                        alt="event_pic"
                        style={{ maxHeight: "90px" }}
                      />
                    </td>
                    <td>
                      <b>
                        <button
                          className="btn btn-link p-0"
                          onClick={() => fetchWeather(booking.tour.toLocation.name)}
                        >
                          {booking.tour.name}
                        </button>
                      </b>
                    </td>
                    <td><b>{booking.tour.guide.firstName + " " + booking.tour.guide.lastName}</b></td>
                    <td><b>{booking.customer.firstName + " " + booking.customer.lastName}</b></td>
                    <td><b>{formatDateFromEpoch(booking.tour.startDate)} - {formatDateFromEpoch(booking.tour.endDate)}</b></td>
                    <td><b>{booking.tour.fromLocation.name}</b></td>
                    <td><b>{booking.tour.toLocation.name}</b></td>
                    <td><b>{booking.tour.ticketPrice}</b></td>
                    <td><b>{booking.noOfTickets}</b></td>
                    <td><b>{booking.noOfTickets * booking.tour.ticketPrice}</b></td>
                    <td><b>{formatDateFromEpoch(booking.bookingTime)}</b></td>
                    <td><b>{booking.bookingId}</b></td>
                    <td><b>{booking.status}</b></td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          openMapModal(booking.tour.fromLocation.name, booking.tour.toLocation.name)
                        }
                      >
                        View Map
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showMap && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tour Route Map</h5>
                <button type="button" className="close" onClick={closeMapModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ height: '450px' }}>
                <iframe
                  title="Google Maps Directions"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={mapUrl}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllTourBookings;