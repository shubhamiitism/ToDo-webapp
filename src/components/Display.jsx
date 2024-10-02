import React, { useState, useEffect, useRef } from 'react';
import '../styles/Display.css';
import display from '/images/icons/Display.svg'
import down from '/images/icons/down.svg'

const Display = ({grouping,ordering,handleGroupingChange,handleOrderingChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  

  const dropdownRef = useRef(null); 

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); 
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); 

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropdown-button">
          <img src={display} alt="display.svg" className="dropdown-icon" />
          Display
          <img src={down} alt="down.svg" className="dropdown-icon" />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-section">
            <label htmlFor="grouping">Grouping</label>
            <select id="grouping" value={grouping} onChange={handleGroupingChange}>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="dropdown-section">
            <label htmlFor="ordering">Ordering</label>
            <select id="ordering" value={ordering} onChange={handleOrderingChange}>
              <option value="title">Title</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Display;
