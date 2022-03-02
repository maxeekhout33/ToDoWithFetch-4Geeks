import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [list, setList] = useState([
		// {
		// 	label: "eat",
		// 	done: false,
		// },
		// {
		// 	label: "sleep",
		// 	done: false,
		// },
	]);
	const [element, setElement] = useState({
		label: "",
		done: "",
	});

	const getList = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/maxeekhout"
		);
		const body = await response.json();
		if (!response.ok) {
			createUserList();
			// alert(`${response.status} ---> ${body.msg}`);
			return;
		}
		setList(body);
	};

	const createUserList = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/maxeekhout",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([]),
			}
		);
		const body = await response.json();
		if (!response.ok) {
			alert(`Fallo el GET y el POST: ${response.status}: ${body.msg}`);
		}
		getList();
	};

	const putList = async (listaActualizada) => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/maxeekhout",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(listaActualizada),
			}
		);
		return response;
	};

	const deleteList = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/maxeekhout",
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	};

	useEffect(() => {
		getList();
	}, []);

	return (
		<div className="container py-4">
			<div className="row text-center">
				<h1>{"todos"}</h1>
			</div>
			<div className="input-group">
				<input
					className="form-control px-4"
					type={"text"}
					placeholder="What needs to be done?"
					value={element.label}
					onChange={(e) => {
						setElement({
							label: e.target.value,
							done: false,
						});
					}}
					onKeyDown={async (e) => {
						if (e.key === "Enter") {
							console.log("enter fue presionado");
							// setList((currentList) => [...currentList, element]);
							const newList = [...list, element];
							console.log(newList);
							const putResponse = await putList(newList);
							if (!putResponse.ok) {
								alert("Problema, no se pudo crear la tarea!");
								return;
							}
							setElement({
								label: "",
								done: false,
							});
							getList();
						}
					}}></input>
				<button
					type="button"
					className="btn btn-warning"
					onClick={(e) => {
						deleteList();
						setList([]);
					}}>
					Borrar tareas!
				</button>
			</div>

			<ul>
				{list.map((element, index) => {
					return (
						<li key={index}>
							{element.label}
							<span
								className="close"
								onClick={async (e) => {
									const shortenList = list.filter(
										(task, i) => {
											if (index == i) {
												return false;
											} else {
												return true;
											}
										}
									);
									const putResponse = await putList(
										shortenList
									);
									if (!putResponse.ok) {
										alert(
											"Problema, no se pudo borrar la tarea!"
										);
										return;
									}
									getList();
								}}>
								x
							</span>
						</li>
					);
				})}
			</ul>
			<div className="counter">
				{list.length == 0
					? "No tasks, add a task"
					: list.length + " item left"}
			</div>
			<div className="bottom-page-1"></div>
			<div className="bottom-page-2"></div>
		</div>
	);
};
export default Home;
