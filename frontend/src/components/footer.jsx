export default function Footer() {
    const style = {
	color: "var(--lighter)",
	backgroundColor: "var(--primary)",
	paddingTop: "2em",
	paddingBottom: "4em",
	textAlign: "center",
	justifyContent: "center",
	columnGap: "1rem"
    };
    
    return (
	<footer className="flex resp-flex" {...{ style }}>
	    <span>SchoolMS Copyright &copy; 2022  Hassan El anabi</span>
	    <span> (<a target="_blank" rel="noreferrer" href="https://al-annabi.tech">
			Al-annabi.tech
		    </a>)
	    </span>
	</footer>
    );
}
