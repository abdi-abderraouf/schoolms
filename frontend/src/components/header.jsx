import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Header({ logout, user }) {
    const [showUserPopup, setShowUserPopup] = useState(false);

    const handleLogout = () => {
	setShowUserPopup(false);
	logout();
    };
    
    const style = {
	padding: "1em",
	color: "white",
	backgroundColor: "var(--primary)",
	boxShadow: "var(--shadow)",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between"
    };

    const popupStyle = {
	textAlign: "center",
	width: "9rem",
	height: "8rem",
	color: "#0D2547",
	backgroundColor: "#F9F9F9",
	position: "absolute",
	right: "1rem",
	top: "4.5rem",
	padding: "1rem",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
    };

    const iconStyle = {
	color: "var(--primary)",
	backgroundColor: "white",
	width: "2rem",
	height: "2rem",
	borderRadius: "50%",
	cursor: "pointer",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
    };
    
    return (
	<header {...{ style }}>
	    <h1>SchoolMS</h1>
	    { user &&
	      <>
		  <span onClick={() => setShowUserPopup(!showUserPopup)}
			style={ iconStyle }>
		      <FontAwesomeIcon icon={ faUser } />
		  </span>
		  {showUserPopup &&
		   <div className="card" style={popupStyle}>
		       <span>{user}</span>
		       <button className="alt" onClick={handleLogout}>
			   <FontAwesomeIcon icon={ faRightFromBracket } /> Logout
		       </button>
		   </div>
		  }
	      </>
	    }
	</header>
    );
}
