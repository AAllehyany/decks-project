import mongoose, {Schema, Document} from 'mongoose';

export interface IExpansion extends Document {
    name: string,
    title_codes: Array<string>,
}

const ExpansionSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    title_codes: {
        type: [String],
        required: true,
    }
});

export default mongoose.model<IExpansion>('Expansion', ExpansionSchema);
