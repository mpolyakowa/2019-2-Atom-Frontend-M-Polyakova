/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-100)).toBe(false)
  expect(convertBytesToHuman('just string')).toBe(false)
  expect(convertBytesToHuman(123.04)).toBe(false)
  expect(convertBytesToHuman([1, 5, 2])).toBe(false)
  // ...
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(1024)).toBe('1 KB')
  expect(convertBytesToHuman(123123123)).toBe('117.42 MB')
  expect(convertBytesToHuman(45)).toBe('45 B')
  expect(convertBytesToHuman(93993950523686)).toBe('85.49 TB')
  expect(convertBytesToHuman(9399382903)).toBe('8.75 GB')
  expect(convertBytesToHuman(384998095445114750)).toBe('341.95 PB')
  expect(convertBytesToHuman(7756637474848858959)).toBe('6.73 EB')
  // ...
});

test('Не возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(940404)).toEqual(expect.not.stringContaining('1 KB'))
  expect(convertBytesToHuman(-1)).toEqual(expect.not.stringContaining('117.42 MB'))
  
});

// другая группа проверок
