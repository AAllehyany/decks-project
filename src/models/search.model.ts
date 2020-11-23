import mongoose, {Schema, Document} from 'mongoose';

export interface ISearchOptions {
    value: any,
    text?: string
}

export interface ISearchField {
    name: string
    type: string
    options?: Array<ISearchOptions>,
    small: boolean
}

export interface ISearch extends Document {
    game: string,
    fields: Array<ISearchField>,
}

const SearchSchema: Schema = new Schema({
    game: {type: String, required: true, unique: true},
    fields: [{
        name: String,
        type: {type: String},
        options: [{
            value: String,
            text: String,
        }],
        small: Boolean
    }]
})

export default mongoose.model<ISearch>('Search', SearchSchema);
