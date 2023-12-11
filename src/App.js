import {Routes, Route } from 'react-router-dom';
import './App.css';
import SideBar from './component/newSidebar';
import Dashboard from './pages/dashboard/index';
import About from './pages/About';
import Features from './pages/Features';
import DailyRoutinue from './pages/dailyRoutinue';
import Stats from './pages/stats';
import Profile from './pages/profile';
import Logout from './pages/logout';
import Home from './pages/Home';
import Landinglayout from './pages/LandingLayout';
import { Provider } from 'react-redux';
import Registration from './pages/registration';
import Taskpage from './pages/taskpage/Index';
import Quiz from './pages/pdequestions/index';
import Upcoming from './pages/upcoming';
import Today from './pages/today';
import store from 'store/store';


function App() {
  return (
    <Provider store={store}>
      <Routes>   
          <Route path="/" element={<Landinglayout />}>
              <Route index  element={<Home />} />
              <Route path="registration" element={<Registration />}/>
              <Route path="about" element={<About />}/>
              <Route path="features" element={<Features />}/>
          </Route>
          <Route path="/dashboard" element={<SideBar />}>
              <Route index element={<Dashboard />} />
              <Route path='dailyroutinue' element={<DailyRoutinue />} />
              <Route path='stats' element={<Stats />} />
              <Route path='profile' element={<Profile />} />
              <Route path='logout' element={<Logout />} />
              <Route path='task' element={<Taskpage/>} />
              <Route path='quiz' element={<Quiz/>} />
              <Route path='upcoming' element={<Upcoming/>} />
              <Route path='today' element={<Today/>} />
          </Route>
      </Routes>
  </Provider>
  );
}

export default App;
