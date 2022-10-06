export default function Login({ login }) {
    const handleSubmit = e => {
	e.preventDefault();
	login(e.target.username.value, e.target.password.value);
    };

    return (
	<div style={{ borderRadius: 0 }}>
	    <form className="card" onSubmit={ handleSubmit  }>
		<input id="username"
		       name="username"
		       type="text"
		       placeholder="Username"
		       required
		/>
		<input id="password"
		       name="password"
		       type="password"
		       placeholder="Password"
		       required
		/>
		<button style={{alignSelf: "center", width: "10rem"}} type="submit">
		    Login
		</button>
	    </form>
	</div>
    );
}
