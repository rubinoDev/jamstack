import { render,screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { mocked }  from 'jest-mock' 
import { SignInButton } from '.'

jest.mock('next-auth/client')

describe('SignInButton component', () =>{
  it('renders correctly when user is not signed in', () => {
    
    const useSessionMocked = mocked(useSession)
    
    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SignInButton/>
    ) 

      
  expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('renders correctly when user is signed in', () => {
    const useSessionMocked = mocked(useSession)
    
    useSessionMocked.mockReturnValueOnce([
      { user:{ name: 'John Doe', email: 'john.doe@example.com'}, expires: 'fake expires'}, 
      false
    ])

    const { debug } = render(
      <SignInButton/>
    ) 

  debug()

  expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})