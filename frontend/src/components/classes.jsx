import { useContext, useEffect, useState } from "react";
import { days, branches } from "../static-data";
import api from "../api";
import Ctx from "../contexts";

function ClassForm({ onAdd, onCancel }) {
    const [subjects, setSubjects] = useState();
    const [teachers, setTeachers] = useState();
    const showNotif = useContext(Ctx.Notif);

    useEffect(() => {
	api.getAll("subjects")
	    .then(res => setSubjects(res))
	    .catch(err => {
		showNotif(err.message, "error");
	    });

	api.getAll("teachers")
	    .then(res => setTeachers(res))
	    .catch(err => {
		showNotif(err.message, "error");
	    }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addClass = e => {
	e.preventDefault();
	const form = e.target;

	api.add("classes", {
	    day: form.day.value,
	    branch: form.branch.value,
	    level: form.level.value,
	    subject: form.subject.value,
	    timeframe: [form.timeframeStart.value, form.timeframeEnd.value],
	    teacher: form.teacher.value
	})
	    .then(() => {
		onAdd();
		showNotif("Classes added successfully");
		form.reset();
	    })
	    .catch(err => {
		showNotif(err.message, "error");
	    });
    };
    
    return (
	<form onSubmit={addClass}>
	    <label htmlFor="class-day">Week Day</label>
	    <select id="class-day" name="day">
		{ days.map((day, i) =>
		    <option value={i} key={day}>{day}</option>)
		}
	    </select>
	    <label htmlFor="class-branch">Branch</label>
	    <select id="class-branch" name="branch">
		{ branches.map(branch =>
		    <option value={branch} key={branch}>{branch}</option>)
		}
	    </select>
	    <label htmlFor="class-level">Level</label>
	    <input id="class-level"
		   type="number"
		   name="level"
		   min="1"
		   max="10"
		   defaultValue="1"/>
	    <label htmlFor="class-subject">Subject</label>
	    <select id="class-subject" name="subject">
		{ subjects?.map(subject =>
		    <option value={subject.code} key={subject.code}>
			{subject.code}
		    </option>)
		}
	    </select>
	    <label htmlFor="class-timeframe">Time frame: from</label>
	    <input id="class-timeframe"
		   name="timeframeStart"
		   type="number"
		   min="0"
		   max="23"
		   placeholder="08" />
	    to <input name="timeframeEnd"
		      type="number"
		      min="0"
		      max="23"
		      placeholder="10" />
	    <label htmlFor="class-teacher">Teacher</label>
	    <select id="class-teacher" name="teacher">
		{ teachers?.map(teacher =>
		    <option value={teacher._id} key={teacher._id}>
			{teacher.fullname}
		    </option>)
		}
	    </select>
	    <button type="submit">Save</button>
	    <button type="button" className="alt" onClick={onCancel}>Cancel</button>
	</form>
    );
}

export default function Classes() {
    const showNotif = useContext(Ctx.Notif);
    const [classes, setClasses] = useState();
    const [trigger, setTrigger] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selected, setSelected] = useState();
    const refreshData = () => setTrigger(bit => !bit);

    useEffect(() => {
	api.getAll("classes")
	    .then(res => setClasses(res))
	    .catch(err => {
		showNotif(err.message, "error");
	    }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger]);

    const classesPerDay = days.map(day => ({ name: day,	classes: [] }));

    classes?.forEach(c => {
	classesPerDay[c.day].classes.push(c);
    });

    const removeClass = () => {
	api.deleteOne("classes", selected)
	    .then(() => {
		showNotif(`Class removed successfully`);
		setClasses(classes =>
		    classes.filter(c => c._id !== selected));
		setSelected(null);
	    })
	    .catch(err => {
		showNotif(err.message, "error");
	    });
    };

    return (
	<section>
	    <div className="toolbar">
		<button onClick={() => setShowForm(true)}>Add</button>
		<button onClick={removeClass} disabled={!selected}>Remove</button>
	    </div>
	    <hr />
	    { showForm && <ClassForm
			      onAdd={refreshData}
			      onCancel={() => setShowForm(false)}/>
	    }
	    <table>
		<tbody>
		    <tr>
			<th></th>
			<td>
			    <table>
				<thead>
				    <tr>
					<th>Branch</th>
					<th>Level</th>
					<th>Subject</th>
					<th>Time Frame</th>
					<th>Teacher</th>
				    </tr>
				</thead>
			    </table>
			</td>
		    </tr>
		    { classesPerDay.map(day =>
			<tr key={day.name}>
			    <th>{day.name}</th>
			    <td>
				{ day.classes.length === 0 ?
				  null :
				  <table>
				      <tbody>
					  { day.classes.map(c =>
					      <tr key={c._id}
						  onClick={() => setSelected(c._id)}
						  className={selected === c._id ? "selected" : ""}>
						  <td>{c.branch}</td>
						  <td>{c.level}</td>
						  <td>{c.subject}</td>
						  <td>{c.timeframe.join(" - ")}</td>
						  <td>{c.teacher.fullname}</td>
					      </tr>)
					  }
				      </tbody>
				  </table>
				}
			    </td>		      
			</tr>)
		    }
		</tbody>
	    </table>
	</section>
    );
}
