import React, { useReducer, useEffect } from "react";
import { ReactComponent as Logo } from "./images/rocket.svg"
import listIcon from "./images/list.png"
import NewTaskForm1 from "./NewTaskForm1";

export const ACTIONS = {
	ADD_TODO: "add-todo",
	DELETE_TODO: "delete-todo",
	COMPLETE_TODO: "complete-todo"
}

function reducer(todos, { type, payload }) {
	switch (type) {
		case ACTIONS.ADD_TODO:
			return [
				...todos,
				{ id: Date.now(), title: payload.title.trim(), complete: false }
			]

		case ACTIONS.DELETE_TODO:
			return todos.filter(item => item.id !== payload.id)

		case ACTIONS.COMPLETE_TODO:
			return todos.map(item => {
				if (item.id === payload.id) {
					return { ...item, complete: !item.complete }
				}
				return item
			})
	}
}

function App() {
	const [todos, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem("todos")) || [])

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos))
	}, [todos])

	const todosElements = todos.map(({ id, title, complete }) => (
		<li
			className={["todo-item", complete && "complete"].filter(Boolean).join(" ")}
			key={id}
		>
			<input
				type="checkbox"
				onChange={() => dispatch({ type: ACTIONS.COMPLETE_TODO, payload: { id } })}
				checked={complete && true}
			/>
			<p className={[complete && "complete"].filter(Boolean).join(" ")}>
				{title}
			</p>
			<button
				className="button-delete-todo"
				onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id } })}
			></button> 
		</li>
	))
	
	
	return (
		<>
			<header>
				<Logo className="header-logo"/>
				<h1 className="h1">to<span>do</span></h1>
			</header>
			<main>
				<div className="container">
					<NewTaskForm1 dispatch={dispatch} />
					<div className="status-bar">
						<p>Created tasks<span>{todos.length}</span></p>
						<p>
							Completed<span>{todos.filter(todo => todo.complete).length} of {todos.length}</span>
						</p>
					</div>
					{
						todos.length === 0 
						?
						<div className="zero-todos-block">
							<hr />
							<img src={listIcon} alt="list icon"/>
							<p>
								You don't have tasks registered yet<br/><span>Create tasks and organize your todo list</span>
							</p>
						</div>
						:
						<ul className="todos-list">
							{todosElements}
						</ul>
					}
				</div>
			</main>     
		</>
	);
}

export default App;