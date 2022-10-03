import { useState } from "react";

export default function Header({ logout, user }) {
    const [showUserPopup, setShowUserPopup] = useState(false);
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
	width: "8rem",
	height: "8rem",
	backgroundColor: "#000A",
	position: "absolute",
	right: "1rem",
	top: "5rem",
	padding: ".5em",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between"
    };
    
    return (
	<header {...{ style }}>
	    <h1>SchoolMS</h1>
	    { user &&
	      <>
		  <span onClick={() => setShowUserPopup(!showUserPopup)}>
		      PROFILE_ICON
		  </span>
		  {showUserPopup &&
		   <div style={popupStyle}>
		       <span>{user}</span>
		       <span onClick={logout}>ICON Logout</span>
		   </div>
		  }
	      </>
	    }
	</header>
    );
}
