"use client"
import React, { useEffect, useState } from 'react'
import { manual } from '../../styles/font';
import BlogCard from './BlogCard';
import { collection, doc, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import firebase_app from '../../firebase/config';

import { PageButtonLoader } from '../Button/buttonload';

const BlogSectionHome = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ optionsList, setOptionsList ] = useState<[]| any[]>([]);
  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(getFirestore(firebase_app), 'Article'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const recipients:any[]  = [];
        querySnapshot.forEach((doc) => {
            recipients.push({...doc.data(), id: doc.id} as any);
        });
        setOptionsList([...recipients])
    });
    setIsLoading(false);
    return () => {
      unsubscribe();
    };
  }, [])
  return (
    <div className='md:px-[80px] px-7 xl:px-[120px]' >
        <h1 className={`text-[#CC2630] font-medium xl:text-[56px] md:text-[42px] text-[16px] ${manual.className} xl:pt-[150px] pt-8 md:pt-[60px] phoneTab:pb-[6px] phone:pb-[10px]`} >Our Blog</h1>
        {isLoading ? <div className='h-screen w-screen flex justify-center items-center' >
                <div className='h-[60px] w-[60px]' >
                    <PageButtonLoader />
                </div>
            </div>  : <div className='xl:pb-[121px] pb-[40px] md:pb-[64px] flex flex-wrap phoneTab:flex-col xl:gap-x-12 phone:gap-x-[19px]' >
            {optionsList?.map((option)=> <BlogCard key={option?.id} data={option} />)}
        </div>}
    </div>
  )
}

export default BlogSectionHome