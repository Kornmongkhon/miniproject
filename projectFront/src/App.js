import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TimeStampSystem from './component/TimeStampSystem';
import GoodbyeWork from './component/GoodbyeWork';
// import CheckInComponent from './component/CheckInComponent';
import TableAdmin from './component/TableAdmin';
import AllStudent from './component/AllStudent';
import TableLeaveWork from './component/TableLeaveWork';
import TableLeaveWorkMonth from './component/TableLeaveWorkMonth';
import TableAdminMonth from './component/TableAdminMonth';
import AllPlace from './component/AllPlace';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TimeStampSystem />}></Route>
          <Route path="/goodbyework" element={<GoodbyeWork />} />
          {/* <Route path="/test" element={<CheckInComponent />} /> */}
          <Route path="/TableAdmin" element={<TableAdmin />} />
          <Route path="/AllStudent" element={<AllStudent />} />
          <Route path="/TableLeaveWork" element={<TableLeaveWork />} />
          <Route path="/TableAdminMonth" element={<TableAdminMonth />} />
          <Route path="/TableLeaveworkMonth" element={<TableLeaveWorkMonth />} />
          <Route path="/AllPlace" element={<AllPlace />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
