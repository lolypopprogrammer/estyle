import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    NotFoundException,
    Patch,
    Delete,
    BadRequestException,
    UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';
import { ClothingBrandRepository } from '../../models/ClothingBrand/clothing-brand.repository';
import { ClothingBrandInterface } from '../../models/ClothingBrand/clothing-brand.schema';
import { ClothingBrandFactory } from '../../models/ClothingBrand/clothing-brand.factory';
import { ClothingBrandPostDto } from './dto/clothing-brand-post.dto';
import { ClothingBrandPatchDto } from './dto/clothing-brand-patch.dto';
import { ClothingBrandDto } from './dto/clothing-brand.dto';

@ApiTags('Clothing Brands')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clothing-brands')
export class ClothingBrandController {
    repository: ClothingBrandRepository;

    constructor(
        @InjectModel('ClothingBrand')
        ClothingBrandModel: Model<ClothingBrandInterface>
    ) {
        this.repository = new ClothingBrandRepository(ClothingBrandModel);
    }

    @ApiCreatedResponse({
        type: ClothingBrandDto,
    })
    @Post('')
    async create(@Body() body: ClothingBrandPostDto) {
        const item = ClothingBrandFactory.create(body);
        const created = await this.repository.create(item);
        return created.toJson();
    }

    @ApiCreatedResponse({
        isArray: true,
        type: ClothingBrandDto,
    })
    @Get('')
    async findAll() {
        const found = await this.repository.find();
        return found.map((item) => item.toJson());
    }

    @ApiCreatedResponse({
        type: ClothingBrandDto,
    })
    @Get(':id')
    async findById(@Param('id') id: string) {
        const found = await this.repository.findById(id);
        if (!found) throw new NotFoundException();
        return found.toJson();
    }

    @ApiCreatedResponse({
        type: ClothingBrandDto,
    })
    @Patch(':id')
    async updateById(
        @Param('id') id: string,
        @Body() body: ClothingBrandPatchDto
    ) {
        const found = await this.repository.findById(id);
        if (!found) throw new NotFoundException();
        const item = ClothingBrandFactory.create({ ...found, ...body });
        const updated = await this.repository.update(item);
        return updated.toJson();
    }

    @ApiCreatedResponse({
        type: ClothingBrandDto,
    })
    @Delete(':id')
    async archiveById(@Param('id') id: string) {
        const found = await this.repository.findById(id);
        if (!found) throw new NotFoundException();
        found.isArchived = true;
        const updated = await this.repository.update(found);
    }
}
