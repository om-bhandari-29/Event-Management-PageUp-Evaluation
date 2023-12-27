exports.index = async(req, res) => {
    res.status(200).render('index', {
        title: 'Home'
        // allPosts: post
        // allPosts: withDuration
    });
}