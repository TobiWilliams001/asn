"use client"
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react'
import { AuthContextProvider, useAuthContext } from '../../context/AuthContext'
import { useFormik } from 'formik';
import { ArticleValidations } from '../../helpers/formvalidations';
import { ArticleInterface } from '../../interface';
import { useRouter } from 'next/navigation';
import { createArticle } from '../../firebase/auth/login';
import { PageButtonLoader, SecondButtonLoader } from '../../components/Button/buttonload';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';
import firebase_app from '../../firebase/config';

const Home = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingPage, setLoadingpage] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [dragActive, setDragActive] = React.useState(false);
    const [user, setUser] = useState<DocumentData | null>(null);
    const auth = getAuth(firebase_app);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
          description: "",
          title: "",
          category: "",
          body: "",
          image: "",
          author: "",
        },
        validationSchema: ArticleValidations,
        onSubmit: async (values: ArticleInterface) => {
          setLoading(true);
        //   console.log(user?.uid, user)
          const { result, error } = await createArticle({...values, id: user?.uid, dateAdded: new Date()});
            // if(result) router.push(`/home`)
            if(error) {
              if(typeof error === "string") {
                setError(error);
                setLoading(false);
                return
              }
            }
            setError("");
            setLoading(false);
            return router.push(`/blog/${result}`);
        },
      });
      const { values, errors, handleChange, handleSubmit, touched, setFieldValue } = formik;

      useEffect(() => {
        setLoadingpage(true);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user) {
                setUser(user);
                // console.log(user)
            } else {
                setUser(null);
                setLoadingpage(false);
                router.push("/");
            }
            setLoadingpage(false);
        });

        return () => unsubscribe();
    }, [auth, router]);

      // handle drag events
    const handleDrag = function(e: any) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
        } else if (e.type === "dragleave") {
        setDragActive(false);
        }
    };
    
    // triggers when file is dropped
    const handleDrop = function(e:any, name: string) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setFieldValue(name, e.dataTransfer.files[0])
        // handleFiles();
        }
    };
  return (
    // <AuthContextProvider>
        <div className='h-screen w-full overflow-y-auto' >
            {loadingPage ? <div className='h-screen w-screen flex justify-center items-center' >
                <div className='h-[60px] w-[60px]' >
                    <PageButtonLoader />
                </div>
            </div> : <div className='h-full flex justify-center items-center w-full overflow-y-auto' >
                <div className='w-full max-w-[850px] md:px-10 px-5 h-full py-10' >
                    <p className='font-medium xl:text-[32px] text-[24px]' >Create Article</p>
                    <div className='w-full py-4' >
                        <p>Author</p>
                        <input onChange={handleChange} name="author" value={values.author} className='outline-none py-4 px-6 rounded-[15px] mt-2 h-[52px] border w-full border-[#000]' />
                        {errors.author && touched.author && (
                            <p className="text-[14px] text-red-500 pt-1">{errors.author}</p>
                        )}
                    </div>
                    <div className='w-full py-4' >
                        <p>Title</p>
                        <input onChange={handleChange} name="title" value={values.title} className='outline-none py-4 px-6 rounded-[15px] mt-2 h-[52px] border w-full border-[#000]' />
                        {errors.title && touched.title && (
                            <p className="text-[14px] text-red-500 pt-1">{errors.title}</p>
                        )}
                    </div>
                    <div className='w-full py-4' >
                        <p>Description</p>
                        <input onChange={handleChange} name="description" value={values.description} className='outline-none py-4 px-6 rounded-[15px] mt-2 h-[52px] border w-full border-[#000]' />
                        {errors.description && touched.description && (
                            <p className="text-[14px] text-red-500 pt-1">{errors.description}</p>
                        )}
                    </div>
                    <div className='w-full py-4' >
                        <p>Category</p>
                        <input onChange={handleChange} name="category" value={values.category} className='outline-none py-4 px-6 rounded-[15px] mt-2 h-[52px] border w-full border-[#000]' />
                        {errors.category && touched.category && (
                            <p className="text-[14px] text-red-500 pt-1">{errors.category}</p>
                        )}
                    </div>
                    {<>
                    <label className="py-3" htmlFor="uploadResult" >
                        <p className={`pb-1 mt-2`} >Image Upload</p>
                        <div onDragEnter={handleDrag} className={`relative w-full h-[40px] text-truncate md:h-[50px] cursor-pointer ${dragActive ? "border-dashed border" : "border"} rounded-[8px] border-[#727272] mb-2 flex items-center`} >
                            <p className='p-2 md:px-5 text-[#727272] w-full truncate' >{values.image?.name ? values.image?.name : "Upload image here"}</p>
                            { dragActive && <div className='absolute w-full h-full top-0 left-0 bottom-0 right-0' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={(e)=>handleDrop(e, "image")}></div> }
                        </div>
                    </label>
                    <input
                        id="uploadResult"
                        type="file"
                        accept="image/*"
                        className="overflow-hidden hidden"
                        onChange={(e)=> setFieldValue("image", e.target.files && e.target.files[0])}
                    />
                    {errors.image && <div className="text-red-500 text-[12px] my-2">{typeof(errors.image)=== "string" && errors.image}</div>}
                    </>}
                    <div className='w-full py-4' >
                        {errors.body && <div className="text-red-500 text-[12px] my-2">{errors.body}</div>}
                        <Editor
                            apiKey = {"h8vbp6f7nutr08hhfm39ugf9neecd2i6m59yydtowtor4gec"}
                            value={values.body}
                            onEditorChange={(stringifiedHtmlValue) => {
                                setFieldValue("body", stringifiedHtmlValue);
                            }}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 'emoticons'
                                ],
                                toolbar: 'formatselect | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | image | undo redo | emoticons | help',
                                automatic_uploads: true,
                                // images_upload_handler: async (blobInfo, progress)=> {
                                //     const formdata = new FormData()
                                //     formdata.append("image", blobInfo.blob())
                                //     const {data} = await postApi("upload", formdata);
                                //     return data?.image_url;
                                // }
                            }}
                        />
                    </div>
                    <button type='submit' onClick={()=>handleSubmit()} disabled={loading} className='md:text-[20px] w-[250px] rounded-[1000px] bg-[#CC2630] h-[56px] text-white flex items-center justify-center my-4' >
                    {loading ? <SecondButtonLoader /> : "Create Article"}
                    </button>
                    <div className='h-20' ></div>
                </div>
            </div>}
        </div>
    // </AuthContextProvider>
  )
}

export default Home