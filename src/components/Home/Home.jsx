import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import {FaTimes} from 'react-icons/fa'
import Nav from "../Nav/Nav";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Dialog from './Dialog';
import { Tilt } from 'react-tilt'

const Home = () => {
  const [loggedIn, setLoggedIn] = useState([]);
  const [events, setEvents] = useState([]);
  const [trend, setTrend] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const Logged = async () => {
      try {
        const token = Cookies.get('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        console.log("User ID:", userId);
        const response = await axios.get(`http://localhost:8800/users/${userId}`);
        console.log("User:", response.data.user);
        setLoggedIn(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    Logged();

  }, []);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const token = Cookies.get('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const response = await axios.get(`http://localhost:8800/events/accept/${userId}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    getEvents();
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const token = Cookies.get('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const response = await axios.get(`http://localhost:8800/events/${userId}`);
        setTrend(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    getEvents();
  }, []);

  const handleAccept = async (event) => {
    try {
      const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const response = await axios.post(`http://localhost:8800/events/accept/${userId}`, event);
      console.log("accept button clicked ", event._id);
      alert('Event Accepted');
    } catch (error) {
      console.error('Error accepting event:', error);
    }

    
  };

  const handleDecline = async (event) => {
    try {
      await axios.delete(`http://localhost:8800/events/delete/${event._id}`);
      console.log("decline button clicked ", event._id);
      alert('Event Declined');
    } catch (error) {
      console.error('Error declining event:', error);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setUser(null);
  };

  const handleContact = (username) => {
    axios.get(`http://localhost:8800/users/search/${username}`)
      .then(response => {
        setUser(response.data.user);
        setShowDialog(true);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  };

  return (
    <div className="page-container">
      <Nav />
      <div className="content-container">
        <div className="main-content">
          <div className="header">
            <div className="trending-events-bar">
              <span className="trending-events-text">Trending Events Going On</span>
            </div>
          </div>
          {trend.slice(-2).map((event, index) => (
            
            <div key={index} className="header">
              <div className="square">
                <div className="box-content">
                  <span className="event-name">{event.eventName}</span>
                  <p>{event.description}</p>
                  
                  <button className="ac-button" onClick={() => handleAccept(event)}>Accept</button><br />
                  <button className="cl" onClick={() => handleDecline(event)}>
                    <FaTimes />
                  </button>
                  
                </div>
              </div>
            </div>
            
          ))}
        </div>
        <div className="main-content">
          <div className="trending-events-bar">
            <span className="trending-events-text">My Events</span>
          </div>
          {events.map((event, index) => (
            <Tilt key={index} >
            <div className="header">
              <div className="square-box">
                <div className="box-content">
                  <span className="event-name">{event.eventName}</span>
                  <span className="eventby">{event.description}</span>
                </div>
              </div>
              <div className="square-box">
                <div className="box">
                  <span className="event-name">Schedule :</span>
                  <span className="event-name">{event.eventTime}</span>
                  <span className="event-name">{event.eventVenue}</span>
                  <span className="eventby" onClick={() => handleContact(event.inviteBy)}>By:{event.inviteBy}</span>
                </div>
              </div>
            </div>
            </Tilt>
          ))}
        </div>
      </div>
      {showDialog && <Dialog handleClose={() => setShowDialog(false)} user={user} />}
    </div>
  );
}

export default Home;
