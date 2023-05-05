import React, { useState } from 'react';
import './app.less';
import CardList from './CardList/CardList';
import TrelloLike from './TrelloLike/TrelloLike';

const App = () => {
    return (
        <>
            <h1>Drag N Drop Examples:</h1>
            <h2>Cards:</h2>
            <CardList />
            <h2>Trello like:</h2>
            <TrelloLike />
        </>
    )
};

export default App;
