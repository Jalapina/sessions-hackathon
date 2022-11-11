import React, { useState, useEffect } from 'react';
import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import "./SessionsFeed.css"


const SessionsFeed = () => {
    return (
        <div className='container'>
            <Card title="Title">
                <div className='sessionInfo'>
                    <p>genre: house</p>
                    <p>tempo</p>
                    <p>key</p>
                    <Tag severity="danger" value="Emo"></Tag>
                    <Tag value="Emo"></Tag>
                    <Tag value="Emo"></Tag>
                </div>
                <Avatar />
            </Card>
        </div>
    )

};

export default SessionsFeed;