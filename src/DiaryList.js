import React from 'react';
import DiaryItem from './DiaryItem';
// DiaryList.defaultProps = {
// 	diaryList: [],
// };
export default function DiaryList({ diaryList, onRemove, onEdit }) {
	console.log(diaryList);

	return (
		<div className="DiaryList">
			<h2>일기 리스트</h2>
			<h4>{diaryList.length}개의 리스트가 있습니다.</h4>
			<div>
				{diaryList.map(item => (
					<DiaryItem key={item.id} {...item} onRemove={onRemove} onEdit={onEdit} />
				))}
			</div>
		</div>
	);
}
