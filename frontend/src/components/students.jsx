import { useContext, useEffect, useState } from "react";
import api from "../api";
import Ctx from "../contexts";

function StudentForm() {
    const showNotif = useContext(Ctx.Notif);

    const handleSubmit = event => {
	event.preventDefault();

	api.add("students",
		Array.from(event.target)
		.reduce((prev, curr) =>
		    ({ ...prev, [curr.name]: curr.value }),
		    {}))
	    .then(() => {
		event.target.reset();
		showNotif("Student added", "success");
	    })
	    .catch(err => {
		showNotif(err.message, "error");
	    });
    };
    
    return (
	<form onSubmit={ handleSubmit }>
	    <label htmlFor="student-number">
		Student number <input id="student-number"
				      name="studentNum"
				      type="text"
				      required />
	    </label>
	    <label htmlFor="fullname">
		Full name <input id="fullname" name="fullname" type="text" />
	    </label>
	    <label htmlFor="birth-date">
		Birth date <input id="birth-date" name="birthDate" type="date" />
	    </label>
	    <label htmlFor="branch">
		Branch <select id="branch" name="branch">
			   <option value="engineering">Engineering</option>
			   <option value="exSciences">Experimental Sciences</option>
			   <option value="humanities">Humanities</option>
		       </select>
	    </label>
	    <label htmlFor="level">
		Level <input id="level"
			     name="level"
			     type="number"
			     min="1"
			     max="10"
			     placeholder="1"
			     required
		      />
	    </label>
	    <button>Register</button>
	</form>
    );
}

function StudentTable() {
    const [students, setStudents] = useState([]);
    const showNotif = useContext(Ctx.Notif);

    useEffect(() => {
	api.getAll("students")
	    .then(arr => setStudents(arr))
	    .catch(err => {
		showNotif(err.message, "error");
	    });
    }, [showNotif]);

    return (
	<table>
	    <thead>
		<tr>
		    <th>Student number</th>
		    <th>Full name</th>
		    <th>Birth date</th>
		    <th>Branch</th>
		    <th>Level</th>
		</tr>
	    </thead>
	    <tbody>
		{
		    students.map(student =>
			<tr key={ student.studentNum }>
			    <td>{ student.studentNum }</td>
			    <td>{ student.fullname }</td>
			    <td>{ student.birthDate }</td>
			    <td>{ student.branch }</td>
			    <td>{ student.level }</td>
			</tr>)
		}
	    </tbody>
	</table>
    );
}

export default function Students() {
    const [view, setView] = useState("table");
    const showTable = () => setView("table");
    const showForm = () => setView("form");

    return (
	<section>
	    <div className="toolbar">
		{ view === "form" ?
		  <button onClick={ showTable }>Go back</button> :
		  <button onClick={ showForm }>Add student</button>
		}
	    </div>
	    <hr />
	    { view === "form" ?
	      <StudentForm /> :
	      <StudentTable />
	    }
	</section>
    );
}
