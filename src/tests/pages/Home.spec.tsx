import { render, screen } from '@testing-library/react';
import { stripe } from '../../services/stripe';

import  Home, { getStaticProps }  from '../../pages';
import { mocked } from 'jest-mock';

jest.mock('next/router')
jest.mock('next-auth/client', () =>{
  return{
    useSession: () => [null,false]
  }
})

jest.mock('../../services/stripe')

describe('Home page', () =>{
  it('renders correctly', () =>{
    render(
      <Home
      product={{priceId: 'fake-price-id', amount: 'fake-amount'}}
      />
    )

    expect(screen.getByText('for fake-amount month')).toBeInTheDocument();


  })

  it('loads initial data', async () =>{
    const retrieveStripePriceMocked = mocked(stripe.prices.retrieve)

    retrieveStripePriceMocked.mockResolvedValueOnce({//pq é uma promise
      id: 'fake-price-id',
      unit_amount:1000,
    } as any) 

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: { product: { 
        priceId: 'fake-price-id', 
        amount: '$10.00' 
        } },
      })
    )
  })
})