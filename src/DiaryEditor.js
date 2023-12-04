import React, { useRef, useState } from 'react';

export default function DiaryEditor() {
	const [state, setState] = useState({
		author: '',
		content: '',
		emotion: 1,
	});
	const authorInput = useRef();
	const contentInput = useRef();
	const handleChangeState = e => {
		console.log(e.target.name);
		console.log(e.target.value);

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

		console.log(state);
		alert('저장!');
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
				오늘의 감정 점수 : <nbsp />
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
}