'use client'
import { getAllData } from '@/client';
import { Post } from '@/type';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

const Article = () => {

  const [allPosts, setAllPosts] = useState<Post[] | undefined>(undefined);
  const [keyword, setKeyword] = useState<string>('');
  const [itemsOffset, setOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemsOffset + itemsPerPage;
  const currentPosts = allPosts?.slice(itemsOffset, endOffset);
  const pageCount = allPosts ? Math.ceil(allPosts.length / itemsPerPage) : 0;

  useEffect(() => {
    async function getData() {
      const data = await getAllData();
      setAllPosts(data.contents);
    }
    getData();
  }, [])

  const handlePageChange = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % allPosts!.length
    setOffset(newOffset)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filteredPosts = allPosts?.filter((post: Post) =>
      post.title.includes(keyword)
    )
    setAllPosts(filteredPosts);
  }

  const handleReset = () => {
    async function getData() {
      const data = await getAllData();
      setAllPosts(data.contents);
    }
    getData();
    setKeyword('');
  }

  return (
    <div className='w-1/2'>
      <form onSubmit={handleSubmit}>
        <input type='text' className='border border-gray-400' onChange={handleSearchChange} value={keyword}/>
        <button type='submit' className='border px-1 border-gray-400 ml-1'>検索</button>
        <button type='button' className='border px-1 border-gray-400 ml-1' onClick={handleReset}>リセット</button>
      </form>
      <ul>
        {currentPosts ? currentPosts.map((post: Post) => (
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
      {currentPosts ? (
        <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageChange}
        breakLabel={<span className="mr-4">...</span>}
        nextLabel={
          (
            <p className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md">
              ＞
            </p>
          )
        }
        pageRangeDisplayed={3}
        previousLabel={
          (
            <p className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md mr-4">
              ＜
            </p>
          )
        }
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-4"
        activeClassName="bg-black text-white"
      />
      ) : null}
    </div>
  )
}

export default Article
