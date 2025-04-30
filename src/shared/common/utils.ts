export function uid(): string {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, '');
}

export function additionalHover<T>(arr?:T[]):T[] | [] {
  console.log('arr = ', arr)
  return arr?.length ? arr.map((item)=>({...item, hover:true})): []
}
