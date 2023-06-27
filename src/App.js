import React, { useState } from "react";
import { ReactComponent as Logo } from "./images/rocket.svg"
import listIcon from "./images/list.png"
import NewTaskForm from "./NewTaskForm";

function App() {
	const [todos, setTodos] = useState([])

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

	const todosElements = todos.map(({ id, title }) => (
		<li className="todo-item" key={id}>
			<input
				type="checkbox"
				onChange={() => completeTodo(id)}
			/>
			<p>{title}</p>
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
						<p>Completed<span>{todos.filter(todo => todo.complete).length}</span></p>
					</div>
					{
						todos.length === 0 
						?
						<div className="zero-todos-block">
							<hr />
							<img src={listIcon} alt="list icon"/>
							<p>You don't have tasks registered yet<br/><span>Create tasks and organize your todo list</span></p>
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