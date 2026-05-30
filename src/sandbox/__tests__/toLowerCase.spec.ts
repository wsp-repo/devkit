import { describe, it, expect } from 'vitest';

import { toLowerCase } from '../toLowerCase';

type Test = {
  lower: string;
  value: string;
};

describe('Check toLowerCase...', () => {
  const TESTS: Test[] = [
    { value: 'aaa', lower: 'aaa' },
    { value: 'AAA', lower: 'aaa' },
    { value: 'aAa', lower: 'aaa' },
    { value: 'a_Aa', lower: 'a_aa' },
  ];

  it.each(TESTS)('%s', ({ value, lower }) => {
    expect(toLowerCase(value)).toEqual(lower);
  });
});
