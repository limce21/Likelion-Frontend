import { useForm } from 'react-hook-form';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';
import { ITodo, toDoState } from '../atom';
import { useSetRecoilState } from 'recoil';

const Wrapper = styled.div`
   width: 300px;
   padding-top: 10px;
   background-color : ${(props) => props.theme.boardColor}};
   border-radius: 5px;
   min-height: 300px;
	display: flex;
	flex-direction: column;
`;

const Title = styled.h2`
	text-align: center;
	font-weight: 600;
	maring-bottom: 10px;
	font-size: 18px;
`;

interface IAreaProps {
	isDraggingOver: boolean;
	isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
	background-color: ${(props) => (props.isDraggingOver ? '#dfe6e9' : props.isDraggingFromThis ? '#b2bec3' : 'transparent')};
	flex-grow: 1;
	transition: background-color 0.3s ease-in-out;
	padding: 20px;
`;

const Form = styled.form`
	width: 100%;
	text-align: center;
	input {
		width: 90%;
	}
`;

interface IBoardProps {
	toDos: ITodo[];
	boardId: string;
}

interface IForm {
	toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
	const setToDos = useSetRecoilState(toDoState);
	const { register, setValue, handleSubmit } = useForm<IForm>();
	const onValid = ({ toDo }: IForm) => {
		const newToDo = {
			id: Date.now(),
			text: toDo
		};
		setToDos((allBoards) => {
			return {
				...allBoards,
				[boardId]: [...allBoards[boardId], newToDo]
			};
		});
		setValue('toDo', '');
	};
	return (
		<Wrapper>
			<Title>{boardId}</Title>
			<Form onSubmit={handleSubmit(onValid)}>
				<input {...register('toDo', { required: true })} placeholder={`Add task on ${boardId}`} />
			</Form>
			<Droppable droppableId={boardId}>
				{(magic, info) => (
					<Area isDraggingOver={info.isDraggingOver} isDraggingFromThis={Boolean(info.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
						{toDos.map((toDo, index) => (
							<DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
						))}
						{magic.placeholder}
					</Area>
				)}
			</Droppable>
		</Wrapper>
	);
}

export default Board;
