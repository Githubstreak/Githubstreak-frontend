// /src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import MentorshipPage from './pages/MentorshipPage';
// Import other pages/components as needed

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <Switch>
        <Route exact path="/" component={HomePage} /> {/* Your Home Page Component */}
        <Route path="/mentorship" component={MentorshipPage} />
        {/* Define other routes here */}
      </Switch>
    </Router>
  );
};

export default App;
