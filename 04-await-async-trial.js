/**
 * Convert the Promise version to async/await with try/catch. Then add a second
 * operation that depends on the first. Then add a third that does NOT depend on
 * the others — make those two run in parallel with Promise.all.
 */

function getUserData(userId){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(userId<0){
                reject(new Error('Invalid bro'));
                return;
            }
            resolve({id: userId, name: 'Steve'})
        }, 1000)
    })
}

function getUserPosts(userId){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(userId<0){
            reject(new Error('check user id bro'));
            return;
        }
        resolve([
            {id: 10, title: 'westeros'},
            {id: 11, title:'the wall'}
        ])
        }, 1000)
        
    })
}

function getUserTheme(userId){
    return new Promise((resolve)=>{
        setTimeout(()=>{
                    // Simulating different users having different settings
            const settingsDB = {
          1: { theme: 'dark',  language: 'en', userId: 1 },
          2: { theme: 'light', language: 'sw', userId: 2 },
          3: { theme: 'blue',  language: 'fr', userId: 3 },
        };

        const theme = settingsDB[userId] || { theme: 'light', language: 'en', userId };
        resolve(theme);
      }, 1000);

    })
}

// async function loadUser(userId){
//     const user = await getUserData(userId);
//     console.log('user is:', user)

//     const posts = await getUserPosts(user.id);
//     console.log('his posts:', posts)

//     const theme = await getUserTheme(user.id);
//     console.log('user theme:', theme)

// }

async function loadUser(userId){
    try{
    const user = await getUserData(userId);
    console.log(user)

    const [posts, theme] = await Promise.all([
        getUserPosts(user.id),
        getUserTheme(user.id)
    ])

    // const theme = await getUserTheme(user.id);
    console.log(posts)
    console.log(theme)
} catch(error){
    console.log('Error:', error.message)
}

} 

loadUser(3)