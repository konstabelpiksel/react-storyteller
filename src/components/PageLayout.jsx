import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
// import Navigation from './Navigation';

// Pages
import Splash from '../pages/Splash';
import LocalMS from '../pages/LocalMS';

//https://github.com/Hank-D-Tank/react-page-transitions/blob/main/src/components/Navigation.jsx

// Map of paths to page configurations
const PAGES = {
    '/': {
        color: '#ff0000',
        component: Splash
    },
    '/localms': {
        color: '#0066ff',
        component: LocalMS
    },
    // '/vrbox': {
    //     color: '#0066ff',
    //     component: VrBox
    // },
    // '/dashboardweb': {
    //     color: '#00cc66',
    //     component: DashboardWeb
    // },
    // '/dashboardvr': {
    //     color: '#ff6600',
    //     component: DashboardVR
    // }
};

const PageLayout = () => {

    const location = useLocation();
    const [isAnimating, setIsAnimating] = useState(false);

    // Get current page config
    const currentPage = PAGES[location.pathname] || PAGES['/'];

    // Handle route changes
    // useEffect(() => {
    //     const handleRouteChange = async () => {
    //         setIsAnimating(true);
    //         await new Promise(resolve => setTimeout(resolve, 600));
    //         setIsAnimating(false);
    //     };

    //     handleRouteChange();
    // }, [location.pathname]);

    return (
        <Routes location={location}>
            {Object.entries(PAGES).map(([path, { component: Component }]) => (
                <Route
                    key={path}
                    path={path}
                    element={<Component />}
                />
            ))}
        </Routes>

    );
};

export default PageLayout; 