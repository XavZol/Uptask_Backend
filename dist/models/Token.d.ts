import mongoose, { Document, Types } from "mongoose";
export interface IToken extends Document {
    token: string;
    user: Types.ObjectId;
    createdAt: Date;
}
declare const Token: mongoose.Model<IToken, {}, {}, {}, mongoose.Document<unknown, {}, IToken, {}, mongoose.DefaultSchemaOptions> & IToken & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IToken>;
export default Token;
