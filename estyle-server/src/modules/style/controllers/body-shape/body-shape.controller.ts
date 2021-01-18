import {Controller, Post, Body, Get, Param, NotFoundException, Patch, Delete, UseGuards} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {ApiTags, ApiCreatedResponse, ApiBearerAuth} from '@nestjs/swagger';
import {Model} from 'mongoose';
import {JwtAuthGuard} from '../../../auth/guards/jwt.guard';
import {BodyShapeRepository} from '../../models/BodyShape/body-shape.repository';
import {BodyShapeInterface} from '../../models/BodyShape/body-shape.schema';
import {BodyShapeDto} from './dto/body-shape.dto';
import {BodyShapePostDto} from './dto/body-shape-post.dto';
import {BodyShapePatchDto} from './dto/body-shape-patch.dto';
import {BodyShapeFactory} from '../../models/BodyShape/body-shape.factory';

@ApiTags('Body Shape')
@Controller('body-shape')
export class BodyShapeController {
    bodyShapeRepository: BodyShapeRepository;

    constructor(
        @InjectModel('BodyShape') BodyShapeModel: Model<BodyShapeInterface>,
    ) {
        this.bodyShapeRepository = new BodyShapeRepository(BodyShapeModel);
    }


    @ApiCreatedResponse({
        type: BodyShapeDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('')
    async createShape(@Body() body: BodyShapePostDto) {
        const shape = BodyShapeFactory.create(body);
        const created = await this.bodyShapeRepository.create(shape);
        return created.toJson();
    }

    @ApiCreatedResponse({
        isArray: true,
        type: BodyShapeDto,
    })
    @Get('')
    async findAllShapes() {
        const found = await this.bodyShapeRepository.find();
        return found.map(shape => shape.toJson());
    }

    @ApiCreatedResponse({
        type: BodyShapeDto,
    })
    @Get(':id')
    async findShapeById(@Param('id') id: string) {
        const found = await this.bodyShapeRepository.findById(id);
        if (!found) throw new NotFoundException();
        return found.toJson();
    }

    @ApiCreatedResponse({
        type: BodyShapeDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateShapeById(
        @Param('id') id: string,
        @Body() body: BodyShapePatchDto,
    ) {
        const found = await this.bodyShapeRepository.findById(id);
        if (!found) throw new NotFoundException();
        const shape = BodyShapeFactory.create({...found.toObject(), ...body});
        const updated = await this.bodyShapeRepository.update(shape);
        return updated.toJson();
    }

    @ApiCreatedResponse({
        type: BodyShapeDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async archiveShapeById(
        @Param('id') id: string,
    ) {
        const found = await this.bodyShapeRepository.findById(id);
        if (!found) throw new NotFoundException();
        found.isArchived = true;
        const updated = await this.bodyShapeRepository.update(found);
    }
}
