import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
    return (
        <Menu>
            <a className="menu-item" href="/dashboard">
                Übersicht
            </a>

            <a className="menu-item" href="/laravel">
                Profil
            </a>

            <a className="menu-item" href="/angular">
                Leistungen
            </a>

            <a className="menu-item" href="/react">
                Beschreibung
            </a>

            <a className="menu-item" href="/vue">
                Medien
            </a>

            <a className="menu-item" href="/node">
                Veranstaltungen
            </a>
            <a className="menu-item" href="/node">
                Preise
            </a>
            <a className="menu-item" href="/node">
                Extras
            </a>
            <a className="menu-item" href="/node">
                Bewertungen übernehmen
            </a>
        </Menu>
    );
};