import React from 'react';
import Banner from './Banner/Banner';
import NewzLatter from './NewzLatter/NewzLatter';
import RecentBlogs from './RecentBlogs/RecentBlogs';
import Tips from './Tips/Tips';
import usePageTitle from '../PageTitle/PageTitle';
import ExtraSection from '../Pages/ExtraSection/ExtraSection';

const Home = () => {
    usePageTitle('Home');

    return (
        <div>
            <Banner/>
            <RecentBlogs/>
            <ExtraSection/>
            <Tips/>
            <NewzLatter/>
        </div>
    );
};

export default Home;