import { useState } from 'react';
import { useForm } from 'react-hook-form';

/*
function ToDoList() {
	const [toDo, setToDo] = useState('');
	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
		const {
			currentTarget: { value }
		} = event;
		setToDo(value);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(toDo);
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input onChange={onChange} value={toDo} placeholder='Write to do' />
				<button>Add</button>
			</form>
		</div>
	);
}
*/

function ToDoList() {
	const { register, watch, handleSubmit, formState } = useForm();
	const onValid = (data: any) => {
		console.log(data);
	};
	console.log(formState.errors);
	return (
		<div>
			<form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onValid)}>
				<input
					{...register('toDo', {
						required: 'To-Do is required',
						minLength: {
							value: 5,
							message: 'Too Short'
						}
					})}
					placeholder='Write to do'
				/>
				<button>Add</button>
			</form>
		</div>
	);
}

export default ToDoList;
