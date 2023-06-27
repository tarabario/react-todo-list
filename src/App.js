import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "./images/rocket.svg"
import listIcon from "./images/list.png"
import NewTaskForm from "./NewTaskForm";

function App() {
	const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || [])

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos))
	}, [todos])

	function deleteTodo(id) {
		setTodos(prevTodos => prevTodos.filter(item => item.id !== id))
	}

	function completeTodo(id) {
		setTodos(prevTodos => prevTodos.map(item => {
			if (item.id === id) {
				return { ...item, complete: !item.complete }
			}
			return item
		}))
	}

	const todosElements = todos.map(({ id, title, complete }) => (
		<li
			className={["todo-item", complete && "complete"].filter(Boolean).join(" ")}
			key={id}
		>
			<input
				type="checkbox"
				onChange={() => completeTodo(id)}
				checked={complete && true}
			/>
			<p className={[complete && "complete"].filter(Boolean).join(" ")}>
				{title}
			</p>
			<button
				className="button-delete-todo"
				onClick={() => deleteTodo(id)}
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
					<NewTaskForm setTodos={setTodos} />
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