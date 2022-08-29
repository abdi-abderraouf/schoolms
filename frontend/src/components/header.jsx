export default function Header() {
    const style = {
	padding: "1em",
	color: "white",
	backgroundColor: "var(--primary)",
	boxShadow: "var(--shadow)",
    };
    
    return (
	<header {...{ style }}>
	    <h1>SchoolMS</h1>
	</header>
    );
}
