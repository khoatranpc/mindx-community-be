import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Collections } from "src/global/collection";
import { mentorSchema } from "./mentor.schema";
import { CreateMenoterInputType, GetListMentorArgs } from "./type";

@Injectable()
export class MentorService {
    constructor(@InjectModel(Collections.MENTORS) private mentorModel: Model<mentorSchema>) { }
    async getListMentor(conditional: GetListMentorArgs) {
        return await this.mentorModel.find({
            ...conditional
        });
    }

    async createMentor(mentor: CreateMenoterInputType) {
        const getNewMentor = {
            ...mentor
        }
        delete getNewMentor._id;
        return await this.mentorModel.create(getNewMentor);
    }
}