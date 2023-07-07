export const infiniteLoading = async () => {
   const res = await infinitePromise;
}


const infinitePromise = new Promise ((resolve) => {
    setTimeout(() => resolve('endLoading'), 1000*60*60*24);
});