import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';

const SidebarMenu = () => {
    const items = [
        { label: 'Form Layout', icon: 'pi pi-fw pi-id-card' },
        { label: 'Input', icon: 'pi pi-fw pi-check-square' },
        { label: 'Float Label', icon: 'pi pi-fw pi-bookmark' },
        { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-triangle' },
        { label: 'Button', icon: 'pi pi-fw pi-mobile' },
        { label: 'Table', icon: 'pi pi-fw pi-table' },
        { label: 'List', icon: 'pi pi-fw pi-list' },
        { label: 'Tree', icon: 'pi pi-fw pi-sitemap' },
        { label: 'Panel', icon: 'pi pi-fw pi-tablet' },
        { label: 'Overlay', icon: 'pi pi-fw pi-clone' },
        { label: 'Media', icon: 'pi pi-fw pi-image' },
        { label: 'Menu', icon: 'pi pi-fw pi-bars' }
    ];

    return (
        <div className="card">
            <Menu model={items} />
        </div>
    );
}

export default SidebarMenu;
