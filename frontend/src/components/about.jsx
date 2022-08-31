export default function About() {
    const style = {
	textAlign: "center",
	padding: "1rem"
    };

    const divStyle = {
	display: "flex",
	justifyContent: "center"
    };

    const colStyle = {
	padding: "0 2em",
	width: "44%"
    };
	
    return (
	<div {...{style}}>
	    <h2>About this application</h2>
	    <p>
		SchoolMS (<b>School</b> <b>M</b>anagement <b>S</b>ystem) is a web application dedicated to manage administrative aspects of educational institutions.
	    </p>
	    <p>
		<i>Note: This project is still under development</i>
	    </p>
	    <div style={ divStyle }>
		<div style={ colStyle }>
		    <h3>For clients</h3>
		    <p>
			It can be customized/extended to meet your specific requirements.<br/>
			It can be installed locally (no extra charges, e.g. hosting),
			or deployed online to be accessible from anywhere (charges apply).
		    </p>
		    <p>
			
		    </p>
		</div>
		<div style={ colStyle }>
		    <h3>For developers</h3>
		    <p>
			This is free software (source code).
			You may request support for customization, deployment, maintenance, etc.<br/>
			Stack used: <em>ReactJS</em>, <em>ExpressJS</em>, <em>MongoDB</em>.
		    </p>
		</div>
	    </div>
	</div>
    );
}
