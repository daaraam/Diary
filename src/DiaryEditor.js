import React, { useContext, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryEditor = () => {
	const { onCreate } = useContext(DiaryDispatchContext);
	// 객체이기때문에 비구조할당으로 가져와야함
	const authorInput = useRef();
	const contentInput = useRef();
	const [state, setState] = useState({
		author: '',
		content: '',
		emotion: 1,
	});
	const handleChangeState = e => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = e => {
		if (state.author.length < 1) {
			authorInput.current.focus();
			return;
		}
		if (state.content.length < 5) {
			contentInput.current.focus();
			return;
		}
		onCreate(state.author, state.content, state.emotion);
		alert('저장!');
		setState({
			author: '',
			content: '',
			emotion: 1,
		});
	};

	return (
		<div className="DiaryEditor">
			<h2>오늘의 일기</h2>
			<div>
				<input name="author" value={state.author} onChange={handleChangeState} ref={authorInput} />
			</div>
			<div>
				<textarea name="content" value={state.content} onChange={handleChangeState} ref={contentInput} />
			</div>

			<div>
				오늘의 감정 점수 :
				<select name="emotion" value={state.emotion} onChange={handleChangeState}>
					{' '}
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
				</select>
			</div>

			<div>
				<button onClick={handleSubmit}>일기 저장하기</button>
			</div>
		</div>
	);
};
export default React.memo(DiaryEditor);
