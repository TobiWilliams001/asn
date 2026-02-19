"use client"
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer/Footer'
import SingleBlogHero from '../../../components/Hero/SingleBlogHero'
import BlogContent from '../../../components/BlogContent/BlogContent'
import { DocumentData, collection, doc, getDoc, getFirestore } from 'firebase/firestore'
import firebase_app from '../../../firebase/config'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { PageButtonLoader } from '../../../components/Button/buttonload'

const Page = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const auth = getAuth(firebase_app);
  const [articleData, setArticleData] = useState<DocumentData | null>(null);
  useEffect(() => {
    setLoading(true)
    const getDocument = async () => {
      try {
        const documentRef = doc(collection(getFirestore(firebase_app), 'Article'), params.id);
        //   const documentRef = doc(collection(getFirestore(), "'Article'"), params.id);
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          // Document data is in documentSnapshot.data()
          setArticleData(documentSnapshot.data());
          setLoading(false)
        } else {
          console.log('Document not found!');
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching document:', error);
        setLoading(false)
      }
    };
    getDocument();
  }, [params.id])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setEdit(true);
        // console.log(user)
      } else {
        setEdit(false);
      }
    });
    return () => unsubscribe();
  }, [auth])

  return (
    <main className="min-h-screen w-full">
      {loading ? <div className='h-screen w-screen flex justify-center items-center' >
        <div className='h-[60px] w-[60px]' >
          <PageButtonLoader />
        </div>
      </div> :
        <>
          <SingleBlogHero id={params?.id} edit={edit} articleData={articleData} />
          <BlogContent articleData={articleData} />
          <Footer />
        </>}
    </main>
  )
}

export default Page