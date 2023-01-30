import NavBar from './NavBar';
import Posts from './Posts';
import SideNavBar from './SideNavBar';
import TagTopics from './TagTopics';

export default function Home({loggedIn}){
    return(
        <>
        <NavBar showAuthAction={true} showSearchBar={true}/>
        <div className='flex flex-row gap-2 ml-4'>
        <SideNavBar/>
     <Posts/>
     <TagTopics/>
</div>
        </>
    );
}