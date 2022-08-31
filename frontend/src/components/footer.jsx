export default function Footer() {
    const style = {
	color: "var(--lighter)",
	backgroundColor: "var(--primary)",
	paddingTop: "2em",
	paddingBottom: "4em",
	textAlign: "center"
    };
    
    return (
	<footer {...{ style }}>
	    SchoolMS Copyright &copy; 2022  Hassan El anabi (
	    <a target="_blank" rel="noreferrer" href="https://al-annabi.tech">
		Al-annabi.tech
	    </a>)
	</footer>
    );
}
