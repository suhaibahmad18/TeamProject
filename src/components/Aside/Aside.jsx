import React from 'react';
import {FaHome,FaClock,FaUserFriends,FaPlus} from 'react-icons/fa'
import './Aside.css';
import { useHistory } from 'react-router-dom';

const Aside = () => {

    const history = useHistory();
    const handleHome = () => {
       history.push('/home');
    }
    const handleEvents = () => {
       history.push('/all');
    }
    const handleFriends = () => {
       history.push('/friend');
    } 
    const handleInvite = () => {
      history.push('/events');
    }
  return (
    <aside className="sidebar">
      <div className="sidebar-icon">
        <FaHome className="sidebar-icon-white" />
        <button id="btn-1" onClick={handleHome}><span className="sidebar-text" >Home</span></button>
      </div>
      <div className="sidebar-icon">
        <FaClock className="sidebar-icon-white" />
        <button id='btn-2' onClick={handleEvents}><span className="sidebar-text">Events</span></button>
      </div>
      <div className="sidebar-icon">
        <FaUserFriends className="sidebar-icon-white" />
        <button id='btn-3' onClick={handleFriends}><span className="sidebar-text">Friends</span></button>
      </div>
      <div className="sidebar-icon">
        <FaPlus className="sidebar-icon-white" />
        <button id='btn-4' onClick={handleInvite}><span className="sidebar-text" >Invite</span></button>
      </div>
    </aside>
  );
};

export default Aside;
