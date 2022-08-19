import { render, screen } from '@testing-library/react';
import { getPrismicClient } from '../../services/prismic'
import  Posts, { getStaticProps }  from '../../pages/posts';
import { mocked } from 'jest-mock';


jest.mock('../../services/prismic')

const posts = [
  {slug:'my-new-post', title: 'My New Post', excerpt: 'Post excerpt', updatedAt:'August, 19'}
]


describe('Posts page', () =>{
  it('renders correctly', () =>{
    render(
      <Posts
        posts={posts}
      />
    )

    expect(screen.getByText('My New Post')).toBeInTheDocument();


  })

  it('loads initial data', async () =>{
    const getPrismicMocked = mocked(getPrismicClient)

     getPrismicMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                {type: 'heading', text: 'My new post'}
              ],
              content: [
                { type:'paragraph', text: 'Post excerpt'}
              ],
            },
            last_publication_date: '08-19-2022'
          }
        ]
      })
     } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: { 
          posts: [{ 
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'Post excerpt',
            updatedAt: '19 de agosto de 2022'
            }] },
      })
    )
  })
})