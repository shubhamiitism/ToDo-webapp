import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import Display from './components/Display'
import CardHeader from './components/CardHeader';
import Card from './components/Card';
import axios from 'axios';

const App = () => {
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState( 'priority');
  
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  


  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(({ data }) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

 
  const handleGroupingChange = (e) => setGrouping(e.target.value);
  const handleOrderingChange = (e) => setOrdering(e.target.value);
 
  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => ordering === 'priority' ? b.priority - a.priority : a.title.localeCompare(b.title));
  };

  const groupTickets = useCallback(() => {
    const grouped = { col1: [], col2: [], col3: [], col4: [], col5: [] };
    const groupByField = (field, values) => {
      values.forEach((value, idx) => {
        grouped[`col${idx + 1}`] = sortTickets(tickets.filter(ticket => ticket[field] === value));
      });
    };

    if (grouping === 'status') groupByField('status', ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled']);
    else if (grouping === 'user') groupByField('userId', ['usr-1', 'usr-2', 'usr-3', 'usr-4', 'usr-5']);
    else groupByField('priority', [0, 4, 3, 2, 1]);

    return grouped;
  }, [tickets, grouping, ordering]);

  const getUserNameById = (userId) => users.find((user) => user.id === userId)?.name ;

  const headerData = {
    status: ['Backlog', 'Todo', 'In Progress', 'Done', 'Cancelled'],
    user: ['usr-1', 'usr-2', 'usr-3', 'usr-4', 'usr-5'].map(getUserNameById),
    priority: ['No Priority', 'Urgent', 'High', 'Medium', 'Low'],
  };

  const icons = {
    status: ['/images/icons/Backlog.svg', '/images/icons/To-do.svg', '/images/icons/in-progress.svg', '/images/icons/Done.svg', '/images/icons/Cancelled.svg'],
    user: Array(5).fill('/images/icons/profileicon.svg'),
    priority: ['/images/icons/No-priority.svg', '/images/icons/SVG - Urgent Priority colour.svg', '/images/icons/Img - High Priority.svg', '/images/icons/Img - Medium Priority.svg', '/images/icons/Img - Low Priority.svg'],
  };

  const groupedTickets = groupTickets();

  return (
    
     
      <>
      <Display grouping={grouping} ordering={ordering} handleGroupingChange={handleGroupingChange} handleOrderingChange={handleOrderingChange}/>
      <div className="ticket-lists">
        {Object.keys(groupedTickets).map((col, idx) => (
          <div className="ticket-column" key={col}>
            <CardHeader title={headerData[grouping][idx]} imagePath={icons[grouping][idx]} length={groupedTickets[col].length} />
            {groupedTickets[col].map((ticket) => (
              <Card key={ticket.id} id={ticket.id} title={ticket.title} tag={ticket.tag[0]} />
            ))}
          </div>
        ))}
      </div>
      </>
   
  );
};

export default App;
