import { Schema, model } from 'mongoose';
const commentSchema = new Schema({
    timecode: Number,
    content: String,
    sessionId: String,
    token: String,
    username: String,
    createdAt: Date
});
const VideoModel = model('Video', new Schema({
    title: String,
    youTubeId: String,
    sessionId: String,
    token: String,
    createdAt: Date,
    comments: [commentSchema]
}));
export default VideoModel;
