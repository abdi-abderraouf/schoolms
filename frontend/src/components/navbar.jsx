import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGraduationCap,
    faUsers,
    faBook,
    faUserTie
} from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
    const ulStyle = {
	listStyleType: "none",
	display: "flex",
	justifyContent: "center",
	boxShadow: "var(--shadow)",
	backgroundColor: "var(--secondary)",
	margin: 0
    };

    const linkStyle = {
	display: "inline-block",
	fontSize: "1.1rem",
	padding: ".6em",
	color: "white",
    };
    
    return (
	<nav>
	    <ul style={ ulStyle }>
		<li>
		    <Link to="/classes" style={ linkStyle }>
			<FontAwesomeIcon icon={ faGraduationCap } /> Classes
		    </Link>
		</li>
		<li>
		    <Link to="/students" style={ linkStyle }>
			<FontAwesomeIcon icon={ faUsers } /> Students
		    </Link>
		</li>
		<li>
		    <Link to="/subjects" style={ linkStyle }>
			<FontAwesomeIcon icon={ faBook } /> Subjects
		    </Link>
		</li>
		<li>
		    <Link to="/teachers" style={ linkStyle }>
			<FontAwesomeIcon icon={ faUserTie } /> Teachers
		    </Link>
		</li>
	    </ul>
	</nav>
    );
}
