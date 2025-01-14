import { useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoState } from '../atom';

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name }
		} = event;
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			const oldToDo = oldToDos[targetIndex];
			const newToDo = { text, id, category: name as any };
			console.log('replace the to do in the index', targetIndex, 'with', newToDo);
			return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
		});
	};
	return (
		<li>
			<span>{text}</span>
			{category !== Categories.TO_DO && (
				<button name={Categories.TO_DO} onClick={onClick}>
					ToDo
				</button>
			)}
			{category !== Categories.DOING && (
				<button name={Categories.DOING} onClick={onClick}>
					Doing
				</button>
			)}
			{category !== Categories.DONE && (
				<button name={Categories.DONE} onClick={onClick}>
					Done
				</button>
			)}
		</li>
	);
}

export default ToDo;
