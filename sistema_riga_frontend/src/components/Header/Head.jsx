import React, { useState } from 'react';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';

export default function HeaderMenu() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const itemRenderer = (item) => (
        <div className='p-menuitem-content'>
            <a className="flex align-items-center p-menuitem-link">
                <span className={item.icon} />
                <span className="mx-2">{item.label}</span>
                {item.badge && <span className="ml-auto">{item.badge}</span>}
                {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
            </a>
        </div>
    );

    let items = [
        // Items configuration...
    ];

    return (
        <div>
            <Button icon="pi pi-bars" onClick={toggleMenu} />
            <Menu model={items} popup={true} onHide={() => setMenuOpen(false)} visible={menuOpen} />
        </div>
    );
}
