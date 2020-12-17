import getParams from './getParams';

describe('getParams', () => {
  it('handles full urls without params', () => {
    const url = 'https://wwww.example.com/';
    expect(getParams(url)).toEqual({});
  });

  it('handles full urls with params', () => {
    const url = 'https://wwww.example.com/?test=123&foo=true&baz=str';
    expect(getParams(url)).toEqual({
      test: '123',
      foo: 'true',
      baz: 'str',
    });
  });

  it('handles just the params starting with ?', () => {
    const test = '?test=123&foo=true&baz=str';
    expect(getParams(test)).toEqual({
      test: '123',
      foo: 'true',
      baz: 'str',
    });
  });

  it("handles just the params that don't start with ?", () => {
    const test = '&test=123&foo=true&baz=str';
    expect(getParams(test)).toEqual({
      test: '123',
      foo: 'true',
      baz: 'str',
    });
  });
});
