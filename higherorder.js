function map(f, a) {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    result.push(f(a[i]));
  }
  return result;
}

// let names = ['alice', 'bob', 'charlie'];

let result = map(name=>name.toUpperCase(), ['alice', 'bob', 'charlie']);

console.log(result);
// console.log(names); 