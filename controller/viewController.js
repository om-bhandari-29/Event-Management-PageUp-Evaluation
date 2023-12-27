exports.index = async(req, res) => {
    res.status(200).render('index', {
        title: 'Home'
        // allPosts: post
        // allPosts: withDuration
    });
}

exports.login = async(req, res) => {
    res.status(200).render('login', {
        title: 'Home'
        // allPosts: post
        // allPosts: withDuration
    });
}

exports.volunteerSignup = async(req, res) => {
    res.status(200).render('volunteerSignup', {
        title: 'Home'
        // allPosts: post
        // allPosts: withDuration
    });
}