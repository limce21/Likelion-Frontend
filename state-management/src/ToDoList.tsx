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

interface IForm {
	toDo: string;
	email: string;
	password: string;
	password1: string;
}

function ToDoList() {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm<IForm>({ defaultValues: { email: '@naver.com' } });
	const onValid = (data: any) => {
		console.log(data);
	};
	console.log(errors);
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
				<input
					{...register('email', {
						required: 'Email is required',
						pattern: { value: /^[A-Za-z0-9._%+-]+@naver\.com/, message: 'Only naver.com emails allowed' }
					})}
					placeholder='Write Email'
				/>
				<span>{errors?.email?.message}</span>
				<input {...register('password', { required: 'write here', minLength: 5 })} placeholder='Password' />
				<span>{errors?.password?.message}</span>
				<input
					{...register('password1', {
						required: 'Password is required'
					})}
					placeholder='Password1'
				/>
				<span>{errors?.password1?.message}</span>
				<button>Add</button>
			</form>
		</div>
	);
}

export default ToDoList;
