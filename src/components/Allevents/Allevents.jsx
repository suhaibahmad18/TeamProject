import {useState, useEffect} from 'react';
import {FaTimes} from 'react-icons/fa';
import './Allevents.css'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios'; 
import Nav from '../Nav/Nav';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";



const Allevents = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
  const getEvents = async () => {
    try {
      const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const response = await axios.get(`http://localhost:8800/events/${userId}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }}
    getEvents();
  }, [events]);
    


  const handleAccept = async (e) => {
    try{
      const token = Cookies.get('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const response = await axios.post(`http://localhost:8800/events/accept/${userId}`, e);
      
      console.log("accept button clicked ", e._id);
      alert('Event Accepted');
    }catch(error){
      console.log(error);
    }
    // try{
    //   const response = await axios.delete(`http://localhost:8800/events/delete/${e._id}`);
      
    // }catch(error){
    //   console.log(error);
    // } 
    
  };
  const handleDecline = async (e) => {
    try{
      const response = await axios.delete(`http://localhost:8800/events/delete/${e._id}`);
      console.log("decline button clicked ", e._id);
      alert('Event Declined');
    }catch(error){
      console.log(error);
    }}


  return (
    <div className="page-container">
      <Nav/>
      <div className="content-container">
        <div className="main-content">
        {events.map((event, index) => (
      <div key={index} className="header">
      <div className="square">
      <div className="box-content">
        <span className="event-name">{event.eventName}</span>
        <div className="event-details">
          <p>Date: {event.eventDate}</p>
          <p>Time: {event.eventTime}</p>
          <p>Venue: {event.eventVenue}</p>
          
        </div>
        <div className="event-details">
          <p>Description: {event.description}</p>
          
        </div>
        
        <button className="acc-button" onClick={() => handleAccept(event)}>Accept</button>
        <button className="clo" onClick={() => handleDecline(event)}>
          <FaTimes/>
        </button>
        
        
      </div>
    </div>
  </div>
))}
      </div> 
      </div>
    </div>
  );
}

export default Allevents;
