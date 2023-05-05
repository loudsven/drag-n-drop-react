import React from 'react';
import './card.less';

const Card = ({
    card,
    dragStartHandler,
    dragLeaveHandler,
    dragEndHandler,
    dragOverHandler,
    dragDropHandler,
}) => {
    return (
        <div
            draggable
            onDragStart={(e) => dragStartHandler(e, card)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dragDropHandler(e, card)}
            className='card'
        >
            {card.text}
        </div>
    );
};

export default Card;
