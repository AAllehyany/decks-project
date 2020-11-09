import mongoose, {Schema, Document} from 'mongoose';

export interface IGame extends Document {
    title: string,
    code: string,
}

const GameSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
    }
});

export default mongoose.model<IGame>('Game', GameSchema);
