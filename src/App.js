import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// https://jsonplaceholder.typicode.com/comments

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'INIT': {
			return action.data;
		}
		case 'CREATE': {
			const created_date = new Date().getTime();
			const newItem = {
				...action.data,
				created_date,
			};
			return [newItem, ...state];
		}
		case 'REMOVE': {
			return state.filter(item => item.id !== action.targetId);
		}
		case 'EDIT': {
			return state.map(item => (item.id === action.targetId ? { ...item, content: action.newContent } : item));
		}
		default:
			return state;
	}
};
export default function App() {
	// const [data, setData] = useState([]);

	const [data, dispatch] = useReducer(reducer, []);
	const dataId = useRef(0);

	const getData = async () => {
		const res = await fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json());
		const initData = res.slice(0, 20).map(item => {
			return {
				author: item.email,
				content: item.body,
				emotion: Math.floor(Math.random() * 5) + 1,
				//0~4까지의 랜덤한 수를 만드는 Math.random()*5
				//정수로 바꿔준 뒤에 1을 더하면
				//1~5까지의 랜덤한 수를 구할 수 있다.
				created_date: new Date().getTime(),
				id: dataId.current++,
			};
		});
		dispatch({ type: 'INIT', data: initData });
		// setData(initData);
	};

	useEffect(() => {
		getData();
	}, []);

	const onCreate = useCallback((author, content, emotion) => {
		dispatch({ type: 'CREATE', data: { author, content, emotion, id: dataId.current } });
		// const created_date = new Date().getTime();
		// const newItem = {
		// 	author,
		// 	content,
		// 	emotion,
		// 	created_date,
		// 	id: dataId.current,
		// };
		dataId.current += 1;
		// setData(data=>[newItem, ...data]);
	}, []);

	// const onRemove = targetId => {
	// 	const newDiaryList = data.filter(item => item.id !== targetId);
	// 	setData(newDiaryList);
	// };
	// setData로 상태를 업데이트 할때 직접 함수 내부에서 상태를 조작해야 (=함수형 업데이트) 최신 상태 제공 + 성능 최적화에 유용하다.

	const onRemove = useCallback(targetId => {
		dispatch({ type: 'REMOVE', targetId });
		// setData(data => data.filter(item => item.id !== targetId));
	}, []);

	// const onEdit = (targetId, newContent) => {
	// 	setData(data.map(item => (item.id === targetId ? { ...item, content: newContent } : item)));
	// };

	const onEdit = useCallback((targetId, newContent) => {
		dispatch({
			type: 'EDIT',
			targetId,
			newContent,
		});
		// setData(data => data.map(item => (item.id === targetId ? { ...item, content: newContent } : item)));
	}, []);

	const memoizedDispatches = useMemo(() => {
		return { onCreate, onRemove, onEdit };
	}, []);

	const getDiaryAnalysis = useMemo(() => {
		const goodCount = data.filter(item => item.emotion >= 3).length;
		const badCount = data.length - goodCount;
		const goodRatio = (goodCount / data.length) * 100;
		return { goodCount, badCount, goodRatio };
	}, [data.length]);

	const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
	return (
		<DiaryStateContext.Provider value={data}>
			<DiaryDispatchContext.Provider value={memoizedDispatches}>
				<div className="App">
					<DiaryEditor />
					<div>전체 일기 : {data.length}</div>
					<div>기분 좋은 일기 개수 : {goodCount}</div>
					<div>기분 나쁜 일기 개수 : {badCount}</div>
					<div>기분 좋은 일기 비율 : {goodRatio}% </div>
					<DiaryList />
				</div>
			</DiaryDispatchContext.Provider>
		</DiaryStateContext.Provider>
	);
}
