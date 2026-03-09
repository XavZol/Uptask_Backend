import mongoose, { Document, Types } from 'mongoose';
export interface INote extends Document {
    content: string;
    createdBy: Types.ObjectId;
    task: Types.ObjectId;
}
declare const Note: mongoose.Model<INote, {}, {}, {}, mongoose.Document<unknown, {}, INote, {}, mongoose.DefaultSchemaOptions> & INote & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, INote>;
export default Note;
