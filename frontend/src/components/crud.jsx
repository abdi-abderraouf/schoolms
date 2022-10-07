import api from "../api";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import Ctx from "../contexts";

export default function Crud({resourceType, resourceName, resourceKey, fields}) {
    const [resources, setResources] = useState();
    const [showForm, setShowForm] = useState(false);
    const [selected, setSelected] = useState();
    const [trigger, setTrigger] = useState(false);
    const showNotif = useContext(Ctx.Notif);
    const refreshData = () => setTrigger(bit => !bit);

    useEffect(() => {
	api.getAll(resourceType)
	    .then(data => {
		setResources(data);
	    })
	    .catch(err => {
		showNotif(err.message, "error");
	    }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger]);

    const addResource = e => {
	e.preventDefault();
	const form = e.target;

	const newResource = fields.reduce((prev, curr) => (
	    {
		...prev,
		[curr.codename]: (curr.transform ||
				  (x => x))(form[curr.codename].value)
	    }), {});

	api.add(resourceType, newResource)
	    .then(() => {
		showNotif(`${resourceName} added successfully`);
		form.reset();
		setShowForm(false);
		refreshData();
	    })
	    .catch(err => {
		showNotif(err.message, "error");
	    });
    };

    const removeResource = () => {
	api.deleteOne(resourceType, selected)
	    .then(() => {
		showNotif(`${resourceName} removed successfully`);
		setResources(resources =>
		    resources.filter(r => r[resourceKey] !== selected));
		setSelected(null);
	    })
	    .catch(err => {
		showNotif(err.message, "error");
	    });
    };

    const selectedStyle = {
	backgroundColor: "var(--light)"
    };
    
    return (
	<section>
	    <div className="toolbar">
		<button onClick={() => setShowForm(true)}>
		    <FontAwesomeIcon icon={faPlus} /> Add
		</button>
		<button onClick={removeResource} disabled={!selected}>
		    <FontAwesomeIcon icon={faXmark} /> Remove
		</button>
	    </div>
	    <hr />
	    { showForm &&
	      <form className="card" onSubmit={addResource}>
		  { fields.map(field =>
		      <input key={field.codename}
			     name={field.codename}
			     placeholder={field.desc}
			     required={Boolean(field.required)} />)
		  }
		  <div style={{
			   width: "max-content",
			   alignSelf:"center",
			   margin: ".5rem"
		       }}>
		      <button type="submit">Save</button>{" "}
		      <button type="button" className="alt" onClick={() => setShowForm(false)}>Cancel</button>
		  </div>
	      </form> }
	    <table>
		<thead>
		    <tr>
			{ fields.map(field => <th key={field.codename}>{field.desc}</th>) }
		    </tr>
		</thead>
		<tbody>
		    { resources && resources.map(resource => 
			    <tr key={resource[resourceKey]}
				onClick={() => setSelected(resource[resourceKey])}
				style={ selected === resource[resourceKey] ? selectedStyle : {} }>
				{ fields.map(field =>
				    <td key={field.codename}>
					{(field.toStr || String)(resource[field.codename])}
				    </td>)
				}
			    </tr>)
		    }
		</tbody>
	    </table>
	</section>
    );
}
