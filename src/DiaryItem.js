import React from 'react';

export default function DiaryItem({ author, content, emotion, created_date }) {
	return (
		<div className="DiaryItem">
			<div className="info">
				<span>작성자 : {author}</span> ｜ <nbsp />
				<span>감정 점수 : {emotion}</span>
				<br />
				<span className="date">{new Date(created_date).toLocaleString()}</span>
				<br />
			</div>
			<span className="content"> {content}</span>
		</div>
	);
}
