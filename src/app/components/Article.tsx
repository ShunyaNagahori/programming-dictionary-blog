'use client'
import { getAllData } from '@/client';
import { Post } from '@/type';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Article = () => {

  const [allPosts, setAllPosts] = useState<Post[] | undefined>(undefined);

  useEffect(() => {
    async function getData() {
      const data = await getAllData();
      setAllPosts(data.contents);
    }
    getData();
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  }

  const handleSubmit = () => {

  }

  return (
    <div className='w-1/2'>
      <form className=''>
        <input type='text' className='border border-gray-400' onChange={handleSearchChange}/>
        <button type='submit' className='border px-1 border-gray-400 ml-1' onSubmit={handleSubmit}>検索</button>
      </form>
      <ul>
        {allPosts ? allPosts.map((post: Post) => (
          <li key={post.id} className='p-2 border shadow mx-1 w-full my-2'>
            <Link href={`${post.id}`} className=''>
              <div className='px-2'>
                <h2 className='text-lg'>{post.title}</h2>
                <p className='text-gray-400 text-sm'>カテゴリー「{post.category}」</p>
              </div>
            </Link>
          </li>
        )) : <p>Loading...</p>}
      </ul>
    </div>
  )
}

export default Article
