import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import "bootstrap/dist/css/bootstrap.css";
import Calender from "./Pages/Calender";
import MyPets from "./Pages/MyPets";
import DogCalender from "./Components/DogCalender";
import SignTop from "./Pages/SignTop";
import MyAcount from "./Pages/MyAcount";
import CloseActions from "./Pages/CloseActions";
import Reservations from './Pages/Reservations';
import SendEmail from './Components/SendEmail';
import CalenderConsumer from './ConsumerPages/CalenderConsumer';
import Assay from './ConsumerPages/Assay';
import Radiological from './ConsumerPages/Radiological';
import NotificationConsumer from "./ConsumerPages/NotificationConsumer";
import MyAcountConsumer from './ConsumerPages/MyAcountConsumer';

function App() {
  return (
    <div className="App">
     

      <Routes>
        {" "}
        <Route path="/signtop" element={<SignTop />}></Route>
        <Route path="/dogcalender" element={<DogCalender />}></Route>
        <Route path="/Homepage" element={<HomePage />}></Route>
        <Route path="/mypets" element={<MyPets />}></Route>
        <Route path="/calender" element={<Calender />}></Route>
        <Route path="/myacount" element={<MyAcount />}></Route>
        <Route path="/closeaction" element={<CloseActions />}></Route>
        <Route path="/reservations" element={<Reservations />}></Route>
        <Route path="/sendemail" element={<SendEmail />}></Route>
        <Route path="/calenderconsumer" element={<CalenderConsumer />}></Route>
        <Route path="/assay" element={<Assay />}></Route>
        <Route path="/radiological" element={<Radiological />}></Route>
        <Route path="/notificationconsumer" element={<NotificationConsumer />}></Route>
        <Route path="/myacountconsumer" element={<MyAcountConsumer />}></Route>
      </Routes>
      
      
      </div>
  );
}

export default App;
