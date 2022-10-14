export default function About() {
    const style = {
	display: "flex",
	flexDirection: "column",
	minHeight: "80%",
	justifyContent: "space-evenly",
	textAlign: "center",
	padding: "1rem",
	maxWidth: "1200px",
	margin: "0 auto"
    };

    const colStyle = {
	padding: "0 2em",
	width: "45%",
	textAlign: "left"
    };
	
    return (
	<div {...{style}}>
	    <div className="card">
	    <h2>About this application</h2>
	    <p>
		SchoolMS (<b>School</b> <b>M</b>anagement <b>S</b>ystem) is a web application dedicated to manage administrative aspects of educational institutions.
	    </p>
	    </div>
	    <p>
		<i className="alert">Note: This project is still under development</i>
	    </p>
	    <div className="flex resp-flex" style={{ justifyContent: "space-between" }}>
		<div className="card" style={ colStyle }>
		    <h3>For clients</h3>
		    <ul>
			<li>
			    It can be customized/extended to meet your specific requirements.
			</li>
			<li>
			    It can be installed locally (no extra charges, e.g. hosting),
			    or deployed online to be accessible from anywhere (charges apply).
			</li>
		    </ul>
		    <p>
			
		    </p>
		</div>
		<div className="card" style={ colStyle }>
		    <h3>For developers</h3>
		    <ul>
			<li>
			    This is free software (<a href="https://github.com/helanabi/schoolms">source code</a>).
			</li>
			<li>
			    You may request support for customization, deployment, maintenance, etc.
			</li>
			<li>
			    Stack used: <em>ReactJS</em>, <em>ExpressJS</em>, <em>MongoDB</em>.
			</li>
		    </ul>
		</div>
	    </div>
	</div>
    );
}
