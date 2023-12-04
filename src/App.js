import React from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

export default function App() {
	const dummyList = [
		{
			id: 1,
			author: '홍길동',
			content: '오늘은 기분이 별로다.',
			emotion: 5,
			created_date: new Date().getTime(),
		},
		{
			id: 2,
			author: '임꺽정',
			content: '기분 최고!!',
			emotion: 1,
			created_date: new Date().getTime(),
		},
	];
	return (
		<div>
			<DiaryEditor />
			<DiaryList diaryList={dummyList} />
		</div>
	);
}
