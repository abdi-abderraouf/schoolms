import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
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
	<form className="card resp-flex" onSubmit={addClass}>
	    <label htmlFor="class-day">	Week Day
		<select id="class-day" name="day">
		    { days.map((day, i) =>
			<option value={i} key={day}>{day}</option>)
		    }
		</select>
	    </label>
	    <label htmlFor="class-branch">Branch
		<select id="class-branch" name="branch">
		    { branches.map(branch =>
			<option value={branch} key={branch}>{branch}</option>)
		    }
		</select>
	    </label>
	    <label htmlFor="class-level">Level
		<input id="class-level"
		       type="number"
		       name="level"
		       min="1"
		       max="10"
		       defaultValue="1"/>
	    </label>
	    <label htmlFor="class-subject">Subject
		<select id="class-subject" name="subject">
		    { subjects?.map(subject =>
			<option value={subject.code} key={subject.code}>
			    {subject.code}
			</option>)
		    }
		</select>
	    </label>
	    <label htmlFor="class-timeframe">From
		<input id="class-timeframe"
		       name="timeframeStart"
		       type="number"
		       min="0"
		       max="23"
		       placeholder="08" />
	    </label>
	    <label htmlFor="class-timeframeEnd">To
		<input id="class-timeframeEnd"
		       name="timeframeEnd"
		       type="number"
		       min="0"
		       max="23"
		       placeholder="10" />
	    </label>
	    <label htmlFor="class-teacher">Teacher
		<select id="class-teacher" name="teacher">
		    { teachers?.map(teacher =>
			<option value={teacher._id} key={teacher._id}>
			    {teacher.fullname}
			</option>)
		    }
		</select>
	    </label>
	    <div style={{
		     display: "flex",
		     justifyContent: "flex-start",
		     alignItems: "center" }}>
		<button type="submit">Save</button>
		<button type="button" className="alt" onClick={onCancel}>
		    Cancel
		</button>
	    </div>
	</form>
    );
}

function Cell({ w, content, normalize }) {
    return (
	<div className="schedule-cell"
	     style={{width: `${normalize ? w/.82 : w}%`}}>
	    {content}
	</div>
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
		<button onClick={() => setShowForm(true)}>
		    <FontAwesomeIcon icon={faPlus} /> Add
		</button>
		<button onClick={removeClass} disabled={!selected}>
		    <FontAwesomeIcon icon={faXmark} /> Remove
		</button>
	    </div>
	    <hr />
	    { showForm &&
	      <ClassForm
		  onAdd={refreshData}
		  onCancel={() => setShowForm(false)}/>
	    }
	    <div style={{ margin: "1rem 0 2rem"}}>
		<div className="header-row flex">
		    <Cell w="18" content="Day" />
		    <Cell w="20" content="Branch" />
		    <Cell w="10" content="Level" />
		    <Cell w="15" content="Subject" />
		    <Cell w="12" content="Time" />
		    <Cell w="20" content="Teacher" />
		</div>
		{ classesPerDay.map(day =>
		    <div key={day.name}>
			<div className="day-row flex" key={day.name}>
			    <Cell w="18" content={day.name} />
			    <div className="classes-cell">
				{ Boolean(day.classes.length) &&
				  day.classes.map(c =>
				      <div key={c._id}
					   onClick={() => setSelected(c._id)}
					   className={"class-row flex " +
						      (selected === c._id ? "selected" : "")}>
					  <Cell w="20" normalize={true} content={c.branch} />
					  <Cell w="10" normalize={true} content={c.level} />
					  <Cell w="15" normalize={true} content={c.subject} />
					  <Cell w="12" normalize={true} content={c.timeframe.join(" - ")} />
					  <Cell w="20" normalize={true} content={c.teacher?.fullname} />
				      </div>)
				}
			    </div> 
			</div>
			<div style={{ width: "95%", borderBottom: "1px dashed #E63946"}}></div>
		    </div>)
		}
	    </div>
	</section>
    );
}
