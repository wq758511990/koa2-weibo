/**
 * @description test demo
 * @author wzx
 */
function sum (a, b) {
  return a + b
}
test('10 plus 20 equals to 30', () => {
  const res = sum(10, 20)
  expect(res).toBe(30)
})