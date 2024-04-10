import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICourseSchema } from './schema/course.schema';
import { Model } from 'mongoose'
import * as mongoose from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel("Course") private readonly courseModel: Model<ICourseSchema>
  ) { }

  allCourses() {
    let aggregation = [
      {
        $lookup: {
          from: "users",
          let: { userId: "$createdBy" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
            {
              $project: {
                name: 1,
                email: 1,
              }
            }
          ],
          as: "courseCreatedBy"
        }
      },
      {
        $lookup: {
          from: "buycourses",
          let: { courseId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$courseId", "$$courseId"] } } },
            {
              $lookup: {
                from: "users",
                let: { userId: "$buyCourseBy" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                  {
                    $project: {
                      name: 1,
                      email: 1,
                      role: 1
                    }
                  }
                ],
                as: "studentDetail"
              }
            },
            { $unwind: "$studentDetail" }
          ],
          as: "courseDetail"
        },
      },
      {
        $lookup: {
          from: "lessions",
          let: { courseId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$courseId", "$$courseId"] } } },
            {
              $project: {
                name: 1,
                description: 1,
              }
            }
          ],
          as: "lessions"
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          rating: 1,
          courseCreatedBy: 1,
          studentDetail: "$courseDetail.studentDetail",
          lessions: 1
        }
      }
    ]
    return this.courseModel.aggregate(aggregation)
  }

  course(courseId) {
    
    let aggregation = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(courseId)
        }
      },
      {
        $lookup: {
          from: "users",
          let: { userId: "$createdBy" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
            {
              $project: {
                name: 1,
                email: 1,
              }
            }
          ],
          as: "courseCreatedBy"
        }
      },
      {
        $lookup: {
          from: "buycourses",
          let: { courseId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$courseId", "$$courseId"] } } },
            {
              $lookup: {
                from: "users",
                let: { userId: "$buyCourseBy" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                  {
                    $project: {
                      name: 1,
                      email: 1,
                      role: 1
                    }
                  }
                ],
                as: "studentDetail"
              }
            },
            { $unwind: "$studentDetail" }
          ],
          as: "courseDetail"
        }
      },
      {
        $lookup: {
          from: "lessions",
          let: { courseId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$courseId", "$$courseId"] } } },
            {
              $project: {
                name: 1,
                description: 1,
              }
            }
          ],
          as: "lessions"
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          rating: 1,
          courseCreatedBy: 1,
          studentDetail: "$courseDetail.studentDetail",
          lessions: 1
        }
      }
    ]

    return this.courseModel.aggregate(aggregation)
  }
}
