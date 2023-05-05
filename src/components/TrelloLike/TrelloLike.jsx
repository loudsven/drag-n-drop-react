import React, { useState } from 'react';
import './trellolike.less';

const TrelloLike = () => {
    const [boards, setBoards] = useState([
        {
            id: 1,
            title: 'To Do',
            items: [
                { id: 1, title: 'Buy some milk' },
                { id: 2, title: 'Morning running' },
                { id: 3, title: 'Take a shower' },
            ],
        },
        {
            id: 2,
            title: 'Review',
            items: [
                { id: 4, title: 'Code review' },
                { id: 5, title: 'Fibonacci task' },
                { id: 6, title: 'Test task' },
            ],
        },
        {
            id: 3,
            title: 'Done',
            items: [
                { id: 7, title: 'Take some photos of the forest' },
                { id: 8, title: 'Drag n Drop app' },
                { id: 9, title: 'Fix a car' },
            ],
        },
    ]);
    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board);
        setCurrentItem(item);
    }

    function dragLeaveHandler(e) {
        if (currentItem) e.target.style.boxShadow = 'none';
    }

    function dragEndHandler(e) {
        setCurrentItem(null);
    }

    function dragOverHandler(e) {
        e.preventDefault();
        if (currentItem) {
            if (e.target.className === 'board__item')
                e.target.style.boxShadow = '0 .2rem .4rem grey';
        }
    }

    function dragDropHandler(e, board, item) {
        e.preventDefault();
        e.stopPropagation();
        if (currentItem) {
            e.target.style.boxShadow = 'none';

            const currentIndex = currentBoard.items.indexOf(currentItem);
            const currentBoardItems = currentBoard.items.toSpliced(
                currentIndex,
                1
            );

            if (board.id === currentBoard.id) {
                const dropIndex = currentBoardItems.indexOf(item);
                setBoards(
                    boards.map((b) => {
                        if (b.id === currentBoard.id) {
                            return {
                                ...b,
                                items: currentBoardItems.toSpliced(
                                    dropIndex + 1,
                                    0,
                                    currentItem
                                ),
                            };
                        }
                        return b;
                    })
                );
            } else {
                const dropIndex = board.items.indexOf(item);
                const dropBoardItems = board.items.toSpliced(
                    dropIndex + 1,
                    0,
                    currentItem
                );
                setBoards(
                    boards.map((b) => {
                        if (b.id === board.id) {
                            return { ...b, items: dropBoardItems };
                        }
                        if (b.id === currentBoard.id) {
                            return { ...b, items: currentBoardItems };
                        }
                        return b;
                    })
                );
            }
        }
    }

    function dropItemHandler(e, board) {
        e.preventDefault();
        if (currentItem) {
            const currentIndex = currentBoard.items.indexOf(currentItem);
            const currentBoardItems = currentBoard.items.toSpliced(
                currentIndex,
                1
            );
            setBoards(
                boards.map((b) => {
                    if (b.id === board.id) {
                        if (b.id === currentBoard.id) {
                            return {
                                ...b,
                                items: [...currentBoardItems, currentItem],
                            };
                        }
                        return { ...b, items: [...b.items, currentItem] };
                    }
                    if (b.id === currentBoard.id) {
                        return { ...b, items: currentBoardItems };
                    }
                    return b;
                })
            );
        }
    }

    return (
        <div className='boards'>
            {boards.map((board) => (
                <div
                    key={board.id}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropItemHandler(e, board)}
                    className='board'
                >
                    <h3 className='board__title'>{board.title}</h3>
                    {board.items.map((item) => (
                        <div
                            key={item.id}
                            onDragStart={(e) =>
                                dragStartHandler(e, board, item)
                            }
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDrop={(e) => dragDropHandler(e, board, item)}
                            draggable
                            className='board__item'
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TrelloLike;
