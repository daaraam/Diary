import React, { useRef, useState } from 'react';

export default function DiaryItem({ author, content, emotion, created_date, onRemove, id, onEdit }) {
	const [isEdit, setIsEdit] = useState(false);
	const [localContent, setLocalContent] = useState(content);
	const localContentInput = useRef(0);
	const toggleIsEdit = () => {
		setIsEdit(!isEdit);
	};
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
				<span>작성자 : {author}</span> ｜ <nbsp />
				<span>감정 점수 : {emotion}</span>
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
}
