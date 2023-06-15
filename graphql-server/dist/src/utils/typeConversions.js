export const videoModelToGraphQL = (videoModel) => {
    return {
        id: videoModel._id,
        title: videoModel.title,
        youTubeId: videoModel.youTubeId,
        sessionId: videoModel.sessionId,
        token: videoModel.token,
        createdAt: videoModel.createdAt,
        comments: videoModel.comments.map(comment => {
            return {
                id: comment._id || '',
                timecode: comment.timecode,
                content: comment.content,
                sessionId: comment.sessionId,
                token: comment.token,
                username: comment.username,
                createdAt: comment.createdAt,
            };
        })
    };
};
