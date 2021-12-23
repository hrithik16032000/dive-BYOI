import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';


export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <AiIcons.AiFillInteraction />,
        className: 'nav-text'
    },
    {
        title: 'Streams',
        path: '/streams',
        icon: <IoIcons.IoIosPaper />,
        className: 'nav-text'
    },
    {
        title: 'Chat',
        path: '/chat',
        icon: <FaIcons.FaEnvelopeOpenText />,
        className: 'nav-text'
    },
    {
        title: 'Friends',
        path: '/friends',
        icon: <IoIcons.IoMdHelpCircle />,
        className: 'nav-text'
    },
    {
        title: 'Team Dopa',
        path: '/team',
        icon: <IoIcons.IoMdPeople />,
        className: 'nav-text'
    },
]