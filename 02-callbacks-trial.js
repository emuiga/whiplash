function getUserData(userId, callback) {
    setTimeout(() => {
        const user = { id: 1, name: 'Ann' };
        callback(user);
    }, 1000);
}

// getUserData(1, function (user) {
//     console.log('Our user is:', user);
// })


function getUserPosts(userId, callback) {
    setTimeout(() => {
        const posts = [
            { id: 101, userId: userId, title: 'My first post' },
            { id: 102, userId: userId, title: 'My second post' }
        ];
        callback(posts);
    }, 1000);
}


getUserData(1, function (user) {
    console.log('Our user is:', user);

    getUserPosts(user.id, function (posts) {
        console.log(posts)
    })
})



function getUserBooks(userId, callback) {
    setTimeout(() => {
        const books = [
            { id: 101, userId: userId, title: 'Alchemist' },
            { id: 102, userId: userId, title: 'The Brothers Karamazov' }
        ];
        callback(books);
    }, 1000);
}


// getUserData(1, function (user) {
//     console.log('Our user is:', user);

//     getUserPosts(3, function (posts) {
//         console.log(posts)
//     })

//     getUserBooks(3, function (books) {
//         console.log(books)
//     })
// })

