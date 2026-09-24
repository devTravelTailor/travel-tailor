'use client';

import BlogsList from '../../components/BlogsList/BlogsList';

function Blogs() {
  return (
    <section style={{ minHeight: '500px', width: '100%' }}>
      <h1 className='sr-only'>Blogs</h1>
      <BlogsList />
    </section>
  );
}

export default Blogs;
