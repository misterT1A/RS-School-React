import { extractLastNumber } from '../../Components/result-list/result-list-helpers';
import { getCurrentPage, getMaxPage } from '../../routes/root-helpers';

jest.mock('../../Components/result-list/result-list-helpers', () => ({
  extractLastNumber: jest.fn(),
}));

const data = {
  count: 1,
  next: 'https://swapi.dev/api/planets/?page=3',
  previous: 'https://swapi.dev/api/planets/?page=1',
  results: [],
};

describe('getCurrentPage', () => {
  it('should return the correct page number when next URL is provided', () => {
    (extractLastNumber as jest.Mock).mockReturnValue('3');

    const page = getCurrentPage(data);

    expect(page).toBe(2);
  });

  it('should return the correct page number when previous URL is provided', () => {
    (extractLastNumber as jest.Mock).mockReturnValue('2');

    const page = getCurrentPage(data);

    expect(page).toBe(1);
  });

  it('should return 1 when neither next nor previous URL is provided', () => {
    const dataNull = {
      ...data,
      next: null,
      previous: null,
    };

    const page = getCurrentPage(dataNull);

    expect(page).toBe(1);
  });
});

describe('getMaxPage', () => {
  it('should return 1 when count is 10 or less', () => {
    const count = 10;
    const maxPage = getMaxPage(count);

    expect(maxPage).toBe(1);
  });

  it('should calculate the correct number of pages when count is greater than 10', () => {
    const count = 25;
    const maxPage = getMaxPage(count);

    expect(maxPage).toBe(2.5);
  });

  it('should handle non-integer values correctly', () => {
    const count = 23;
    const maxPage = getMaxPage(count);

    expect(maxPage).toBe(2.3);
  });
});
