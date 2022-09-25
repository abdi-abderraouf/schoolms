import api from "../api";
import { useContext, useEffect, useState } from "react";
import Ctx from "../contexts";

export default function Subjects() {
    const [subjects, setSubjects] = useState();
    const [showForm, setShowForm] = useState(false);
    const [selected, setSelected] = useState();
    const showNotif = useContext(Ctx.Notif);

    useEffect(() => {
	api.getAll("subjects")
	    .then(data => {
		setSubjects(data);
	    })
	    .catch(err => {
		showNotif(err.message, "error");
	    }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addSubject = e => {
	e.preventDefault();
	const form = e.target;
	const newSubject = {
	    code: form.code.value,
	    description: form.description.value
	};

	api.add("subjects", newSubject)
	    .then(() => {
		showNotif("Subject added successfully");
		form.reset();
		setShowForm(false);
		setSubjects(subjects => subjects.concat(newSubject));
	    })
	    .catch(err => {
		showNotif(err.message, "error");
	    });
    };

    const removeSubject = () => {
	api.deleteOne("subjects", selected)
	    .then(() => {
		showNotif("Subject removed successfully");
		setSubjects(subjects =>
		    subjects.filter(s => s.code !== selected));
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
		<button onClick={() => setShowForm(true)}>Add</button>
		<button onClick={removeSubject} disabled={!selected}>
		    Remove
		</button>
	    </div>
	    <hr />
	    { showForm &&
	      <form onSubmit={addSubject}>
		  <label htmlFor="subject-code">
		      Code <input id="subject-code" name="code" required/>
		  </label>
		  <label htmlFor="subject-description">
		      Description <input id="subject-description" name="description" />
		  </label>
		  <button type="submit">Save</button>{" "}
		  <button type="button" className="alt" onClick={() => setShowForm(false)}>Cancel</button>
	      </form> }
	    <table>
		<thead>
		    <tr>
			<th>Code</th>
			<th>Description</th>
		    </tr>
		</thead>
		<tbody>
		    { subjects && subjects.map(subject =>
			<tr key={subject.code}
			    onClick={() => setSelected(subject.code)}
			    style={ selected === subject.code ? selectedStyle : {} }>
			    <td>{subject.code}</td>
			    <td>{subject.description}</td>
			</tr>)
		    }
		</tbody>
	    </table>
	</section>
    );
}
