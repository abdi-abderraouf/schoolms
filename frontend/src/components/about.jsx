export default function About() {
    const style = {
	textAlign: "center"
    };

    const divStyle = {
	display: "flex",
	justifyContent: "center"
    };

    const colStyle = {
	padding: "0 2em",
	width: "40%"
    };
	
    return (
	<div {...{style}}>
	    <h2>About this application</h2>
	    <p>
		SchoolMS is a full-featured production-ready school management system.
	    </p>
	    <div style={ divStyle }>
		<div style={ colStyle }>
		    <h3>For clients</h3>
		    <p>
			It can be customized to meet your schoold needs...
		    </p>
		</div>
		<div style={ colStyle }>
		    <h3>For developers</h3>
		    <p>
			It is free-software...
		    </p>
		</div>
	    </div>
	</div>
    );
}
