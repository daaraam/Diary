import React, { useContext, useEffect, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryItem = ({ author, content, emotion, created_date, id }) => {
	const { onRemove, onEdit } = useContext(DiaryDispatchContext);

	const [isEdit, setIsEdit] = useState(false);
	const [localContent, setLocalContent] = useState(content);
	const localContentInput = useRef(0);

	const toggleIsEdit = () => {
		setIsEdit(!isEdit);
	};

	useEffect(() => {
		console.log(`${id}번째 아이템 랜더`);
	});

	const handleRemove = () => {
		onRemove(id);
	};
	const handleQuitEdit = () => {
		setIsEdit(false);
		setLocalContent(content);
	};

	const handleEdit = () => {
		if (localContent.length < 5) {
			localContentInput.current.focus();
			return;
		}
		onEdit(id, localContent);
		toggleIsEdit();
	};

	return (
		<div className="DiaryItem">
			<div className="info">
				<span>작성자 : {author}</span> ｜<span>감정 점수 : {emotion}</span>
				<br />
				<span className="date">{new Date(created_date).toLocaleString()}</span>
			</div>
			<span className="content">
				{isEdit ? (
					<>
						<textarea
							value={localContent}
							ref={localContentInput}
							onChange={e => {
								setLocalContent(e.target.value);
							}}
						/>
					</>
				) : (
					<>{content}</>
				)}
			</span>
			<br />
			{isEdit ? (
				<>
					<button onClick={handleQuitEdit}> 수정취소</button>
					<button onClick={handleEdit}> 수정완료</button>
				</>
			) : (
				<>
					<button onClick={handleRemove}>삭제</button>
					<button onClick={toggleIsEdit}>수정</button>
				</>
			)}
		</div>
	);
};
export default React.memo(DiaryItem);
