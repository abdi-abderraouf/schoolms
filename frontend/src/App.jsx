import { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./components/login";
import About from "./components/about";
import Alert from "./components/alert";
import AdminView from "./views/admin";
import AuthView from "./views/auth";
import api from "./api";
import Ctx from "./contexts";

export default function App() {
    const [user, setUser] = useState(null);
    const [notif, setNotif] = useState({ type: "", text: null, timer: null });
    const navigate = useNavigate();
    const authChecked = useRef(false);

    const showNotif = (text, type="") => {
	clearTimeout(notif.timer);
	
	setNotif({
	    type,
	    text,
	    timer: setTimeout(() => {
		setNotif({ text: null });
	    }, 3000)
	});
    };

    useEffect(() => {
	if (window.location.pathname === "/login") return;

	authChecked.current = true;
	
	const storedUser = JSON.parse(localStorage.getItem("user"));
	if (!storedUser) {
	    navigate("/login");
	    return;
	}

	api.authenticate(storedUser)
	    .then(() => {
		setUser(storedUser);
	    })
	    .catch(err => {
		showNotif(err.message, "error");
		navigate("/login");
	    }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const login = (username, password) => {
	api.login(username, password)
	    .then(loggedUser => {
		setUser(loggedUser);
		localStorage.setItem("user", JSON.stringify(loggedUser));
		navigate("/");
	    })
	    .catch(err => {
		showNotif(err.message, "error");
	    });
    };

    const logout = () => {
	setUser(null);
	localStorage.removeItem("user");
    };

    const style = {
	minHeight: "65vh"
    };

    return (
	<>
	    <Header logout={logout} user={user?.username} />
	    <main {...{ style }}>
		{notif.text && <Alert {...{notif}} />}
		<Routes>
		    <Route
			path="/login"
			element={<> <Login {...{ login }} /> <About /> </>} />
		    <Route
			path="/*"
			element={ user ?
				  <Ctx.Notif.Provider value={ showNotif }>
				      <AdminView />
				  </Ctx.Notif.Provider> :
				  authChecked.current ?
				  <Navigate replace to="/login" /> :
				  <AuthView />
				} />
		</Routes>
	    </main>
	    <Footer />
	</>
    );
}
