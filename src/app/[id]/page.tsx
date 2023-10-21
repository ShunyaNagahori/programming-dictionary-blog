import parse from 'html-react-parser';
import { getData } from '@/client';


async function page({ params }: { params: { id: string } }) {
  const post = await getData(params.id);
  const text = post.body.replace(/<p>/g, '<br />').replace(/<\/p>/g, '');

  return (
    <div className='flex flex-col items-center w-screen'>
      <h1 className="text-center mt-4 text-xl">{post.title}</h1>
      <div className="my-5 w-2/3">
        <span className='text-sm text-gray-400'>カテゴリー「{post.category}」</span>
          <div className='rich-text-content'>
            { parse(text) }
          </div>
      </div>
      <a href='/' className='my-8 border p-2 bg-black text-white'>戻る</a>
    </div>
  )
}

export default page
