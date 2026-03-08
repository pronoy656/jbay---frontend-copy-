import { ReactNode } from "react";

export interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: ReactNode;
    items?: MenuItem[];
}

export interface NavbarProps {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}
