import React, { useState } from 'react'
import plusIcon from "./images/plus.svg"

function NewTaskForm({ setTodos }) {
	const [title, setTitle] = useState("");

	return (
		<form className='new-task-form'
			onSubmit={(e) => {
				e.preventDefault()
				if (title.replace(" ", "").length !== 0) {
					setTodos(prevTodos => [
						...prevTodos,
						{ id: Date.now(), title: title.trim(), complete: false }
					])
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
				Create <img src={plusIcon} />
			</button>
		</form>
	)
}

export default NewTaskForm