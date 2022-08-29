export default function Login({ login }) {
    const style = {
	padding: "2em",
	borderBottom: "1px solid var(--primary)",
	textAlign: "center"
    }

    const handleSubmit = e => {
	e.preventDefault();
	login(e.target.username.value, e.target.password.value);
    };

    return (
	<div {...{ style }}>
	    <form onSubmit={ handleSubmit  }>
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
		<button type="submit">Login</button>
	    </form>
	</div>
    );
}
