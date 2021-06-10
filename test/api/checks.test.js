function test(){
  return 2
}


test("failed", async () => {
  expect(test()).toBe(1)
})
