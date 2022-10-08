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
	    <ul>
		<Link to="/classes" style={ linkStyle("/classes") }>
		    <li>
			<FontAwesomeIcon icon={ faGraduationCap } /> Classes
		    </li>
		</Link>
		<Link to="/students" style={ linkStyle("/students") }>
		    <li>
			<FontAwesomeIcon icon={ faUsers } /> Students
		    </li>
		</Link>
		    <Link to="/subjects" style={ linkStyle("/subjects") }>
		<li>
			<FontAwesomeIcon icon={ faBook } /> Subjects
		</li>
		    </Link>
		    <Link to="/teachers" style={ linkStyle("/teachers") }>
		<li>
			<FontAwesomeIcon icon={ faUserTie } /> Teachers
		</li>
		    </Link>
	    </ul>
	</nav>
    );
}
