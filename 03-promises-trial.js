/**
 * Convert getUserData from file 2 into a Promise-based function. Use .then() chaining.
 * Add error handling with .catch(). Also write a version that rejects (pass a negative
 * userId) and confirm the error is caught.
 */

// function getUserData(userId) {
//     return new Promise((resolve, reject)=>{
//         setTimeout(() => {
//     if(userId<0){
//         reject(new Error('Invalid userId: must be positive'));
//         return;
//     }
//     resolve({id: userId, name: 'Batman'})
//   }, 1000);
//     })
// }


// function getUserPosts(userId){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             if(userId<0){
//                 reject(new Error('Invalid id'));
//                 return;
//             }
//             resolve([
//                 { id: 101, title: 'First post' },
//                 { id: 102, title: 'Second post' }
//             ])
//         }, 1000)
//     })
// }

// getUserData(-1)
//     .then(user => {
//         console.log('Got user:', user);
//         return getUserPosts(user.id)
//     })
//     .then(posts => {
//         console.log('Got posts:', posts)
//     })
//     .catch(error=> {
//         console.log('Error:', error.message)
//     })






function getUserData(userId){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
        if(userId<0){
            reject(new Error('Invalid Id'));
            return;
        }
        resolve({id: userId, name:' Bataman'})
        }, 1000)
    })
}

function getUserPosts(userId){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(userId<0){
            reject(new Error('Error'))
            return
        }
        resolve([
            {
                id: 100,
                title: 'Wewe'
            },
            {
                id: 101,
                title: 'Mimi'
            }
        ])
        }, 1000)
        
    })
}
getUserData(1)
.then(user =>{
    console.log('here:', user);
    return getUserPosts(user.id);
})
.then(posts=>{
    console.log('here:', posts)
})
.catch(error => {
    console.log(error.message)
})
