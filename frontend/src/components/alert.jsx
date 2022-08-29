export default function Alert({ notif }) {
    return (
	<div className={`alert ${notif.type}`}>{ notif.text }</div>
    );
}
