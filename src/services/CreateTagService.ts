import { response } from "express";
import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories"

interface ITagRequest {
  name: string;
}

class CreateTagService {

  async execute({ name }: ITagRequest) {
    const tagRepository = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error("Incorrect Tag Name");

    }

    const tagAlreadyExists = await tagRepository.findOne({
      name
    });

    if (tagAlreadyExists) {
      throw new Error("Tag name already exists");
    }

    const tag = tagRepository.create({
      name,
    });
    await tagRepository.save(tag);
    return tag;
  }
}

export { CreateTagService }