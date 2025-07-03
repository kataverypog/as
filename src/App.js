import Selector from "./Selector";
import Main from "./Main";
// import Sub from "./Sub";
import {Route, Routes} from "react-router-dom";
import QrScanner from "./QrScanner";

export default function App() {
  return (
    <>
        <Routes>
            <Route path="/sub/" element={<Main/>} />
            <Route path="/" element={<QrScanner />} />
        </Routes>
      {/*<Selector />*/}
    </>
  );
}

