import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar'; 
import Logout from '../Login/loguotbutton';
import Header from './Header';

export default function TemplateDemo() {
    const [showHeader, setShowHeader] = useState(true);

    const toggleHeader = () => {
        setShowHeader(!showHeader);
    };

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link" onClick={toggleHeader}>
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const menuItems = [
        {
            label: 'Toggle Header',
            icon: 'pi pi-bars',
            command: toggleHeader
        },
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            badge: 3,
            template: itemRenderer
        }
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
            <Logout  /> 
        </div>
    );

    return (
        <div className="card">
            <Menubar model={menuItems} start={start} end={end} />
            {showHeader && <Header />}
        </div>
    )
}
