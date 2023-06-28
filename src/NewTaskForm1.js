import React, { useState } from 'react'
import plusIcon from "./images/plus.svg"
import { ACTIONS } from "./App1"

function NewTaskForm1({ dispatch }) {
	const [title, setTitle] = useState("");
	
	return (
		<form className='new-task-form'
			onSubmit={(e) => {
				e.preventDefault()
				if (title.replace(" ", "").length !== 0) {
					dispatch({ type: ACTIONS.ADD_TODO, payload: { title } })
					setTitle("")
				}
			}
			}
		>
			<input
				className='new-task-input'
				type="text"
				placeholder="what you want to do?  "
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<button className="new-task-button" type="submit">
				Create <img src={plusIcon} alt="" />
			</button>
		</form>
	)
}

export default NewTaskForm1