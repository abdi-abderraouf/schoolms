export default function Footer() {
    const style = {
	color: "var(--light)",
	backgroundColor: "var(--primary)",
	fontSize: ".9rem",
	padding: "1rem",
	textAlign: "center",
	justifyContent: "center",
	columnGap: "1rem"
    };
    
    return (
	<footer className="flex resp-flex" {...{ style }}>
	    <span>SchoolMS Copyright &copy; 2022  Hassan El anabi</span>
	    <span> (<a target="_blank" rel="noreferrer" href="https://al-annabi.tech" style={{ color: "#FFB2BF" }}>
			Al-annabi.tech
		    </a>)
	    </span>
	</footer>
    );
}
