import React from 'react';
import NavBar from '../NavBar';
import  Tag  from "../tags/tag";
import TagCard from './TagCard';
const TagTemplate = () => {
    return (
        <>
        
        <NavBar/>
        
        <div className="top-32 relative flex-col ">
          <TagCard/>
        </div>
        </>
    );
}

export default TagTemplate;
