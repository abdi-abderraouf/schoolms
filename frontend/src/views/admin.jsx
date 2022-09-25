import { Routes, Route } from "react-router-dom";
import About from "../components/about";
import NavBar from "../components/navbar";
import Classes from "../components/classes";
import Students from "../components/students";
import Subjects from "../components/subjects";
import Teachers from "../components/teachers";

export default function Admin() {
    return (
	<>
	    <NavBar />
	    <Routes>
		<Route path="" element={<About />} />
		<Route path="classes/*" element={<Classes />} />
		<Route path="students/*" element={<Students />} />
		<Route path="subjects/*" element={<Subjects />} />
		<Route path="teachers/*" element={<Teachers />} />		
	    </Routes>
	</>
    );
}
