import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit, handleImageUpload }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'> {type} Prompt </span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your imagination run wild.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-semibold text-base text-gray-700'>
            Title
          </span>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder='Enter the title...'
            required
            className="form_input"
          />
        </label>

        <label>
          <span className='font-semibold text-base text-gray-700'>
            Description
          </span>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder='Write your description here...'
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className='font-semibold text-base text-gray-700'>
            Live Site URL
          </span>
          <input
            value={post.liveSiteUrl}
            onChange={(e) => setPost({ ...post, liveSiteUrl: e.target.value })}
            placeholder='https://example.com'
            className="form_input"
          />
        </label>

        <label>
          <span className='font-semibold text-base text-gray-700'>
            GitHub URL
          </span>
          <input
            value={post.githubUrl}
            onChange={(e) => setPost({ ...post, githubUrl: e.target.value })}
            placeholder='https://github.com/example'
            className="form_input"
          />
        </label>

        <label>
          <span className='font-semibold text-base text-gray-700'>
            Category
          </span>
          <input
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            placeholder='Category'
            required
            className="form_input"
          />
        </label>

        <label>
          <span className='font-semibold text-base text-gray-700'>
            Image
          </span>
          <input
            type='file'
            onChange={handleImageUpload}
            accept='image/*'
            className="form_input"
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/">
            <a className='text-gray-500 text-small'>
              Cancel
            </a>
          </Link>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
