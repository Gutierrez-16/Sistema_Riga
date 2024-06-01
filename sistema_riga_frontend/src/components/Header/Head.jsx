import React from 'react';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

const DataCards = () => {
    const cardData = [
        {
            title: 'Orders',
            value: '152',
            subtitle: '24 new since last visit',
            icon: 'pi pi-shopping-cart',
            iconColor: 'blue',
        },
        {
            title: 'Revenue',
            value: '$2,100',
            subtitle: '52% since last week',
            icon: 'pi pi-dollar',
            iconColor: 'green',
        },
        {
            title: 'Customers',
            value: '28,441',
            subtitle: '520 newly registered',
            icon: 'pi pi-users',
            iconColor: 'orange',
        },
        {
            title: 'Comments',
            value: '152 Unread',
            subtitle: '85 responded',
            icon: 'pi pi-comments',
            iconColor: 'purple',
        }
    ];

    return (
        <div className="p-grid">
            {cardData.map((card, index) => (
                <div key={index} className="p-col-12 p-md-3">
                    <Card title={card.title} subTitle={card.subtitle}>
                        <div className="p-d-flex p-jc-between">
                            <span className={`pi ${card.icon}`} style={{ fontSize: '2em', color: card.iconColor }}></span>
                            <h2>{card.value}</h2>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
}

export default DataCards;
