/* Example export async function with promise  */
export async function example(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Example worked after 3 seconds!");
        }, 3000);
    });
}



