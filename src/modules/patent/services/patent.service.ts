import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Patent } from '../entities/patent.entity';
import { PatentResponseDto } from '@transferable-dto/patent/patent.response.dto';
import { CreatePatentDto } from '@requestable-dto/patent/create-patent.dto';
import { BaseQueryDto } from '@base-classes/pagination/base-query.dto';
import { PageDto } from '@base-classes/pagination/page.dto';
import { PageMetaDto } from '@base-classes/pagination/page-meta.dto';

@Injectable()
export class PatentService extends AutomapperProfile {
  constructor(
    @InjectMapper() readonly mapper: Mapper,

    @InjectRepository(Patent)
    private readonly patentRepo: Repository<Patent>,
  ) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Patent, PatentResponseDto);
    };
  }

  async findById(id: string) {
    const patent = await this.patentRepo.findOne({ where: { id } });

    if (!patent) {
      throw new NotFoundException(`Patent with id ${id} not found.`);
    }

    return this.mapper.map(patent, Patent, PatentResponseDto);
  }

  async findByTitle(title: string) {
    return await this.patentRepo.findOne({
      where: { title: title.trim().toLowerCase() },
    });
  }

  async create(payload: CreatePatentDto) {
    const { description, title } = payload;

    const existing = await this.findByTitle(title);

    if (existing) {
      throw new BadRequestException(
        `Patent with title ${title} already exists, please choose a different title.`,
      );
    }

    const patent = this.patentRepo.create({
      title: title.trim().toLowerCase(),
      description,
    });

    return await this.patentRepo.save(patent);
  }

  /**
   * Get all with optional filtering
   */

  async findAll(
    pageOptionsDto: BaseQueryDto,
  ): Promise<PageDto<PatentResponseDto>> {
    const { filters, skip, take } = pageOptionsDto;

    const queryBuilder = this.patentRepo.createQueryBuilder('patent');

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (key === 'search') {
          queryBuilder.andWhere(
            `(LOWER(patent.title) LIKE :search 
            OR LOWER(patent.description) LIKE :search)`,
            {
              search: `%${value.toString().toLowerCase()}%`,
            },
          );
        } else {
          queryBuilder.andWhere(`patent.${key} = :${key}`, {
            [key]: value,
          });
        }
      });
    }

    // Step 1: count total with the same filters
    const total = await queryBuilder.clone().getCount();

    const patents = await queryBuilder
      .skip(skip)
      .take(take)
      .orderBy('patent.createdAt', 'DESC')
      .getMany();

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: total,
    });

    const mappedPatents = this.mapper.mapArray(
      patents,
      Patent,
      PatentResponseDto,
    );

    return new PageDto(mappedPatents, pageMetaDto);
  }
}
