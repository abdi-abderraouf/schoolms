import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGraduationCap,
    faUsers,
    faBook,
    faUserTie
} from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {

    const path = useLocation().pathname;
     
    const ulStyle = {
	listStyleType: "none",
	display: "flex",
	justifyContent: "center",
	boxShadow: "var(--shadow)",
	backgroundColor: "var(--secondary)",
	margin: 0
    };

    const linkStyle = to => ({
	display: "inline-block",
	fontSize: "1.1rem",
	padding: ".6em",
	color: "white",
	backgroundColor: path.startsWith(to) ?
	    "var(--light-trans)" : null
    });

    return (
	<nav>
	    <ul style={ ulStyle }>
		<li>
		    <Link to="/classes" style={ linkStyle("/classes") }>
			<FontAwesomeIcon icon={ faGraduationCap } /> Classes
		    </Link>
		</li>
		<li>
		    <Link to="/students" style={ linkStyle("/students") }>
			<FontAwesomeIcon icon={ faUsers } /> Students
		    </Link>
		</li>
		<li>
		    <Link to="/subjects" style={ linkStyle("/subjects") }>
			<FontAwesomeIcon icon={ faBook } /> Subjects
		    </Link>
		</li>
		<li>
		    <Link to="/teachers" style={ linkStyle("/teachers") }>
			<FontAwesomeIcon icon={ faUserTie } /> Teachers
		    </Link>
		</li>
	    </ul>
	</nav>
    );
}
