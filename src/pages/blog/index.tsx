import BlogComponent from '@components/blog';
import { BlogProps } from '@types';
import { blog } from '@utils/fakeData';
import * as React from 'react';

const Blog = () => {
  return (
    <div className="flex">
      {blog.map((item: BlogProps, index: number) => (
        <div key={index}>
          <BlogComponent
            image={item.image}
            date={item.date}
            title={item.title}
            subTitle={item.subTitle}
          />
        </div>
      ))}
    </div>
  );
};

export default Blog;
