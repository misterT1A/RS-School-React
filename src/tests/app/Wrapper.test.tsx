import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Wrapper from '@/app/wrapper';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Wrapper', () => {
  const mockPush = jest.fn();
  const mockSearchParams = new URLSearchParams({
    query: 'test',
    page: '1',
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it('should update URL when clicking outside specified elements', () => {
    render(
      <Wrapper>
        <div id="inside">Inside Content</div>
      </Wrapper>,
    );
    fireEvent.click(screen.getByTestId('wrapperComponent'));

    expect(mockPush).toHaveBeenCalledWith('?query=test&page=1');
  });
});
