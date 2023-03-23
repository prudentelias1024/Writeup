import React from 'react';
import { FaRegEye } from 'react-icons/fa';
import { GiOnTarget } from 'react-icons/gi';
import NavBar from './NavBar';

const FAQ = () => {
    return (
        <>
        
        <div>
        </div>
        <NavBar/>

        <div className="faqs top-32 relative flex flex-col bg-white  text-black">
          <div className='flex text-2xl flex-row m-auto gap-[.25em]  font-bold font-[Outfit] p-[1em]'>
          <p className='text-black'>Frequently </p>
          <p className='text-pink-500 font-[Maven] '>Asked Questions </p>
          </div>
          <div className='questions grid grid-cols-2  gap-[3em] px-[3em] '>
           <div className="question_one px-[5em] ml-[1em]">
             <GiOnTarget className='text-7xl'/>
            <p className="question font-bold font-[Outfit] text-xl">What is Inkup? </p>
            <p className="answer font-extralight leading-8 font-[Maven] mt-2">Inkup is a new generational article publishing app that allows its user to publish their contents to global audience. Inkup also provide the best tool for writers, bloggers, novelists, programmers, motivational writers and even teachers. It offers a user-friendly interface and a wide range of formatting tools to help writers create visually appealing articles. The app also allows writers to collaborate with others and receive feedback from readers. Inkup aims to empower writers to reach their full potential and build their personal brand through their writing. </p>
           </div>
        
            <div className="question_one px-[5em] ml-[1em]">
              <GiOnTarget className='text-7xl'/>
            <p className="question font-bold font-[Outfit] text-xl">How do I publish a content on Inkup? </p>
            <p className="answer font-extralight leading-8 font-[Maven] mt-1"> There are various steps (pre and actual steps) you need to take to publish.
           <b> Pre: <br></br> </b>
            1. Gather your findings, make enough research to make sure your content is fufilling its duty i.e to educate and inspire other.
            2. Find the actual words that your whole content would be centered around.
            3. Find out the best title your content need.
           <b> Actual: <br></br> </b>
            1. Create an account and login <br></br>
            2. Click on the "Create Content" <br />
            3. Use the best title for your content. <br></br>
            4. Use the best picture for your content. <br></br>
            5. Use the right tags: Using the right tags allows your audience to find you. Tags allow your to niche your content. Do not use more than 4 tags <br></br>
            6. Use Excerpt: Excerpt helps your audience to know part of your content before they actually view it, although a healthy title may not need excerpt <br></br>
            7. Minimize or Maximize content reading time: When you are  not creating an educative article don't stress your reading. Reading time can scare your potential audience off except you're not offering an  educative content
             </p>
           </div>

            <div className="question_one px-[5em] ml-[1em]">
              <GiOnTarget className='text-7xl'/>
            <p className="question font-bold font-[Outfit] text-xl">Can I use images and videos in my articles?
 </p>
            <p className="answer font-extralight leading-8 font-[Maven]">Inkup allows user to add image to an article. Video embedding and video adding is not available for now. </p>
           </div>

            <div className="question_one px-[5em] ml-[1em]">
              <GiOnTarget className='text-7xl'/>
            <p className="question font-bold font-[Outfit] text-xl">Is there a limit to the number of articles I can publish </p>
            <p className="answer font-extralight leading-8 font-[Maven]">No, there is no limit to hoe many article that can be published by a user on Inkup </p>
           </div>
            <div className="question_one px-[5em]  ml-[1em]">
              <GiOnTarget className='text-7xl'/>
           <div> <p className="question font-bold font-[Outfit] text-xl">How do I promote my articles to reach more readers? </p>
            <p className="answer font-extralight leading-8 font-[Maven]">You can share your post link on Social Media platforms to increase your audience but our algorithm helps you to reach a broader audience</p></div>
           </div>
            <div className="question_one px-[5em]  ml-[1em]">
              <GiOnTarget className='text-7xl'/>
           <div> <p className="question font-bold font-[Outfit] text-xl">Can I see how many people have read my articles? </p>
            <p className="answer font-extralight leading-8 font-[Maven]">To see the number of views your content have:
            1.Click on your profile picture <br />
            2.Click on Dashboard <br />
            3.Scroll/Go to where the post is, check the number of views  <br /> <p className='inline-flex'> e.g   <FaRegEye  className='mt-1 mx-1 text-gray-500 text-2xl'/> 9 </p>
            
            </p></div>
           </div>
            <div className="question_one px-[5em]  ml-[1em]">
              <GiOnTarget className='text-7xl'/>
           <div> <p className="question font-bold font-[Outfit] text-xl">How do I promote my articles to reach more readers? </p>
            <p className="answer font-extralight leading-8 font-[Maven]">You can share your post link on Social Media platforms to increase your audience but our algorithm helps you to reach a broader audience</p></div>
           </div>
        
          </div>
        </div>
        </>
    );
}

export default FAQ;
