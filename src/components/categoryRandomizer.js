export const categoryRandomizer = (arr) => {
  
  const item =[];
  
  for(let i=0; i<5; i++){
    const randomIndex = Math.floor(Math.random() * arr.length);
    item.push(arr[randomIndex]);
  }
  return item;
}


