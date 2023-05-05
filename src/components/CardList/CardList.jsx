import React, { useState } from 'react';
import './cardlist.less';
import Card from './Card/Card';

const CardList = () => {
    const [cardList, setCardList] = useState([
        { id: 1, order: 3, text: 'Card: 3' },
        { id: 2, order: 1, text: 'Card: 1' },
        { id: 3, order: 2, text: 'Card: 2' },
        { id: 4, order: 4, text: 'Card: 4' },
    ]);
    const [currentCard, setCurrentCard] = useState(null);

    function dragStartHandler(e, card) {
        setCurrentCard(card);
    }

    function dragLeaveHandler(e) {
        if (currentCard) e.target.classList.remove('card--hover');
    }

    function dragEndHandler(e) {
        setCurrentCard(null);
    }

    function dragOverHandler(e) {
        e.preventDefault();
        if (currentCard) e.target.classList.add('card--hover');
    }

    function dragDropHandler(e, card) {
        e.preventDefault();
        if (currentCard) {
            e.target.classList.remove('card--hover');
            setCardList(cardList.map((c) => swapCardsOrders(c, card)));
        }
    }

    const swapCardsOrders = (a, b) => {
        let result;
        if (a.id === b.id) {
            result = { ...a, order: currentCard.order };
        } else if (a.id === currentCard.id) {
            result = { ...a, order: b.order };
        } else {
            result = a;
        }
        return result;
    };

    const sortCards = (a, b) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    };

    return (
        <div className='card-list'>
            {cardList.sort(sortCards).map((card) => (
                <Card
                    key={card.id}
                    dragStartHandler={dragStartHandler}
                    dragLeaveHandler={dragLeaveHandler}
                    dragEndHandler={dragEndHandler}
                    dragOverHandler={dragOverHandler}
                    dragDropHandler={dragDropHandler}
                    card={card}
                />
            ))}
        </div>
    );
};

export default CardList;
